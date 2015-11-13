'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AddListEntry = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddListEntry = exports.AddListEntry = (function (_Component) {
	_inherits(AddListEntry, _Component);

	function AddListEntry() {
		_classCallCheck(this, AddListEntry);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AddListEntry).call(this));

		_this.state = {
			showOptions: false,
			dataType: "string"
		};
		return _this;
	}

	_createClass(AddListEntry, [{
		key: 'pushPath',
		value: function pushPath(e) {
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
		key: 'render',
		value: function render() {
			var _this2 = this;

			if (this.state.showOptions) {
				return _react2.default.createElement(
					'div',
					{ style: { marginLeft: "20px" }, __source: {
							fileName: '../../../src/components/AddListEntry.js',
							lineNumber: 38
						}
					},
					_react2.default.createElement(
						'label',
						{ htmlFor: 'type', __source: {
								fileName: '../../../src/components/AddListEntry.js',
								lineNumber: 39
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
								fileName: '../../../src/components/AddListEntry.js',
								lineNumber: 39
							}
						},
						_react2.default.createElement(
							'option',
							{ value: 'string', __source: {
									fileName: '../../../src/components/AddListEntry.js',
									lineNumber: 40
								}
							},
							'String'
						),
						_react2.default.createElement(
							'option',
							{ value: 'map', __source: {
									fileName: '../../../src/components/AddListEntry.js',
									lineNumber: 41
								}
							},
							'Map'
						),
						_react2.default.createElement(
							'option',
							{ value: 'list', __source: {
									fileName: '../../../src/components/AddListEntry.js',
									lineNumber: 42
								}
							},
							'List'
						)
					),
					' ',
					_react2.default.createElement(
						'a',
						{ href: '#', onClick: function onClick(e) {
								return _this2.pushPath(e);
							}, __source: {
								fileName: '../../../src/components/AddListEntry.js',
								lineNumber: 44
							}
						},
						_react2.default.createElement('i', { className: 'fa fa-plus', style: { color: "#A6E22E" }, __source: {
								fileName: '../../../src/components/AddListEntry.js',
								lineNumber: 44
							}
						})
					),
					' ',
					_react2.default.createElement(
						'a',
						{ href: '#', onClick: function onClick(e) {
								return _this2.toggleOptions(e);
							}, __source: {
								fileName: '../../../src/components/AddListEntry.js',
								lineNumber: 45
							}
						},
						_react2.default.createElement('i', { className: 'fa fa-remove', style: { color: "#FD971F" }, __source: {
								fileName: '../../../src/components/AddListEntry.js',
								lineNumber: 45
							}
						})
					)
				);
			}
			return _react2.default.createElement(
				'div',
				{ style: { marginLeft: "19px" }, __source: {
						fileName: '../../../src/components/AddListEntry.js',
						lineNumber: 49
					}
				},
				String.fromCharCode(8627),
				' ',
				_react2.default.createElement(
					'a',
					{ href: '#', __source: {
							fileName: '../../../src/components/AddListEntry.js',
							lineNumber: 49
						}
					},
					_react2.default.createElement('i', { onClick: function onClick(e) {
							return _this2.toggleOptions(e);
						}, className: 'fa fa-plus-circle add', style: { color: "#A6E22E" }, __source: {
							fileName: '../../../src/components/AddListEntry.js',
							lineNumber: 49
						}
					})
				)
			);
		}
	}]);

	return AddListEntry;
})(_react.Component);
