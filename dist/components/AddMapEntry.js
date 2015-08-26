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
				{ style: { marginLeft: "20px" } },
				React.createElement(
					'label',
					{ htmlFor: 'key' },
					'key:'
				),
				' ',
				React.createElement('input', { name: 'key', type: 'text', onChange: this.setKey }),
				React.createElement('br', null),
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
					{ href: '#', onClick: this.setPath },
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
				React.createElement('i', { onClick: this.toggleOptions, className: 'fa fa-plus-circle', style: { color: "#A6E22E" } })
			)
		);
	}
});

module.exports = AddMapEntry;
