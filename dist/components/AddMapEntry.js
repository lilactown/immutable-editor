'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AddMapEntry = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inputStyle = {
	fontFamily: '"Source Code Pro", monospace',
	background: '#282828',
	border: '0',
	color: '#E6DB74',
	wordBreak: 'break-word'
};

var AddMapEntry = exports.AddMapEntry = _react2.default.createClass({
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
			map: (0, _immutable.Map)({}),
			list: (0, _immutable.List)([]),
			string: ""
		};
		if (this.props.keyName) {
			this.props.cursor.get(this.props.keyName).set(this.state.keyName, types[this.state.dataType]);
		} else {
			this.props.cursor.set(this.state.keyName, types[this.state.dataType]);
		}
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
			return _react2.default.createElement(
				'div',
				{ style: { marginLeft: "20px" }, __source: {
						fileName: '../../../src/components/AddMapEntry.jsx',
						lineNumber: 49
					}
				},
				_react2.default.createElement(
					'label',
					{ htmlFor: 'key', __source: {
							fileName: '../../../src/components/AddMapEntry.jsx',
							lineNumber: 50
						}
					},
					'key:'
				),
				' ',
				_react2.default.createElement('input', { name: 'key', type: 'text', onChange: this.setKey, __source: {
						fileName: '../../../src/components/AddMapEntry.jsx',
						lineNumber: 50
					}
				}),
				_react2.default.createElement('br', {
					__source: {
						fileName: '../../../src/components/AddMapEntry.jsx',
						lineNumber: 50
					}
				}),
				_react2.default.createElement(
					'label',
					{ htmlFor: 'type', __source: {
							fileName: '../../../src/components/AddMapEntry.jsx',
							lineNumber: 51
						}
					},
					'type:'
				),
				' ',
				_react2.default.createElement(
					'select',
					{ name: 'type', onChange: this.setType, __source: {
							fileName: '../../../src/components/AddMapEntry.jsx',
							lineNumber: 51
						}
					},
					_react2.default.createElement(
						'option',
						{ value: 'string', __source: {
								fileName: '../../../src/components/AddMapEntry.jsx',
								lineNumber: 52
							}
						},
						'String'
					),
					_react2.default.createElement(
						'option',
						{ value: 'map', __source: {
								fileName: '../../../src/components/AddMapEntry.jsx',
								lineNumber: 53
							}
						},
						'Map'
					),
					_react2.default.createElement(
						'option',
						{ value: 'list', __source: {
								fileName: '../../../src/components/AddMapEntry.jsx',
								lineNumber: 54
							}
						},
						'List'
					)
				),
				' ',
				_react2.default.createElement(
					'a',
					{ href: '#', onClick: this.setPath, __source: {
							fileName: '../../../src/components/AddMapEntry.jsx',
							lineNumber: 56
						}
					},
					_react2.default.createElement('i', { className: 'fa fa-plus', style: { color: "#A6E22E" }, __source: {
							fileName: '../../../src/components/AddMapEntry.jsx',
							lineNumber: 56
						}
					})
				),
				' ',
				_react2.default.createElement(
					'a',
					{ href: '#', onClick: this.toggleOptions, __source: {
							fileName: '../../../src/components/AddMapEntry.jsx',
							lineNumber: 57
						}
					},
					_react2.default.createElement('i', { className: 'fa fa-remove', style: { color: "#FD971F" }, __source: {
							fileName: '../../../src/components/AddMapEntry.jsx',
							lineNumber: 57
						}
					})
				)
			);
		}
		return _react2.default.createElement(
			'div',
			{ style: { marginLeft: "19px" }, __source: {
					fileName: '../../../src/components/AddMapEntry.jsx',
					lineNumber: 61
				}
			},
			String.fromCharCode(8627),
			' ',
			_react2.default.createElement(
				'a',
				{ href: '#', __source: {
						fileName: '../../../src/components/AddMapEntry.jsx',
						lineNumber: 61
					}
				},
				_react2.default.createElement('i', { onClick: this.toggleOptions, className: 'fa fa-plus-circle', style: { color: "#A6E22E" }, __source: {
						fileName: '../../../src/components/AddMapEntry.jsx',
						lineNumber: 61
					}
				})
			)
		);
	}
});
