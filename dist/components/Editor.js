'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Top-level component

var editorStyle = {
	background: '#282828',
	color: "#F8F8F2",
	fontFamily: '"Source Code Pro", monospace',
	fontSize: "16px",
	WebkitFontSmoothing: "initial"
};

var Editor = exports.Editor = (function (_Component) {
	_inherits(Editor, _Component);

	function Editor() {
		_classCallCheck(this, Editor);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Editor).apply(this, arguments));
	}

	_createClass(Editor, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			_HistoryModel2.default.push(_immutable2.default.fromJS(this.props.data));
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			return this.props.data !== nextProps.data;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var data = _immutable2.default.fromJS(this.props.data);

			var rootCursor = _cursor2.default.from(data, function (newData, oldData, path) {
				if (newData !== oldData) {
					console.log(_HistoryModel2.default.getAll().history.toJS());
					_HistoryModel2.default.push(newData);
					_this2.props.onUpdate(_this2.props.immutable ? newData : newData.toJS());
				}
			});

			var isMap = _immutable.Map.isMap(data);
			var isList = _immutable.List.isList(data);
			return _react2.default.createElement(
				'div',
				{ style: editorStyle, __source: {
						fileName: '../../../src/components/Editor.js',
						lineNumber: 60
					}
				},
				_react2.default.createElement(
					'div',
					{ style: { margin: "0px 10px" }, __source: {
							fileName: '../../../src/components/Editor.js',
							lineNumber: 61
						}
					},
					isMap ? '{' : '[',
					_react2.default.createElement(
						'div',
						{ style: { marginLeft: "5px" }, __source: {
								fileName: '../../../src/components/Editor.js',
								lineNumber: 64
							}
						},
						data.map(function (entry, key) {
							return _react2.default.createElement(_Entry.Entry, _extends({}, _this2.props, {
								cursor: rootCursor,
								value: entry,
								key: key,
								keyName: key,
								__source: {
									fileName: '../../../src/components/Editor.js',
									lineNumber: 66
								}
							}));
						}).toList(),
						this.props.minEditDepth === 0 ? isMap ? _react2.default.createElement(_AddMapEntry.AddMapEntry, { cursor: rootCursor, __source: {
								fileName: '../../../src/components/Editor.js',
								lineNumber: 76
							}
						}) : _react2.default.createElement(_AddListEntry.AddListEntry, { cursor: rootCursor, __source: {
								fileName: '../../../src/components/Editor.js',
								lineNumber: 77
							}
						}) : ''
					),
					isMap ? '}' : ']'
				)
			);
		}
	}], [{
		key: 'undo',
		value: function undo() {
			var immutable = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			_HistoryModel2.default.incOffset();
			var nextState = _HistoryModel2.default.get(_HistoryModel2.default.getAll().offset);
			console.log(nextState.toJS());
			// this.props.cursor.update((v) => { return nextState; });
			return immutable ? nextState : nextState.toJS();
		}
	}, {
		key: 'redo',
		value: function redo() {
			var immutable = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			_HistoryModel2.default.decOffset();
			var nextState = _HistoryModel2.default.get(_HistoryModel2.default.getAll().offset);
			// this.props.cursor.update((v) => { return nextState; });
			return immutable ? nextState : nextState.toJS();
		}
	}, {
		key: 'save',
		value: function save(name) {
			var blob = new Blob([JSON.stringify(_HistoryModel2.default.get(_HistoryModel2.default.getAll().offset).toJS())], { type: "application/json;charset=utf-8" });
			_FileSaver2.default.saveAs(blob, name);
		}
	}]);

	return Editor;
})(_react.Component);

Editor.propTypes = {
	data: _react2.default.PropTypes.object.isRequired,
	onUpdate: _react2.default.PropTypes.func.isRequired,
	immutable: _react2.default.PropTypes.bool,
	minEditDepth: _react2.default.PropTypes.number,
	minRemovalDepth: _react2.default.PropTypes.number
};
