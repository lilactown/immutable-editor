'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CHANGE_EVENT = 'change';

var _model = {
	history: _immutable2.default.List([]),
	offset: 1
};

var HistoryModel = (0, _objectAssign2.default)({}, _events2.default.prototype, {
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
	new: function _new(newModel) {
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

exports.default = HistoryModel;
