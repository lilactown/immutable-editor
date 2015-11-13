'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AddListEntry = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddListEntry = exports.AddListEntry = _react2.default.createClass({
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
			map: new _immutable.Map({}),
			list: new _immutable.List([]),
			string: ""
		};
		if (this.props.keyName) {
			this.props.cursor.get(this.props.keyName).push(types[this.state.dataType]);
		} else {
			this.props.cursor.push(types[this.state.dataType]);
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
	render: function render() {
		if (this.state.showOptions) {
			return _react2.default.createElement(
				'div',
				{ style: { marginLeft: "20px" }, __source: {
						fileName: '../../../src/components/AddListEntry.jsx',
						lineNumber: 36
					}
				},
				_react2.default.createElement(
					'label',
					{ htmlFor: 'type', __source: {
							fileName: '../../../src/components/AddListEntry.jsx',
							lineNumber: 37
						}
					},
					'type:'
				),
				' ',
				_react2.default.createElement(
					'select',
					{ name: 'type', onChange: this.setType, __source: {
							fileName: '../../../src/components/AddListEntry.jsx',
							lineNumber: 37
						}
					},
					_react2.default.createElement(
						'option',
						{ value: 'string', __source: {
								fileName: '../../../src/components/AddListEntry.jsx',
								lineNumber: 38
							}
						},
						'String'
					),
					_react2.default.createElement(
						'option',
						{ value: 'map', __source: {
								fileName: '../../../src/components/AddListEntry.jsx',
								lineNumber: 39
							}
						},
						'Map'
					),
					_react2.default.createElement(
						'option',
						{ value: 'list', __source: {
								fileName: '../../../src/components/AddListEntry.jsx',
								lineNumber: 40
							}
						},
						'List'
					)
				),
				' ',
				_react2.default.createElement(
					'a',
					{ href: '#', onClick: this.pushPath, __source: {
							fileName: '../../../src/components/AddListEntry.jsx',
							lineNumber: 42
						}
					},
					_react2.default.createElement('i', { className: 'fa fa-plus', style: { color: "#A6E22E" }, __source: {
							fileName: '../../../src/components/AddListEntry.jsx',
							lineNumber: 42
						}
					})
				),
				' ',
				_react2.default.createElement(
					'a',
					{ href: '#', onClick: this.toggleOptions, __source: {
							fileName: '../../../src/components/AddListEntry.jsx',
							lineNumber: 43
						}
					},
					_react2.default.createElement('i', { className: 'fa fa-remove', style: { color: "#FD971F" }, __source: {
							fileName: '../../../src/components/AddListEntry.jsx',
							lineNumber: 43
						}
					})
				)
			);
		}
		return _react2.default.createElement(
			'div',
			{ style: { marginLeft: "19px" }, __source: {
					fileName: '../../../src/components/AddListEntry.jsx',
					lineNumber: 47
				}
			},
			String.fromCharCode(8627),
			' ',
			_react2.default.createElement(
				'a',
				{ href: '#', __source: {
						fileName: '../../../src/components/AddListEntry.jsx',
						lineNumber: 47
					}
				},
				_react2.default.createElement('i', { onClick: this.toggleOptions, className: 'fa fa-plus-circle add', style: { color: "#A6E22E" }, __source: {
						fileName: '../../../src/components/AddListEntry.jsx',
						lineNumber: 47
					}
				})
			)
		);
	}
});
