// Top-level component
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Immutable = require('immutable');
var Map = Immutable.Map;
var List = Immutable.List;

var Cursor = require('immutable/contrib/cursor');

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
		data: React.PropTypes.object.isRequired,
		onUpdate: React.PropTypes.func.isRequired,
		immutable: React.PropTypes.bool,
		minEditDepth: React.PropTypes.number,
		minRemovalDepth: React.PropTypes.number
	},
	componentDidMount: function componentDidMount() {
		HistoryModel.push(Immutable.fromJS(this.props.data));
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
		return this.props.data !== nextProps.data;
	},
	render: function render() {
		var _this = this;

		var data = Immutable.fromJS(this.props.data);

		var rootCursor = Cursor.from(data, function (newData, oldData, path) {
			console.log(newData !== oldData);
			if (newData !== oldData) {
				HistoryModel.push(newData);
				_this.props.onUpdate(_this.props.immutable ? newData : newData.toJS());
			}
		});

		var isMap = Map.isMap(this.props.data);
		var isList = List.isList(this.props.data);
		return React.createElement(
			'div',
			{ style: editorStyle },
			React.createElement(
				'div',
				{ style: { margin: "0px 10px" } },
				React.createElement(Toolbar, { cursor: rootCursor }),
				isMap ? '{' : '[',
				React.createElement(
					'div',
					{ style: { marginLeft: "5px" } },
					data.map(function (entry, key) {
						return React.createElement(Entry, _extends({}, _this.props, {
							cursor: rootCursor,
							value: entry,
							key: key,
							keyName: key
						}));
					}).toList(),
					this.props.minEditDepth === 0 ? isMap ? React.createElement(AddMapEntry, { cursor: rootCursor }) : React.createElement(AddListEntry, { cursor: rootCursor }) : ''
				),
				isMap ? '}' : ']'
			)
		);
	}
});

window.HistoryModel = HistoryModel;

module.exports = Editor;
