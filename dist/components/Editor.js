'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Top-level component

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Editor = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _cursor = require('immutable/contrib/cursor');

var _cursor2 = _interopRequireDefault(_cursor);

var _FileSaver = require('../libs/FileSaver');

var _FileSaver2 = _interopRequireDefault(_FileSaver);

var _HistoryModel = require('../models/HistoryModel');

var _HistoryModel2 = _interopRequireDefault(_HistoryModel);

var _Entry = require('./Entry');

var _AddMapEntry = require('./AddMapEntry');

var _AddListEntry = require('./AddListEntry');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var editorStyle = {
	background: '#282828',
	color: "#F8F8F2",
	fontFamily: '"Source Code Pro", monospace',
	fontSize: "16px",
	WebkitFontSmoothing: "initial"
};

var Editor = exports.Editor = _react2.default.createClass({
	displayName: 'Editor',

	statics: {
		undo: function undo() {
			var immutable = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			_HistoryModel2.default.incOffset();
			var nextState = _HistoryModel2.default.get(_HistoryModel2.default.getAll().offset);
			// this.props.cursor.update((v) => { return nextState; });
			return immutable ? nextState : nextState.toJS();
		},
		redo: function redo() {
			var immutable = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			_HistoryModel2.default.decOffset();
			var nextState = _HistoryModel2.default.get(_HistoryModel2.default.getAll().offset);
			// this.props.cursor.update((v) => { return nextState; });
			return immutable ? nextState : nextState.toJS();
		},
		save: function save(name) {
			var blob = new Blob([JSON.stringify(_HistoryModel2.default.get(_HistoryModel2.default.getAll().offset).toJS())], { type: "application/json;charset=utf-8" });
			_FileSaver2.default.saveAs(blob, name);
		}
	},
	propTypes: {
		data: _react2.default.PropTypes.object.isRequired,
		onUpdate: _react2.default.PropTypes.func.isRequired,
		immutable: _react2.default.PropTypes.bool,
		minEditDepth: _react2.default.PropTypes.number,
		minRemovalDepth: _react2.default.PropTypes.number
	},
	componentDidMount: function componentDidMount() {
		_HistoryModel2.default.push(_immutable2.default.fromJS(this.props.data));
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
		return this.props.data !== nextProps.data;
	},
	render: function render() {
		var _this = this;

		var data = _immutable2.default.fromJS(this.props.data);

		var rootCursor = _cursor2.default.from(data, function (newData, oldData, path) {
			console.log(newData !== oldData);
			if (newData !== oldData) {
				_HistoryModel2.default.push(newData);
				_this.props.onUpdate(_this.props.immutable ? newData : newData.toJS());
			}
		});

		var isMap = _immutable.Map.isMap(this.props.data);
		var isList = _immutable.List.isList(this.props.data);
		return _react2.default.createElement(
			'div',
			{ style: editorStyle, __source: {
					fileName: '../../../src/components/Editor.jsx',
					lineNumber: 67
				}
			},
			_react2.default.createElement(
				'div',
				{ style: { margin: "0px 10px" }, __source: {
						fileName: '../../../src/components/Editor.jsx',
						lineNumber: 68
					}
				},
				isMap ? '{' : '[',
				_react2.default.createElement(
					'div',
					{ style: { marginLeft: "5px" }, __source: {
							fileName: '../../../src/components/Editor.jsx',
							lineNumber: 71
						}
					},
					data.map(function (entry, key) {
						return _react2.default.createElement(_Entry.Entry, _extends({}, _this.props, {
							cursor: rootCursor,
							value: entry,
							key: key,
							keyName: key,
							__source: {
								fileName: '../../../src/components/Editor.jsx',
								lineNumber: 73
							}
						}));
					}).toList(),
					this.props.minEditDepth === 0 ? isMap ? _react2.default.createElement(_AddMapEntry.AddMapEntry, { cursor: rootCursor, __source: {
							fileName: '../../../src/components/Editor.jsx',
							lineNumber: 83
						}
					}) : _react2.default.createElement(_AddListEntry.AddListEntry, { cursor: rootCursor, __source: {
							fileName: '../../../src/components/Editor.jsx',
							lineNumber: 84
						}
					}) : ''
				),
				isMap ? '}' : ']'
			)
		);
	}
});

window.HistoryModel = _HistoryModel2.default;
