'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
var Entry = exports.Entry = _react2.default.createClass({
	displayName: 'Entry',

	propTypes: {
		keyName: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired,
		value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.instanceOf(_immutable.List), _react2.default.PropTypes.instanceOf(_immutable.Map), _react2.default.PropTypes.string]).isRequired,
		minEditDepth: _react2.default.PropTypes.number,
		minRemovalDepth: _react2.default.PropTypes.number
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
		this.props.cursor.delete(this.props.keyName);
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
		return this.props.value !== nextProps.value || this.props.style !== nextProps.style || this.state.collapsed !== nextState.collapsed || this.state.inputValue !== nextState.inputValue || this.props.cursor !== nextProps.cursor;
	},
	render: function render() {
		var _this = this;

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
					fileName: '../../../src/components/Entry.jsx',
					lineNumber: 95
				}
			},
			isMap || isList ? _react2.default.createElement(
				'a',
				{ onClick: this.toggleCollapsed, __source: {
						fileName: '../../../src/components/Entry.jsx',
						lineNumber: 96
					}
				},
				_react2.default.createElement('i', { className: 'fa ' + (collapsed ? 'fa-plus-square' : 'fa-minus-square'), style: { color: "#FFD569", marginLeft: '-23px' }, __source: {
						fileName: '../../../src/components/Entry.jsx',
						lineNumber: 96
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
						fileName: '../../../src/components/Entry.jsx',
						lineNumber: 99
					}
				},
				'{',
				' ',
				isMinRemovalDepth ? _react2.default.createElement(
					'a',
					{ href: '#', onClick: this.deletePath, __source: {
							fileName: '../../../src/components/Entry.jsx',
							lineNumber: 99
						}
					},
					_react2.default.createElement('i', { className: 'fa fa-times-circle', style: { color: "#FD971F" }, __source: {
							fileName: '../../../src/components/Entry.jsx',
							lineNumber: 99
						}
					}),
					' '
				) : '',
				value.map(function (v, k) {
					return _react2.default.createElement(Entry, _extends({}, _this.props, { cursor: cursor, key: k, value: v, keyName: k, style: hideEntry, __source: {
							fileName: '../../../src/components/Entry.jsx',
							lineNumber: 101
						}
					}));
				}).toList(),
				isMinEditDepth && !collapsed ? _react2.default.createElement(_AddMapEntry.AddMapEntry, { cursor: this.props.cursor, keyName: this.props.keyName, __source: {
						fileName: '../../../src/components/Entry.jsx',
						lineNumber: 103
					}
				}) : '',
				'}'
			) : isList ? _react2.default.createElement(
				'span',
				{
					__source: {
						fileName: '../../../src/components/Entry.jsx',
						lineNumber: 106
					}
				},
				'[',
				' ',
				isMinRemovalDepth ? _react2.default.createElement(
					'a',
					{ href: '#', onClick: this.deletePath, __source: {
							fileName: '../../../src/components/Entry.jsx',
							lineNumber: 106
						}
					},
					_react2.default.createElement('i', { className: 'fa fa-times-circle', style: { color: "#FD971F" }, __source: {
							fileName: '../../../src/components/Entry.jsx',
							lineNumber: 106
						}
					}),
					' '
				) : '',
				value.map(function (v, k) {
					return _react2.default.createElement(Entry, _extends({}, _this.props, { cursor: cursor, key: k, value: v, keyName: k, style: hideEntry, __source: {
							fileName: '../../../src/components/Entry.jsx',
							lineNumber: 108
						}
					}));
				}).toList(),
				isMinEditDepth && !collapsed ? _react2.default.createElement(_AddListEntry.AddListEntry, { cursor: this.props.cursor, keyName: this.props.keyName, __source: {
						fileName: '../../../src/components/Entry.jsx',
						lineNumber: 110
					}
				}) : '',
				']'
			) : _react2.default.createElement(
				'span',
				{ style: inputContainerStyle, __source: {
						fileName: '../../../src/components/Entry.jsx',
						lineNumber: 112
					}
				},
				'"',
				_react2.default.createElement('input', {
					type: 'text',
					value: this.state.inputValue,
					onChange: this._onChange,
					onBlur: this._onBlur,
					onKeyUp: this._onKeyUp,
					size: this.state.inputValue.length,
					style: inputStyle,
					__source: {
						fileName: '../../../src/components/Entry.jsx',
						lineNumber: 113
					}
				}),
				'" ',
				_react2.default.createElement(
					'a',
					{ href: '#', onClick: this.deletePath, __source: {
							fileName: '../../../src/components/Entry.jsx',
							lineNumber: 121
						}
					},
					_react2.default.createElement('i', { className: 'fa fa-times-circle', style: { color: "#FD971F" }, __source: {
							fileName: '../../../src/components/Entry.jsx',
							lineNumber: 121
						}
					})
				)
			)
		);
	}
});
