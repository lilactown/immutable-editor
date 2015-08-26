(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/will/Code/json-editor/node_modules/grunt-browserify/node_modules/browserify/node_modules/events/events.js":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],"/Users/will/Code/json-editor/node_modules/immutable/contrib/cursor/index.js":[function(require,module,exports){
/**
 *  Copyright (c) 2014-2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Cursor is expected to be required in a node or other CommonJS context:
 *
 *     var Cursor = require('immutable/contrib/cursor');
 *
 * If you wish to use it in the browser, please check out Browserify or WebPack!
 */

var Immutable = require('immutable');
var Iterable = Immutable.Iterable;
var Iterator = Iterable.Iterator;
var Seq = Immutable.Seq;
var Map = Immutable.Map;
var Record = Immutable.Record;


function cursorFrom(rootData, keyPath, onChange) {
  if (arguments.length === 1) {
    keyPath = [];
  } else if (typeof keyPath === 'function') {
    onChange = keyPath;
    keyPath = [];
  } else {
    keyPath = valToKeyPath(keyPath);
  }
  return makeCursor(rootData, keyPath, onChange);
}


var KeyedCursorPrototype = Object.create(Seq.Keyed.prototype);
var IndexedCursorPrototype = Object.create(Seq.Indexed.prototype);

function KeyedCursor(rootData, keyPath, onChange, size) {
  this.size = size;
  this._rootData = rootData;
  this._keyPath = keyPath;
  this._onChange = onChange;
}
KeyedCursorPrototype.constructor = KeyedCursor;

function IndexedCursor(rootData, keyPath, onChange, size) {
  this.size = size;
  this._rootData = rootData;
  this._keyPath = keyPath;
  this._onChange = onChange;
}
IndexedCursorPrototype.constructor = IndexedCursor;

KeyedCursorPrototype.toString = function() {
  return this.__toString('Cursor {', '}');
}
IndexedCursorPrototype.toString = function() {
  return this.__toString('Cursor [', ']');
}

KeyedCursorPrototype.deref =
KeyedCursorPrototype.valueOf =
IndexedCursorPrototype.deref =
IndexedCursorPrototype.valueOf = function(notSetValue) {
  return this._rootData.getIn(this._keyPath, notSetValue);
}

KeyedCursorPrototype.get =
IndexedCursorPrototype.get = function(key, notSetValue) {
  return this.getIn([key], notSetValue);
}

KeyedCursorPrototype.getIn =
IndexedCursorPrototype.getIn = function(keyPath, notSetValue) {
  keyPath = listToKeyPath(keyPath);
  if (keyPath.length === 0) {
    return this;
  }
  var value = this._rootData.getIn(newKeyPath(this._keyPath, keyPath), NOT_SET);
  return value === NOT_SET ? notSetValue : wrappedValue(this, keyPath, value);
}

IndexedCursorPrototype.set =
KeyedCursorPrototype.set = function(key, value) {
  return updateCursor(this, function (m) { return m.set(key, value); }, [key]);
}

IndexedCursorPrototype.push = function(/* values */) {
  var args = arguments;
  return updateCursor(this, function (m) {
    return m.push.apply(m, args);
  });
}

IndexedCursorPrototype.pop = function() {
  return updateCursor(this, function (m) {
    return m.pop();
  });
}

IndexedCursorPrototype.unshift = function(/* values */) {
  var args = arguments;
  return updateCursor(this, function (m) {
    return m.unshift.apply(m, args);
  });
}

IndexedCursorPrototype.shift = function() {
  return updateCursor(this, function (m) {
    return m.shift();
  });
}

IndexedCursorPrototype.setIn =
KeyedCursorPrototype.setIn = Map.prototype.setIn;

KeyedCursorPrototype.remove =
KeyedCursorPrototype['delete'] =
IndexedCursorPrototype.remove =
IndexedCursorPrototype['delete'] = function(key) {
  return updateCursor(this, function (m) { return m.remove(key); }, [key]);
}

IndexedCursorPrototype.removeIn =
IndexedCursorPrototype.deleteIn =
KeyedCursorPrototype.removeIn =
KeyedCursorPrototype.deleteIn = Map.prototype.deleteIn;

KeyedCursorPrototype.clear =
IndexedCursorPrototype.clear = function() {
  return updateCursor(this, function (m) { return m.clear(); });
}

IndexedCursorPrototype.update =
KeyedCursorPrototype.update = function(keyOrFn, notSetValue, updater) {
  return arguments.length === 1 ?
    updateCursor(this, keyOrFn) :
    this.updateIn([keyOrFn], notSetValue, updater);
}

IndexedCursorPrototype.updateIn =
KeyedCursorPrototype.updateIn = function(keyPath, notSetValue, updater) {
  return updateCursor(this, function (m) {
    return m.updateIn(keyPath, notSetValue, updater);
  }, keyPath);
}

IndexedCursorPrototype.merge =
KeyedCursorPrototype.merge = function(/*...iters*/) {
  var args = arguments;
  return updateCursor(this, function (m) {
    return m.merge.apply(m, args);
  });
}

IndexedCursorPrototype.mergeWith =
KeyedCursorPrototype.mergeWith = function(merger/*, ...iters*/) {
  var args = arguments;
  return updateCursor(this, function (m) {
    return m.mergeWith.apply(m, args);
  });
}

IndexedCursorPrototype.mergeIn =
KeyedCursorPrototype.mergeIn = Map.prototype.mergeIn;

IndexedCursorPrototype.mergeDeep =
KeyedCursorPrototype.mergeDeep = function(/*...iters*/) {
  var args = arguments;
  return updateCursor(this, function (m) {
    return m.mergeDeep.apply(m, args);
  });
}

IndexedCursorPrototype.mergeDeepWith =
KeyedCursorPrototype.mergeDeepWith = function(merger/*, ...iters*/) {
  var args = arguments;
  return updateCursor(this, function (m) {
    return m.mergeDeepWith.apply(m, args);
  });
}

IndexedCursorPrototype.mergeDeepIn =
KeyedCursorPrototype.mergeDeepIn = Map.prototype.mergeDeepIn;

KeyedCursorPrototype.withMutations =
IndexedCursorPrototype.withMutations = function(fn) {
  return updateCursor(this, function (m) {
    return (m || Map()).withMutations(fn);
  });
}

KeyedCursorPrototype.cursor =
IndexedCursorPrototype.cursor = function(subKeyPath) {
  subKeyPath = valToKeyPath(subKeyPath);
  return subKeyPath.length === 0 ? this : subCursor(this, subKeyPath);
}

/**
 * All iterables need to implement __iterate
 */
KeyedCursorPrototype.__iterate =
IndexedCursorPrototype.__iterate = function(fn, reverse) {
  var cursor = this;
  var deref = cursor.deref();
  return deref && deref.__iterate ? deref.__iterate(
    function (v, k) { return fn(wrappedValue(cursor, [k], v), k, cursor); },
    reverse
  ) : 0;
}

/**
 * All iterables need to implement __iterator
 */
KeyedCursorPrototype.__iterator =
IndexedCursorPrototype.__iterator = function(type, reverse) {
  var deref = this.deref();
  var cursor = this;
  var iterator = deref && deref.__iterator &&
    deref.__iterator(Iterator.ENTRIES, reverse);
  return new Iterator(function () {
    if (!iterator) {
      return { value: undefined, done: true };
    }
    var step = iterator.next();
    if (step.done) {
      return step;
    }
    var entry = step.value;
    var k = entry[0];
    var v = wrappedValue(cursor, [k], entry[1]);
    return {
      value: type === Iterator.KEYS ? k : type === Iterator.VALUES ? v : [k, v],
      done: false
    };
  });
}

KeyedCursor.prototype = KeyedCursorPrototype;
IndexedCursor.prototype = IndexedCursorPrototype;


var NOT_SET = {}; // Sentinel value

function makeCursor(rootData, keyPath, onChange, value) {
  if (arguments.length < 4) {
    value = rootData.getIn(keyPath);
  }
  var size = value && value.size;
  var CursorClass = Iterable.isIndexed(value) ? IndexedCursor : KeyedCursor;
  var cursor = new CursorClass(rootData, keyPath, onChange, size);

  if (value instanceof Record) {
    defineRecordProperties(cursor, value);
  }

  return cursor;
}

function defineRecordProperties(cursor, value) {
  try {
    value._keys.forEach(setProp.bind(undefined, cursor));
  } catch (error) {
    // Object.defineProperty failed. Probably IE8.
  }
}

function setProp(prototype, name) {
  Object.defineProperty(prototype, name, {
    get: function() {
      return this.get(name);
    },
    set: function(value) {
      if (!this.__ownerID) {
        throw new Error('Cannot set on an immutable record.');
      }
    }
  });
}

function wrappedValue(cursor, keyPath, value) {
  return Iterable.isIterable(value) ? subCursor(cursor, keyPath, value) : value;
}

function subCursor(cursor, keyPath, value) {
  if (arguments.length < 3) {
    return makeCursor( // call without value
      cursor._rootData,
      newKeyPath(cursor._keyPath, keyPath),
      cursor._onChange
    );
  }
  return makeCursor(
    cursor._rootData,
    newKeyPath(cursor._keyPath, keyPath),
    cursor._onChange,
    value
  );
}

function updateCursor(cursor, changeFn, changeKeyPath) {
  var deepChange = arguments.length > 2;
  var newRootData = cursor._rootData.updateIn(
    cursor._keyPath,
    deepChange ? Map() : undefined,
    changeFn
  );
  var keyPath = cursor._keyPath || [];
  var result = cursor._onChange && cursor._onChange.call(
    undefined,
    newRootData,
    cursor._rootData,
    deepChange ? newKeyPath(keyPath, changeKeyPath) : keyPath
  );
  if (result !== undefined) {
    newRootData = result;
  }
  return makeCursor(newRootData, cursor._keyPath, cursor._onChange);
}

function newKeyPath(head, tail) {
  return head.concat(listToKeyPath(tail));
}

function listToKeyPath(list) {
  return Array.isArray(list) ? list : Immutable.Iterable(list).toArray();
}

function valToKeyPath(val) {
  return Array.isArray(val) ? val :
    Iterable.isIterable(val) ? val.toArray() :
    [val];
}

exports.from = cursorFrom;

},{"immutable":"immutable"}],"/Users/will/Code/json-editor/node_modules/object-assign/index.js":[function(require,module,exports){
'use strict';
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function ownEnumerableKeys(obj) {
	var keys = Object.getOwnPropertyNames(obj);

	if (Object.getOwnPropertySymbols) {
		keys = keys.concat(Object.getOwnPropertySymbols(obj));
	}

	return keys.filter(function (key) {
		return propIsEnumerable.call(obj, key);
	});
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = ownEnumerableKeys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],"/Users/will/Code/json-editor/src/js/components/AddListEntry.jsx":[function(require,module,exports){
'use strict';

var React = require('react');
var Immutable = require('immutable');
var List = Immutable.List;
var Map = Immutable.Map;

var AddListEntry = React.createClass({
	displayName: 'AddListEntry',

	getInitialState: function getInitialState() {
		return {
			showOptions: false,
			dataType: "string"
		};
	},
	pushPath: function pushPath(e) {
		e.preventDefault();
		var types = {
			map: new Map({}),
			list: new List([]),
			string: ""
		};
		this.props.cursor.get(this.props.keyName).push(types[this.state.dataType]);
		this.toggleOptions();
	},
	toggleOptions: function toggleOptions() {
		this.setState({ showOptions: !this.state.showOptions });
	},
	setType: function setType(e) {
		var dataType = e.target.value;
		this.setState({ dataType: dataType });
	},
	render: function render() {
		if (this.state.showOptions) {
			return React.createElement(
				'div',
				{ style: { marginLeft: "20px" } },
				React.createElement(
					'label',
					{ htmlFor: 'type' },
					'type:'
				),
				' ',
				React.createElement(
					'select',
					{ name: 'type', onChange: this.setType },
					React.createElement(
						'option',
						{ value: 'string' },
						'String'
					),
					React.createElement(
						'option',
						{ value: 'map' },
						'Map'
					),
					React.createElement(
						'option',
						{ value: 'list' },
						'List'
					)
				),
				' ',
				React.createElement(
					'a',
					{ href: '#', onClick: this.pushPath },
					React.createElement('i', { className: 'fa fa-plus', style: { color: "#A6E22E" } })
				),
				' ',
				React.createElement(
					'a',
					{ href: '#', onClick: this.toggleOptions },
					React.createElement('i', { className: 'fa fa-remove', style: { color: "#FD971F" } })
				)
			);
		}
		return React.createElement(
			'div',
			{ style: { marginLeft: "19px" } },
			String.fromCharCode(8627),
			' ',
			React.createElement(
				'a',
				{ href: '#' },
				React.createElement('i', { onClick: this.toggleOptions, className: 'fa fa-plus-circle add', style: { color: "#A6E22E" } })
			)
		);
	}
});

module.exports = AddListEntry;

},{"immutable":"immutable","react":"react"}],"/Users/will/Code/json-editor/src/js/components/AddMapEntry.jsx":[function(require,module,exports){
'use strict';

var React = require('react');
var Immutable = require('immutable');
var List = Immutable.List;
var Map = Immutable.Map;

var inputStyle = {
	fontFamily: '"Source Code Pro", monospace',
	background: '#282828',
	border: '0',
	color: '#E6DB74',
	wordBreak: 'break-word'
};

var AddMapEntry = React.createClass({
	displayName: 'AddMapEntry',

	getInitialState: function getInitialState() {
		return {
			showOptions: false,
			keyName: "",
			dataType: "string"
		};
	},
	setPath: function setPath(e) {
		e.preventDefault();
		var types = {
			map: Map({}),
			list: List([]),
			string: ""
		};
		this.props.cursor.get(this.props.keyName).set(this.state.keyName, types[this.state.dataType]);
		this.toggleOptions();
	},
	toggleOptions: function toggleOptions() {
		this.setState({ showOptions: !this.state.showOptions });
	},
	setType: function setType(e) {
		var dataType = e.target.value;
		this.setState({ dataType: dataType });
	},
	setKey: function setKey(e) {
		var keyName = e.target.value;
		this.setState({ keyName: keyName });
	},
	render: function render() {
		if (this.state.showOptions) {
			return React.createElement(
				'div',
				{ style: { marginLeft: "20px" } },
				React.createElement(
					'label',
					{ htmlFor: 'key' },
					'key:'
				),
				' ',
				React.createElement('input', { name: 'key', type: 'text', onChange: this.setKey }),
				React.createElement('br', null),
				React.createElement(
					'label',
					{ htmlFor: 'type' },
					'type:'
				),
				' ',
				React.createElement(
					'select',
					{ name: 'type', onChange: this.setType },
					React.createElement(
						'option',
						{ value: 'string' },
						'String'
					),
					React.createElement(
						'option',
						{ value: 'map' },
						'Map'
					),
					React.createElement(
						'option',
						{ value: 'list' },
						'List'
					)
				),
				' ',
				React.createElement(
					'a',
					{ href: '#', onClick: this.setPath },
					React.createElement('i', { className: 'fa fa-plus', style: { color: "#A6E22E" } })
				),
				' ',
				React.createElement(
					'a',
					{ href: '#', onClick: this.toggleOptions },
					React.createElement('i', { className: 'fa fa-remove', style: { color: "#FD971F" } })
				)
			);
		}
		return React.createElement(
			'div',
			{ style: { marginLeft: "19px" } },
			String.fromCharCode(8627),
			' ',
			React.createElement(
				'a',
				{ href: '#' },
				React.createElement('i', { onClick: this.toggleOptions, className: 'fa fa-plus-circle', style: { color: "#A6E22E" } })
			)
		);
	}
});

module.exports = AddMapEntry;

},{"immutable":"immutable","react":"react"}],"/Users/will/Code/json-editor/src/js/components/Editor.jsx":[function(require,module,exports){
// Top-level component
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var HistoryModel = require('../models/HistoryModel');

var Entry = require('./Entry.jsx');
var Toolbar = require('./Toolbar.jsx');

var editorStyle = {
	color: "#F8F8F2",
	fontFamily: '"Source Code Pro", monospace',
	fontSize: "16px",
	WebkitFontSmoothing: "initial"
};

var Editor = React.createClass({
	displayName: 'Editor',

	propTypes: {
		name: React.PropTypes.string
	},
	componentDidMount: function componentDidMount() {
		HistoryModel.push(this.props.data);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		HistoryModel.push(nextProps.data);
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
		return this.props.data !== nextProps.data;
	},
	render: function render() {
		var _this = this;

		console.log(this.props.cursor.size);
		return React.createElement(
			'div',
			{ style: editorStyle },
			React.createElement(
				'div',
				{ style: { margin: "0px 10px" } },
				React.createElement(Toolbar, { cursor: this.props.cursor }),
				'{',
				React.createElement(
					'div',
					{ style: { marginLeft: "5px" } },
					this.props.data.map(function (entry, key) {
						return React.createElement(Entry, _extends({}, _this.props, {
							cursor: _this.props.cursor,
							value: entry,
							key: key,
							keyName: key
						}));
					}).toList()
				),
				'}'
			)
		);
	}
});

window.HistoryModel = HistoryModel;

module.exports = Editor;

},{"../models/HistoryModel":"/Users/will/Code/json-editor/src/js/models/HistoryModel.js","./Entry.jsx":"/Users/will/Code/json-editor/src/js/components/Entry.jsx","./Toolbar.jsx":"/Users/will/Code/json-editor/src/js/components/Toolbar.jsx","react":"react"}],"/Users/will/Code/json-editor/src/js/components/Entry.jsx":[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Immutable = require('immutable');
var Cursor = require('immutable/contrib/cursor');
var List = Immutable.List;
var Map = Immutable.Map;

var assign = require('object-assign');

var AddMapEntry = require('./AddMapEntry.jsx');
var AddListEntry = require('./AddListEntry.jsx');

var inputStyle = {
	fontFamily: '"Source Code Pro", monospace',
	background: '#282828',
	border: '0',
	color: '#E6DB74',
	wordBreak: 'break-word'
};

var inputContainerStyle = {
	fontFamily: '"Source Code Pro", monospace',
	color: '#E6DB74',
	fontSize: '11px'
};

var Entry = React.createClass({
	displayName: 'Entry',

	propTypes: {
		keyName: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
		value: React.PropTypes.oneOfType([React.PropTypes.instanceOf(List), React.PropTypes.instanceOf(Map), React.PropTypes.string]).isRequired,
		minEditDepth: React.PropTypes.number,
		minRemovalDepth: React.PropTypes.number
	},
	getInitialState: function getInitialState() {
		return {
			collapsed: false,
			inputValue: ""
		};
	},
	_onChange: function _onChange(e) {
		this.setState({ inputValue: e.target.value });
	},
	_onBlur: function _onBlur(e) {
		// update the model on blur
		this.props.cursor.set(this.props.keyName, this.state.inputValue);
	},
	_onKeyUp: function _onKeyUp(e) {
		// update the model on enter
		if (e.key === "Enter") {
			this.props.cursor.set(this.props.keyName, this.state.inputValue);
		}
	},
	deletePath: function deletePath(e) {
		e.preventDefault();
		this.props.cursor['delete'](this.props.keyName);
	},
	toggleCollapsed: function toggleCollapsed(e) {
		e.preventDefault();
		this.setState({ collapsed: !this.state.collapsed });
	},
	componentWillMount: function componentWillMount() {
		this.setState({
			inputValue: this.props.value
		});
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		this.setState({
			inputValue: nextProps.value
		});
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		return this.props.value !== nextProps.value || this.props.style !== nextProps.style || this.state.collapsed !== nextState.collapsed || this.state.inputValue !== nextState.inputValue;
	},
	render: function render() {
		var _this = this;

		var cursor = this.props.cursor.get(this.props.keyName);
		var value = this.props.value;
		var collapsed = this.state.collapsed;

		var isMinRemovalDepth = this.props.cursor['_keyPath'].length + 1 >= this.props.minRemovalDepth;
		var isMinEditDepth = this.props.cursor['_keyPath'].length + 1 >= this.props.minEditDepth;
		var isMap = Map.isMap(value);
		var isList = List.isList(value);

		var hideEntry = { display: collapsed ? 'none' : 'block' };
		return React.createElement(
			'div',
			{ style: assign({ marginLeft: "20px" }, this.props.style) },
			isMap || isList ? React.createElement(
				'a',
				{ onClick: this.toggleCollapsed },
				React.createElement('i', { className: 'fa ' + (collapsed ? 'fa-plus-square' : 'fa-minus-square'), style: { color: "#FFD569", marginLeft: '-23px' } })
			) : '',
			' ',
			this.props.keyName,
			':',
			' ',
			isMap ? React.createElement(
				'span',
				null,
				'{',
				' ',
				isMinRemovalDepth ? React.createElement(
					'a',
					{ href: '#', onClick: this.deletePath },
					React.createElement('i', { className: 'fa fa-times-circle', style: { color: "#FD971F" } }),
					' '
				) : '',
				value.map(function (v, k) {
					return React.createElement(Entry, _extends({}, _this.props, { cursor: cursor, key: k, value: v, keyName: k, style: hideEntry }));
				}).toList(),
				isMinEditDepth && !collapsed ? React.createElement(AddMapEntry, { cursor: this.props.cursor, keyName: this.props.keyName }) : '',
				'}'
			) : isList ? React.createElement(
				'span',
				null,
				'[',
				' ',
				isMinRemovalDepth ? React.createElement(
					'a',
					{ href: '#', onClick: this.deletePath },
					React.createElement('i', { className: 'fa fa-times-circle', style: { color: "#FD971F" } }),
					' '
				) : '',
				value.map(function (v, k) {
					return React.createElement(Entry, _extends({}, _this.props, { cursor: cursor, key: k, value: v, keyName: k, style: hideEntry }));
				}).toList(),
				isMinEditDepth && !collapsed ? React.createElement(AddListEntry, { cursor: this.props.cursor, keyName: this.props.keyName }) : '',
				']'
			) : React.createElement(
				'span',
				{ style: inputContainerStyle },
				'"',
				React.createElement('input', {
					type: 'text',
					value: this.state.inputValue,
					onChange: this._onChange,
					onBlur: this._onBlur,
					onKeyUp: this._onKeyUp,
					size: this.state.inputValue.length,
					style: inputStyle
				}),
				'" ',
				React.createElement(
					'a',
					{ href: '#', onClick: this.deletePath },
					React.createElement('i', { className: 'fa fa-times-circle', style: { color: "#FD971F" } })
				)
			)
		);
	}
});

module.exports = Entry;

},{"./AddListEntry.jsx":"/Users/will/Code/json-editor/src/js/components/AddListEntry.jsx","./AddMapEntry.jsx":"/Users/will/Code/json-editor/src/js/components/AddMapEntry.jsx","immutable":"immutable","immutable/contrib/cursor":"/Users/will/Code/json-editor/node_modules/immutable/contrib/cursor/index.js","object-assign":"/Users/will/Code/json-editor/node_modules/object-assign/index.js","react":"react"}],"/Users/will/Code/json-editor/src/js/components/Toolbar.jsx":[function(require,module,exports){
// Toolbar
'use strict';

var React = require('react');
var fs = require('../libs/FileSaver');

// Material UI
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;
var RaisedButton = mui.RaisedButton;

var HistoryModel = require('../models/HistoryModel');

var toolbarStyle = {
	fontFamily: "Roboto, sans-serif",
	margin: "0",
	padding: "0",
	WebkitFontSmoothing: "antialiased",
	fontSize: "13px",
	position: "fixed",
	left: "50%",
	transform: "translateX(-110px)"
};

var EditorToolBar = React.createClass({
	displayName: 'EditorToolBar',

	childContextTypes: {
		muiTheme: React.PropTypes.object
	},
	getChildContext: function getChildContext() {
		return {
			muiTheme: ThemeManager.getCurrentTheme()
		};
	},
	undo: function undo() {
		HistoryModel.incOffset();
		var nextState = HistoryModel.get(HistoryModel.getAll().offset);
		this.props.cursor.update(function (v) {
			return nextState;
		});
	},
	redo: function redo() {
		HistoryModel.decOffset();
		var nextState = HistoryModel.get(HistoryModel.getAll().offset);
		this.props.cursor.update(function (v) {
			return nextState;
		});
	},
	save: function save() {
		var blob = new Blob([JSON.stringify(this.props.cursor.deref().toJS())], { type: "application/json;charset=utf-8" });
		fs.saveAs(blob, "resume.json");
	},
	render: function render() {
		return React.createElement(
			'div',
			{ style: toolbarStyle },
			React.createElement(
				'div',
				{ style: { marginTop: "5px" } },
				React.createElement(RaisedButton, { label: 'UNDO', primary: true, onClick: this.undo })
			),
			React.createElement(
				'div',
				{ style: { marginTop: "5px" } },
				React.createElement(RaisedButton, { label: 'REDO', secondary: true, onClick: this.redo })
			),
			React.createElement(
				'div',
				{ style: { marginTop: "5px" } },
				React.createElement(RaisedButton, { label: 'SAVE', onClick: this.save })
			)
		);
	}
});

module.exports = EditorToolBar;

},{"../libs/FileSaver":"/Users/will/Code/json-editor/src/js/libs/FileSaver.js","../models/HistoryModel":"/Users/will/Code/json-editor/src/js/models/HistoryModel.js","material-ui":"material-ui","react":"react"}],"/Users/will/Code/json-editor/src/js/index.js":[function(require,module,exports){
// index.js

'use strict';

module.exports = require('./components/Editor.jsx');

},{"./components/Editor.jsx":"/Users/will/Code/json-editor/src/js/components/Editor.jsx"}],"/Users/will/Code/json-editor/src/js/libs/FileSaver.js":[function(require,module,exports){
/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.1.20150716
 *
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

"use strict";

var saveAs = saveAs || (function (view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var doc = view.document,
	   
	// only get URL when necessary in case Blob.js hasn't overridden it yet
	get_URL = function get_URL() {
		return view.URL || view.webkitURL || view;
	},
	    save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
	    can_use_save_link = ("download" in save_link),
	    click = function click(node) {
		var event = new MouseEvent("click");
		node.dispatchEvent(event);
	},
	    webkit_req_fs = view.webkitRequestFileSystem,
	    req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem,
	    throw_outside = function throw_outside(ex) {
		(view.setImmediate || view.setTimeout)(function () {
			throw ex;
		}, 0);
	},
	    force_saveable_type = "application/octet-stream",
	    fs_min_size = 0,
	   
	// See https://code.google.com/p/chromium/issues/detail?id=375297#c7 and
	// https://github.com/eligrey/FileSaver.js/commit/485930a#commitcomment-8768047
	// for the reasoning behind the timeout and revocation flow
	arbitrary_revoke_timeout = 500,
	    // in ms
	revoke = function revoke(file) {
		var revoker = function revoker() {
			if (typeof file === "string") {
				// file is an object URL
				get_URL().revokeObjectURL(file);
			} else {
				// file is a File
				file.remove();
			}
		};
		if (view.chrome) {
			revoker();
		} else {
			setTimeout(revoker, arbitrary_revoke_timeout);
		}
	},
	    dispatch = function dispatch(filesaver, event_types, event) {
		event_types = [].concat(event_types);
		var i = event_types.length;
		while (i--) {
			var listener = filesaver["on" + event_types[i]];
			if (typeof listener === "function") {
				try {
					listener.call(filesaver, event || filesaver);
				} catch (ex) {
					throw_outside(ex);
				}
			}
		}
	},
	    auto_bom = function auto_bom(blob) {
		// prepend BOM for UTF-8 XML and text/* types (including HTML)
		if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
			return new Blob(["﻿", blob], { type: blob.type });
		}
		return blob;
	},
	    FileSaver = function FileSaver(blob, name, no_auto_bom) {
		if (!no_auto_bom) {
			blob = auto_bom(blob);
		}
		// First try a.download, then web filesystem, then object URLs
		var filesaver = this,
		    type = blob.type,
		    blob_changed = false,
		    object_url,
		    target_view,
		    dispatch_all = function dispatch_all() {
			dispatch(filesaver, "writestart progress write writeend".split(" "));
		},
		   
		// on any filesys errors revert to saving with object URLs
		fs_error = function fs_error() {
			// don't create more object URLs than needed
			if (blob_changed || !object_url) {
				object_url = get_URL().createObjectURL(blob);
			}
			if (target_view) {
				target_view.location.href = object_url;
			} else {
				var new_tab = view.open(object_url, "_blank");
				if (new_tab == undefined && typeof safari !== "undefined") {
					//Apple do not allow window.open, see http://bit.ly/1kZffRI
					view.location.href = object_url;
				}
			}
			filesaver.readyState = filesaver.DONE;
			dispatch_all();
			revoke(object_url);
		},
		    abortable = function abortable(func) {
			return function () {
				if (filesaver.readyState !== filesaver.DONE) {
					return func.apply(this, arguments);
				}
			};
		},
		    create_if_not_found = { create: true, exclusive: false },
		    slice;
		filesaver.readyState = filesaver.INIT;
		if (!name) {
			name = "download";
		}
		if (can_use_save_link) {
			object_url = get_URL().createObjectURL(blob);
			save_link.href = object_url;
			save_link.download = name;
			setTimeout(function () {
				click(save_link);
				dispatch_all();
				revoke(object_url);
				filesaver.readyState = filesaver.DONE;
			});
			return;
		}
		// Object and web filesystem URLs have a problem saving in Google Chrome when
		// viewed in a tab, so I force save with application/octet-stream
		// http://code.google.com/p/chromium/issues/detail?id=91158
		// Update: Google errantly closed 91158, I submitted it again:
		// https://code.google.com/p/chromium/issues/detail?id=389642
		if (view.chrome && type && type !== force_saveable_type) {
			slice = blob.slice || blob.webkitSlice;
			blob = slice.call(blob, 0, blob.size, force_saveable_type);
			blob_changed = true;
		}
		// Since I can't be sure that the guessed media type will trigger a download
		// in WebKit, I append .download to the filename.
		// https://bugs.webkit.org/show_bug.cgi?id=65440
		if (webkit_req_fs && name !== "download") {
			name += ".download";
		}
		if (type === force_saveable_type || webkit_req_fs) {
			target_view = view;
		}
		if (!req_fs) {
			fs_error();
			return;
		}
		fs_min_size += blob.size;
		req_fs(view.TEMPORARY, fs_min_size, abortable(function (fs) {
			fs.root.getDirectory("saved", create_if_not_found, abortable(function (dir) {
				var save = function save() {
					dir.getFile(name, create_if_not_found, abortable(function (file) {
						file.createWriter(abortable(function (writer) {
							writer.onwriteend = function (event) {
								target_view.location.href = file.toURL();
								filesaver.readyState = filesaver.DONE;
								dispatch(filesaver, "writeend", event);
								revoke(file);
							};
							writer.onerror = function () {
								var error = writer.error;
								if (error.code !== error.ABORT_ERR) {
									fs_error();
								}
							};
							"writestart progress write abort".split(" ").forEach(function (event) {
								writer["on" + event] = filesaver["on" + event];
							});
							writer.write(blob);
							filesaver.abort = function () {
								writer.abort();
								filesaver.readyState = filesaver.DONE;
							};
							filesaver.readyState = filesaver.WRITING;
						}), fs_error);
					}), fs_error);
				};
				dir.getFile(name, { create: false }, abortable(function (file) {
					// delete file if it already exists
					file.remove();
					save();
				}), abortable(function (ex) {
					if (ex.code === ex.NOT_FOUND_ERR) {
						save();
					} else {
						fs_error();
					}
				}));
			}), fs_error);
		}), fs_error);
	},
	    FS_proto = FileSaver.prototype,
	    saveAs = function saveAs(blob, name, no_auto_bom) {
		return new FileSaver(blob, name, no_auto_bom);
	};
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function (blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name || "download");
		};
	}

	FS_proto.abort = function () {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort");
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;

	return saveAs;
})(typeof self !== "undefined" && self || typeof window !== "undefined" && window || undefined.content);
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
	module.exports.saveAs = saveAs;
} else if (typeof define !== "undefined" && define !== null && define.amd != null) {
	define([], function () {
		return saveAs;
	});
}

