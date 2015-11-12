'use strict';

var React = require('react');
var Immutable = require('immutable');
var List = Immutable.List;
var Map = Immutable.Map;

var inputStyle = {
	fontFamily: '"Source Code Pro", monospace',
	background: '#282828',
	border: '0',
	color: '#E6DB74',
	wordBreak: 'break-word'
};

var AddMapEntry = React.createClass({
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
			map: Map({}),
			list: List([]),
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
			return React.createElement(
				'div',
				{ style: { marginLeft: "20px" }, __source: {
						fileName: '../../../src/components/AddMapEntry.jsx',
						lineNumber: 50
					}
				},
				React.createElement(
					'label',
					{ htmlFor: 'key', __source: {
							fileName: '../../../src/components/AddMapEntry.jsx',
							lineNumber: 51
						}
					},
					'key:'
				),
				' ',
				React.createElement('input', { name: 'key', type: 'text', onChange: this.setKey, __source: {
						fileName: '../../../src/components/AddMapEntry.jsx',
						lineNumber: 51
					}
				}),
				React.createElement('br', {
					__source: {
						fileName: '../../../src/components/AddMapEntry.jsx',
						lineNumber: 51
					}
				}),
				React.createElement(
					'label',
					{ htmlFor: 'type', __source: {
							fileName: '../../../src/components/AddMapEntry.jsx',
							lineNumber: 52
						}
					},
					'type:'
				),
				' ',
				React.createElement(
					'select',
					{ name: 'type', onChange: this.setType, __source: {
							fileName: '../../../src/components/AddMapEntry.jsx',
							lineNumber: 52
						}
					},
					React.createElement(
						'option',
						{ value: 'string', __source: {
								fileName: '../../../src/components/AddMapEntry.jsx',
								lineNumber: 53
							}
						},
						'String'
					),
					React.createElement(
						'option',
						{ value: 'map', __source: {
								fileName: '../../../src/components/AddMapEntry.jsx',
								lineNumber: 54
							}
						},
						'Map'
					),
					React.createElement(
						'option',
						{ value: 'list', __source: {
								fileName: '../../../src/components/AddMapEntry.jsx',
								lineNumber: 55
							}
						},
						'List'
					)
				),
				' ',
				React.createElement(
					'a',
					{ href: '#', onClick: this.setPath, __source: {
							fileName: '../../../src/components/AddMapEntry.jsx',
							lineNumber: 57
						}
					},
					React.createElement('i', { className: 'fa fa-plus', style: { color: "#A6E22E" }, __source: {
							fileName: '../../../src/components/AddMapEntry.jsx',
							lineNumber: 57
						}
					})
				),
				' ',
				React.createElement(
					'a',
					{ href: '#', onClick: this.toggleOptions, __source: {
							fileName: '../../../src/components/AddMapEntry.jsx',
							lineNumber: 58
						}
					},
					React.createElement('i', { className: 'fa fa-remove', style: { color: "#FD971F" }, __source: {
							fileName: '../../../src/components/AddMapEntry.jsx',
							lineNumber: 58
						}
					})
				)
			);
		}
		return React.createElement(
			'div',
			{ style: { marginLeft: "19px" }, __source: {
					fileName: '../../../src/components/AddMapEntry.jsx',
					lineNumber: 62
				}
			},
			String.fromCharCode(8627),
			' ',
			React.createElement(
				'a',
				{ href: '#', __source: {
						fileName: '../../../src/components/AddMapEntry.jsx',
						lineNumber: 62
					}
				},
				React.createElement('i', { onClick: this.toggleOptions, className: 'fa fa-plus-circle', style: { color: "#A6E22E" }, __source: {
						fileName: '../../../src/components/AddMapEntry.jsx',
						lineNumber: 62
					}
				})
			)
		);
	}
});

module.exports = AddMapEntry;
