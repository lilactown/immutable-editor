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
				{ style: { marginLeft: "20px" } },
				React.createElement(
					'label',
					{ htmlFor: 'type' },
					'type:'
				),
				' ',
				React.createElement(
					'select',
					{ name: 'type', onChange: this.setType },
					React.createElement(
						'option',
						{ value: 'string' },
						'String'
					),
					React.createElement(
						'option',
						{ value: 'map' },
						'Map'
					),
					React.createElement(
						'option',
						{ value: 'list' },
						'List'
					)
				),
				' ',
				React.createElement(
					'a',
					{ href: '#', onClick: this.pushPath },
					React.createElement('i', { className: 'fa fa-plus', style: { color: "#A6E22E" } })
				),
				' ',
				React.createElement(
					'a',
					{ href: '#', onClick: this.toggleOptions },
					React.createElement('i', { className: 'fa fa-remove', style: { color: "#FD971F" } })
				)
			);
		}
		return React.createElement(
			'div',
			{ style: { marginLeft: "19px" } },
			String.fromCharCode(8627),
			' ',
			React.createElement(
				'a',
				{ href: '#' },
				React.createElement('i', { onClick: this.toggleOptions, className: 'fa fa-plus-circle add', style: { color: "#A6E22E" } })
			)
		);
	}
});

module.exports = AddListEntry;