// LICENSE
// Copyright © 2015 Eli Grey.
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

},{}],"/Users/will/Code/json-editor/src/js/models/HistoryModel.js":[function(require,module,exports){
'use strict';

var Immutable = require('immutable');
var EventEmitter = require('events');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _model = {
	history: Immutable.List([]),
	offset: 1
};

var HistoryModel = assign({}, EventEmitter.prototype, {
	getAll: function getAll() {
		return _model;
	},
	emitChange: function emitChange() {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function addChangeListener(cb) {
		this.on(CHANGE_EVENT, cb);
	},
	removeChangeListener: function removeChangeListener(cb) {
		this.removeListener(CHANGE_EVENT, cb);
	},
	'new': function _new(newModel) {
		_model = newModel;
		this.emitChange();
	},
	push: function push(value) {
		if (!_model.history.includes(value)) {
			_model.history = _model.history.skipLast(_model.offset - 1).push(value);
			_model.offset = 1;
			this.emitChange();
		}
	},
	pop: function pop() {
		var last = _model.last();
		_model.history = _model.history.pop();
		this.emitChange();
		return last;
	},
	get: function get() {
		return _model.history.get(_model.history.size - _model.offset);
	},
	setOffset: function setOffset(offset) {
		_model.offset = offset;
	},
	decOffset: function decOffset() {
		if (_model.offset !== 1) {
			_model.offset = _model.offset - 1;
		}
	},
	incOffset: function incOffset() {
		// console.log(_model.offset);
		if (_model.offset !== _model.history.size) {
			_model.offset = _model.offset + 1;
		}
	}
});

module.exports = HistoryModel;

},{"events":"/Users/will/Code/json-editor/node_modules/grunt-browserify/node_modules/browserify/node_modules/events/events.js","immutable":"immutable","object-assign":"/Users/will/Code/json-editor/node_modules/object-assign/index.js"}]},{},["/Users/will/Code/json-editor/src/js/index.js"]);
