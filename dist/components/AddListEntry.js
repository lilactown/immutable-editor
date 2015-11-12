'use strict';

var React = require('react');
var Immutable = require('immutable');
var List = Immutable.List;
var Map = Immutable.Map;

var AddListEntry = React.createClass({
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
			map: new Map({}),
			list: new List([]),
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
			return React.createElement(
				'div',
				{ style: { marginLeft: "20px" }, __source: {
						fileName: '../../../src/components/AddListEntry.jsx',
						lineNumber: 37
					}
				},
				React.createElement(
					'label',
					{ htmlFor: 'type', __source: {
							fileName: '../../../src/components/AddListEntry.jsx',
							lineNumber: 38
						}
					},
					'type:'
				),
				' ',
				React.createElement(
					'select',
					{ name: 'type', onChange: this.setType, __source: {
							fileName: '../../../src/components/AddListEntry.jsx',
							lineNumber: 38
						}
					},
					React.createElement(
						'option',
						{ value: 'string', __source: {
								fileName: '../../../src/components/AddListEntry.jsx',
								lineNumber: 39
							}
						},
						'String'
					),
					React.createElement(
						'option',
						{ value: 'map', __source: {
								fileName: '../../../src/components/AddListEntry.jsx',
								lineNumber: 40
							}
						},
						'Map'
					),
					React.createElement(
						'option',
						{ value: 'list', __source: {
								fileName: '../../../src/components/AddListEntry.jsx',
								lineNumber: 41
							}
						},
						'List'
					)
				),
				' ',
				React.createElement(
					'a',
					{ href: '#', onClick: this.pushPath, __source: {
							fileName: '../../../src/components/AddListEntry.jsx',
							lineNumber: 43
						}
					},
					React.createElement('i', { className: 'fa fa-plus', style: { color: "#A6E22E" }, __source: {
							fileName: '../../../src/components/AddListEntry.jsx',
							lineNumber: 43
						}
					})
				),
				' ',
				React.createElement(
					'a',
					{ href: '#', onClick: this.toggleOptions, __source: {
							fileName: '../../../src/components/AddListEntry.jsx',
							lineNumber: 44
						}
					},
					React.createElement('i', { className: 'fa fa-remove', style: { color: "#FD971F" }, __source: {
							fileName: '../../../src/components/AddListEntry.jsx',
							lineNumber: 44
						}
					})
				)
			);
		}
		return React.createElement(
			'div',
			{ style: { marginLeft: "19px" }, __source: {
					fileName: '../../../src/components/AddListEntry.jsx',
					lineNumber: 48
				}
			},
			String.fromCharCode(8627),
			' ',
			React.createElement(
				'a',
				{ href: '#', __source: {
						fileName: '../../../src/components/AddListEntry.jsx',
						lineNumber: 48
					}
				},
				React.createElement('i', { onClick: this.toggleOptions, className: 'fa fa-plus-circle add', style: { color: "#A6E22E" }, __source: {
						fileName: '../../../src/components/AddListEntry.jsx',
						lineNumber: 48
					}
				})
			)
		);
	}
});

module.exports = AddListEntry;
