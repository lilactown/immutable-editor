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

module.exports = HistoryModel;
