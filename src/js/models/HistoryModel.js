const Immutable = require('immutable');
const EventEmitter = require('events');
const assign = require('object-assign');
const CHANGE_EVENT = 'change';

let _model = {
	history: Immutable.List([]),
	offset: 1
};

const HistoryModel = assign({}, EventEmitter.prototype, {
	getAll() {
		return _model;
	},
	emitChange() {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener(cb) {
		this.on(CHANGE_EVENT, cb);
	},
	removeChangeListener(cb) {
		this.removeListener(CHANGE_EVENT, cb);
	},
	new(newModel) {
		_model = newModel;
		this.emitChange();
	},
	push(value) {
		if (!_model.history.includes(value)) {
			_model.history = _model.history.skipLast(_model.offset-1).push(value);
			_model.offset = 1;
			this.emitChange();
		}
	},
	pop() {
		const last = _model.last();
		_model.history = _model.history.pop();
		this.emitChange();
		return last;
	},
	get() {
		return _model.history.get(_model.history.size-_model.offset);
	},
	setOffset(offset) {
		_model.offset = offset;
	},
	decOffset() {
		if (_model.offset !== 1) {
			_model.offset = _model.offset - 1;
		}
	},
	incOffset() {
		// console.log(_model.offset);
		if (_model.offset !== _model.history.size) {
			_model.offset = _model.offset + 1;
		}
	}
});

module.exports = HistoryModel;
