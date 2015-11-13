'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Entry = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _cursor = require('immutable/contrib/cursor');

var _cursor2 = _interopRequireDefault(_cursor);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _AddMapEntry = require('./AddMapEntry');

var _AddListEntry = require('./AddListEntry');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var inputStyle = {
	fontFamily: '"Source Code Pro", monospace',
	background: '#282828',
	border: '0',
	color: '#E6DB74',
	wordBreak: 'break-word',
	fontSize: 'inherit'
};

var inputContainerStyle = {
	fontFamily: '"Source Code Pro", monospace',
	color: '#E6DB74'
};

// fontSize: '11px'

var Entry = exports.Entry = (function (_Component) {
	_inherits(Entry, _Component);

	function Entry(props) {
		_classCallCheck(this, Entry);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Entry).call(this, props));

		_this.state = {
			collapsed: false,
			inputValue: ""
		};
		return _this;
	}

	_createClass(Entry, [{
		key: '_onChange',
		value: function _onChange(e) {
			this.setState({ inputValue: e.target.value });
		}
	}, {
		key: '_onBlur',
		value: function _onBlur(e) {
			// update the model on blur
			this.props.cursor.set(this.props.keyName, this.state.inputValue);
		}
	}, {
		key: '_onKeyUp',
		value: function _onKeyUp(e) {
			// update the model on enter
			if (e.key === "Enter") {
				this.props.cursor.set(this.props.keyName, this.state.inputValue);
			}
		}
	}, {
		key: 'deletePath',
		value: function deletePath(e) {
			e.preventDefault();
			this.props.cursor.delete(this.props.keyName);
		}
	}, {
		key: 'toggleCollapsed',
		value: function toggleCollapsed(e) {
			e.preventDefault();
			this.setState({ collapsed: !this.state.collapsed });
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.setState({
				inputValue: this.props.value
			});
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState({
				inputValue: nextProps.value
			});
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return this.props.value !== nextProps.value || this.props.style !== nextProps.style || this.state.collapsed !== nextState.collapsed || this.state.inputValue !== nextState.inputValue || this.props.cursor !== nextProps.cursor;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var cursor = this.props.cursor.get(this.props.keyName);
			var value = this.props.value;
			var collapsed = this.state.collapsed;

			var isMinRemovalDepth = this.props.cursor['_keyPath'].length + 1 >= this.props.minRemovalDepth;
			var isMinEditDepth = this.props.cursor['_keyPath'].length + 1 >= this.props.minEditDepth;
			var isMap = _immutable.Map.isMap(value);
			var isList = _immutable.List.isList(value);

			var hideEntry = { display: collapsed ? 'none' : 'block' };
			return _react2.default.createElement(
				'div',
				{ style: (0, _objectAssign2.default)({ marginLeft: "20px" }, this.props.style), __source: {
						fileName: '../../../src/components/Entry.js',
						lineNumber: 84
					}
				},
				isMap || isList ? _react2.default.createElement(
					'a',
					{ onClick: function onClick(e) {
							return _this2.toggleCollapsed(e);
						}, __source: {
							fileName: '../../../src/components/Entry.js',
							lineNumber: 85
						}
					},
					_react2.default.createElement('i', { className: 'fa ' + (collapsed ? 'fa-plus-square' : 'fa-minus-square'), style: { color: "#FFD569", marginLeft: '-23px' }, __source: {
							fileName: '../../../src/components/Entry.js',
							lineNumber: 85
						}
					})
				) : '',
				' ',
				this.props.keyName,
				':',
				' ',
				isMap ? _react2.default.createElement(
					'span',
					{
						__source: {
							fileName: '../../../src/components/Entry.js',
							lineNumber: 88
						}
					},
					'{',
					' ',
					isMinRemovalDepth ? _react2.default.createElement(
						'a',
						{ href: '#', onClick: function onClick(e) {
								return _this2.deletePath(e);
							}, __source: {
								fileName: '../../../src/components/Entry.js',
								lineNumber: 88
							}
						},
						_react2.default.createElement('i', { className: 'fa fa-times-circle', style: { color: "#FD971F" }, __source: {
								fileName: '../../../src/components/Entry.js',
								lineNumber: 88
							}
						}),
						' '
					) : '',
					value.map(function (v, k) {
						return _react2.default.createElement(Entry, _extends({}, _this2.props, { cursor: cursor, key: k, value: v, keyName: k, style: hideEntry, __source: {
								fileName: '../../../src/components/Entry.js',
								lineNumber: 90
							}
						}));
					}).toList(),
					isMinEditDepth && !collapsed ? _react2.default.createElement(_AddMapEntry.AddMapEntry, { cursor: this.props.cursor, keyName: this.props.keyName, __source: {
							fileName: '../../../src/components/Entry.js',
							lineNumber: 92
						}
					}) : '',
					'}'
				) : isList ? _react2.default.createElement(
					'span',
					{
						__source: {
							fileName: '../../../src/components/Entry.js',
							lineNumber: 95
						}
					},
					'[',
					' ',
					isMinRemovalDepth ? _react2.default.createElement(
						'a',
						{ href: '#', onClick: function onClick(e) {
								return _this2.deletePath(e);
							}, __source: {
								fileName: '../../../src/components/Entry.js',
								lineNumber: 95
							}
						},
						_react2.default.createElement('i', { className: 'fa fa-times-circle', style: { color: "#FD971F" }, __source: {
								fileName: '../../../src/components/Entry.js',
								lineNumber: 95
							}
						}),
						' '
					) : '',
					value.map(function (v, k) {
						return _react2.default.createElement(Entry, _extends({}, _this2.props, { cursor: cursor, key: k, value: v, keyName: k, style: hideEntry, __source: {
								fileName: '../../../src/components/Entry.js',
								lineNumber: 97
							}
						}));
					}).toList(),
					isMinEditDepth && !collapsed ? _react2.default.createElement(_AddListEntry.AddListEntry, { cursor: this.props.cursor, keyName: this.props.keyName, __source: {
							fileName: '../../../src/components/Entry.js',
							lineNumber: 99
						}
					}) : '',
					']'
				) : _react2.default.createElement(
					'span',
					{ style: inputContainerStyle, __source: {
							fileName: '../../../src/components/Entry.js',
							lineNumber: 101
						}
					},
					'"',
					_react2.default.createElement('input', {
						type: 'text',
						value: this.state.inputValue,
						onChange: function onChange(e) {
							return _this2._onChange(e);
						},
						onBlur: function onBlur(e) {
							return _this2._onBlur(e);
						},
						onKeyUp: function onKeyUp(e) {
							return _this2._onKeyUp(e);
						},
						size: this.state.inputValue.length,
						style: inputStyle,
						__source: {
							fileName: '../../../src/components/Entry.js',
							lineNumber: 102
						}
					}),
					'" ',
					_react2.default.createElement(
						'a',
						{ href: '#', onClick: function onClick(e) {
								return _this2.deletePath(e);
							}, __source: {
								fileName: '../../../src/components/Entry.js',
								lineNumber: 110
							}
						},
						_react2.default.createElement('i', { className: 'fa fa-times-circle', style: { color: "#FD971F" }, __source: {
								fileName: '../../../src/components/Entry.js',
								lineNumber: 110
							}
						})
					)
				)
			);
		}
	}]);

	return Entry;
})(_react.Component);

Entry.propTypes = {
	keyName: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired,
	value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.instanceOf(_immutable.List), _react2.default.PropTypes.instanceOf(_immutable.Map), _react2.default.PropTypes.string]).isRequired,
	minEditDepth: _react2.default.PropTypes.number,
	minRemovalDepth: _react2.default.PropTypes.number
};
