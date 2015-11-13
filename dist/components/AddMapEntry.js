'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AddMapEntry = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var inputStyle = {
	fontFamily: '"Source Code Pro", monospace',
	background: '#282828',
	border: '0',
	color: '#E6DB74',
	wordBreak: 'break-word'
};

var AddMapEntry = exports.AddMapEntry = (function (_Component) {
	_inherits(AddMapEntry, _Component);

	function AddMapEntry() {
		_classCallCheck(this, AddMapEntry);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AddMapEntry).call(this));

		_this.state = {
			showOptions: false,
			keyName: "",
			dataType: "string"
		};
		return _this;
	}

	_createClass(AddMapEntry, [{
		key: 'setPath',
		value: function setPath(e) {
			e.preventDefault();
			var types = {
				map: (0, _immutable.Map)({}),
				list: (0, _immutable.List)([]),
				string: ""
			};
			console.log(this.props.keyName);
			if (this.props.keyName !== undefined) {
				this.props.cursor.get(this.props.keyName).set(this.state.keyName, types[this.state.dataType]);
			} else {
				this.props.cursor.set(this.state.keyName, types[this.state.dataType]);
			}
			this.toggleOptions();
		}
	}, {
		key: 'toggleOptions',
		value: function toggleOptions() {
			this.setState({ showOptions: !this.state.showOptions });
		}
	}, {
		key: 'setType',
		value: function setType(e) {
			var dataType = e.target.value;
			this.setState({ dataType: dataType });
		}
	}, {
		key: 'setKey',
		value: function setKey(e) {
			var keyName = e.target.value;
			this.setState({ keyName: keyName });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			if (this.state.showOptions) {
				return _react2.default.createElement(
					'div',
					{ style: { marginLeft: "20px" }, __source: {
							fileName: '../../../src/components/AddMapEntry.js',
							lineNumber: 52
						}
					},
					_react2.default.createElement(
						'label',
						{ htmlFor: 'key', __source: {
								fileName: '../../../src/components/AddMapEntry.js',
								lineNumber: 53
							}
						},
						'key:'
					),
					' ',
					_react2.default.createElement('input', { name: 'key', type: 'text', onChange: function onChange(e) {
							return _this2.setKey(e);
						}, __source: {
							fileName: '../../../src/components/AddMapEntry.js',
							lineNumber: 53
						}
					}),
					_react2.default.createElement('br', {
						__source: {
							fileName: '../../../src/components/AddMapEntry.js',
							lineNumber: 53
						}
					}),
					_react2.default.createElement(
						'label',
						{ htmlFor: 'type', __source: {
								fileName: '../../../src/components/AddMapEntry.js',
								lineNumber: 54
							}
						},
						'type:'
					),
					' ',
					_react2.default.createElement(
						'select',
						{ name: 'type', onChange: function onChange(e) {
								return _this2.setType(e);
							}, __source: {
								fileName: '../../../src/components/AddMapEntry.js',
								lineNumber: 54
							}
						},
						_react2.default.createElement(
							'option',
							{ value: 'string', __source: {
									fileName: '../../../src/components/AddMapEntry.js',
									lineNumber: 55
								}
							},
							'String'
						),
						_react2.default.createElement(
							'option',
							{ value: 'map', __source: {
									fileName: '../../../src/components/AddMapEntry.js',
									lineNumber: 56
								}
							},
							'Map'
						),
						_react2.default.createElement(
							'option',
							{ value: 'list', __source: {
									fileName: '../../../src/components/AddMapEntry.js',
									lineNumber: 57
								}
							},
							'List'
						)
					),
					' ',
					_react2.default.createElement(
						'a',
						{ href: '#', onClick: function onClick(e) {
								return _this2.setPath(e);
							}, __source: {
								fileName: '../../../src/components/AddMapEntry.js',
								lineNumber: 59
							}
						},
						_react2.default.createElement('i', { className: 'fa fa-plus', style: { color: "#A6E22E" }, __source: {
								fileName: '../../../src/components/AddMapEntry.js',
								lineNumber: 59
							}
						})
					),
					' ',
					_react2.default.createElement(
						'a',
						{ href: '#', onClick: function onClick(e) {
								return _this2.toggleOptions(e);
							}, __source: {
								fileName: '../../../src/components/AddMapEntry.js',
								lineNumber: 60
							}
						},
						_react2.default.createElement('i', { className: 'fa fa-remove', style: { color: "#FD971F" }, __source: {
								fileName: '../../../src/components/AddMapEntry.js',
								lineNumber: 60
							}
						})
					)
				);
			}
			return _react2.default.createElement(
				'div',
				{ style: { marginLeft: "19px" }, __source: {
						fileName: '../../../src/components/AddMapEntry.js',
						lineNumber: 64
					}
				},
				String.fromCharCode(8627),
				' ',
				_react2.default.createElement(
					'a',
					{ href: '#', __source: {
							fileName: '../../../src/components/AddMapEntry.js',
							lineNumber: 64
						}
					},
					_react2.default.createElement('i', { onClick: function onClick(e) {
							return _this2.toggleOptions(e);
						}, className: 'fa fa-plus-circle', style: { color: "#A6E22E" }, __source: {
							fileName: '../../../src/components/AddMapEntry.js',
							lineNumber: 64
						}
					})
				)
			);
		}
	}]);

	return AddMapEntry;
})(_react.Component);
