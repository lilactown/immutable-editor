'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Immutable = require('immutable');
var Cursor = require('immutable/contrib/cursor');
var List = Immutable.List;
var Map = Immutable.Map;

var assign = require('object-assign');

var AddMapEntry = require('./AddMapEntry');
var AddListEntry = require('./AddListEntry');

var inputStyle = {
	fontFamily: '"Source Code Pro", monospace',
	background: '#282828',
	border: '0',
	color: '#E6DB74',
	wordBreak: 'break-word'
};

var inputContainerStyle = {
	fontFamily: '"Source Code Pro", monospace',
	color: '#E6DB74',
	fontSize: '11px'
};

var Entry = React.createClass({
	displayName: 'Entry',

	propTypes: {
		keyName: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
		value: React.PropTypes.oneOfType([React.PropTypes.instanceOf(List), React.PropTypes.instanceOf(Map), React.PropTypes.string]).isRequired,
		minEditDepth: React.PropTypes.number,
		minRemovalDepth: React.PropTypes.number
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
		this.props.cursor['delete'](this.props.keyName);
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
		return this.props.value !== nextProps.value || this.props.style !== nextProps.style || this.state.collapsed !== nextState.collapsed || this.state.inputValue !== nextState.inputValue;
	},
	render: function render() {
		var _this = this;

		var cursor = this.props.cursor.get(this.props.keyName);
		var value = this.props.value;
		var collapsed = this.state.collapsed;

		var isMinRemovalDepth = this.props.cursor['_keyPath'].length + 1 >= this.props.minRemovalDepth;
		var isMinEditDepth = this.props.cursor['_keyPath'].length + 1 >= this.props.minEditDepth;
		var isMap = Map.isMap(value);
		var isList = List.isList(value);

		var hideEntry = { display: collapsed ? 'none' : 'block' };
		return React.createElement(
			'div',
			{ style: assign({ marginLeft: "20px" }, this.props.style) },
			isMap || isList ? React.createElement(
				'a',
				{ onClick: this.toggleCollapsed },
				React.createElement('i', { className: 'fa ' + (collapsed ? 'fa-plus-square' : 'fa-minus-square'), style: { color: "#FFD569", marginLeft: '-23px' } })
			) : '',
			' ',
			this.props.keyName,
			':',
			' ',
			isMap ? React.createElement(
				'span',
				null,
				'{',
				' ',
				isMinRemovalDepth ? React.createElement(
					'a',
					{ href: '#', onClick: this.deletePath },
					React.createElement('i', { className: 'fa fa-times-circle', style: { color: "#FD971F" } }),
					' '
				) : '',
				value.map(function (v, k) {
					return React.createElement(Entry, _extends({}, _this.props, { cursor: cursor, key: k, value: v, keyName: k, style: hideEntry }));
				}).toList(),
				isMinEditDepth && !collapsed ? React.createElement(AddMapEntry, { cursor: this.props.cursor, keyName: this.props.keyName }) : '',
				'}'
			) : isList ? React.createElement(
				'span',
				null,
				'[',
				' ',
				isMinRemovalDepth ? React.createElement(
					'a',
					{ href: '#', onClick: this.deletePath },
					React.createElement('i', { className: 'fa fa-times-circle', style: { color: "#FD971F" } }),
					' '
				) : '',
				value.map(function (v, k) {
					return React.createElement(Entry, _extends({}, _this.props, { cursor: cursor, key: k, value: v, keyName: k, style: hideEntry }));
				}).toList(),
				isMinEditDepth && !collapsed ? React.createElement(AddListEntry, { cursor: this.props.cursor, keyName: this.props.keyName }) : '',
				']'
			) : React.createElement(
				'span',
				{ style: inputContainerStyle },
				'"',
				React.createElement('input', {
					type: 'text',
					value: this.state.inputValue,
					onChange: this._onChange,
					onBlur: this._onBlur,
					onKeyUp: this._onKeyUp,
					size: this.state.inputValue.length,
					style: inputStyle
				}),
				'" ',
				React.createElement(
					'a',
					{ href: '#', onClick: this.deletePath },
					React.createElement('i', { className: 'fa fa-times-circle', style: { color: "#FD971F" } })
				)
			)
		);
	}
});

module.exports = Entry;
