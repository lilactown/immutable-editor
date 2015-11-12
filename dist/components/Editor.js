'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Top-level component
var React = require('react');
var Immutable = require('immutable');
var Map = Immutable.Map;
var List = Immutable.List;

var Cursor = require('immutable/contrib/cursor');
var fs = require('../libs/FileSaver');

var HistoryModel = require('../models/HistoryModel');

var Entry = require('./Entry');
// const Toolbar = require('./Toolbar');
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

	statics: {
		undo: function undo() {
			var immutable = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			HistoryModel.incOffset();
			var nextState = HistoryModel.get(HistoryModel.getAll().offset);
			// this.props.cursor.update((v) => { return nextState; });
			return immutable ? nextState : nextState.toJS();
		},
		redo: function redo() {
			var immutable = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			HistoryModel.decOffset();
			var nextState = HistoryModel.get(HistoryModel.getAll().offset);
			// this.props.cursor.update((v) => { return nextState; });
			return immutable ? nextState : nextState.toJS();
		},
		save: function save(name) {
			var blob = new Blob([JSON.stringify(HistoryModel.get(HistoryModel.getAll().offset).toJS())], { type: "application/json;charset=utf-8" });
			fs.saveAs(blob, name);
		}
	},
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
			{ style: editorStyle, __source: {
					fileName: '../../../src/components/Editor.jsx',
					lineNumber: 69
				}
			},
			React.createElement(
				'div',
				{ style: { margin: "0px 10px" }, __source: {
						fileName: '../../../src/components/Editor.jsx',
						lineNumber: 70
					}
				},
				isMap ? '{' : '[',
				React.createElement(
					'div',
					{ style: { marginLeft: "5px" }, __source: {
							fileName: '../../../src/components/Editor.jsx',
							lineNumber: 73
						}
					},
					data.map(function (entry, key) {
						return React.createElement(Entry, _extends({}, _this.props, {
							cursor: rootCursor,
							value: entry,
							key: key,
							keyName: key,
							__source: {
								fileName: '../../../src/components/Editor.jsx',
								lineNumber: 75
							}
						}));
					}).toList(),
					this.props.minEditDepth === 0 ? isMap ? React.createElement(AddMapEntry, { cursor: rootCursor, __source: {
							fileName: '../../../src/components/Editor.jsx',
							lineNumber: 85
						}
					}) : React.createElement(AddListEntry, { cursor: rootCursor, __source: {
							fileName: '../../../src/components/Editor.jsx',
							lineNumber: 86
						}
					}) : ''
				),
				isMap ? '}' : ']'
			)
		);
	}
});

window.HistoryModel = HistoryModel;

module.exports = Editor;
