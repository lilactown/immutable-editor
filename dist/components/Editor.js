// Top-level component
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var _require = require('immutable');

var Map = _require.Map;
var List = _require.List;

var HistoryModel = require('../models/HistoryModel');

var Entry = require('./Entry');
var Toolbar = require('./Toolbar');
var AddMapEntry = require('./AddMapEntry');
var AddListEntry = require('./AddListEntry');

var editorStyle = {
	background: '#282828',
	color: "#F8F8F2",
	fontFamily: '"Source Code Pro", monospace',
	fontSize: "16px",
	WebkitFontSmoothing: "initial"
};

var Editor = React.createClass({
	displayName: 'Editor',

	propTypes: {
		name: React.PropTypes.string
	},
	componentDidMount: function componentDidMount() {
		HistoryModel.push(this.props.data);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		HistoryModel.push(nextProps.data);
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
		return this.props.data !== nextProps.data;
	},
	render: function render() {
		var _this = this;

		// console.log(this.props.cursor.size);
		var isMap = Map.isMap(this.props.data);
		var isList = List.isList(this.props.data);
		return React.createElement(
			'div',
			{ style: editorStyle },
			React.createElement(
				'div',
				{ style: { margin: "0px 10px" } },
				React.createElement(Toolbar, { cursor: this.props.cursor }),
				isMap ? '{' : '[',
				React.createElement(
					'div',
					{ style: { marginLeft: "5px" } },
					this.props.data.map(function (entry, key) {
						return React.createElement(Entry, _extends({}, _this.props, {
							cursor: _this.props.cursor,
							value: entry,
							key: key,
							keyName: key
						}));
					}).toList(),
					this.props.minEditDepth === 0 ? isMap ? React.createElement(AddMapEntry, { cursor: this.props.cursor }) : React.createElement(AddListEntry, { cursor: this.props.cursor }) : ''
				),
				isMap ? '}' : ']'
			)
		);
	}
});

window.HistoryModel = HistoryModel;

module.exports = Editor;
