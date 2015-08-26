// Toolbar
'use strict';

var React = require('react');
var fs = require('../libs/FileSaver');

// Material UI
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;
var RaisedButton = mui.RaisedButton;

var HistoryModel = require('../models/HistoryModel');

var toolbarStyle = {
	fontFamily: "Roboto, sans-serif",
	margin: "0",
	padding: "0",
	WebkitFontSmoothing: "antialiased",
	fontSize: "13px",
	position: "absolute",
	left: "100%",
	transform: "translateX(-110px)"
};

var EditorToolBar = React.createClass({
	displayName: 'EditorToolBar',

	childContextTypes: {
		muiTheme: React.PropTypes.object
	},
	getChildContext: function getChildContext() {
		return {
			muiTheme: ThemeManager.getCurrentTheme()
		};
	},
	undo: function undo() {
		HistoryModel.incOffset();
		var nextState = HistoryModel.get(HistoryModel.getAll().offset);
		this.props.cursor.update(function (v) {
			return nextState;
		});
	},
	redo: function redo() {
		HistoryModel.decOffset();
		var nextState = HistoryModel.get(HistoryModel.getAll().offset);
		this.props.cursor.update(function (v) {
			return nextState;
		});
	},
	save: function save() {
		var blob = new Blob([JSON.stringify(this.props.cursor.deref().toJS())], { type: "application/json;charset=utf-8" });
		fs.saveAs(blob, "resume.json");
	},
	render: function render() {
		return React.createElement(
			'div',
			{ style: toolbarStyle },
			React.createElement(
				'div',
				{ style: { marginTop: "5px" } },
				React.createElement(RaisedButton, { label: 'UNDO', primary: true, onClick: this.undo })
			),
			React.createElement(
				'div',
				{ style: { marginTop: "5px" } },
				React.createElement(RaisedButton, { label: 'REDO', secondary: true, onClick: this.redo })
			),
			React.createElement(
				'div',
				{ style: { marginTop: "5px" } },
				React.createElement(RaisedButton, { label: 'SAVE', onClick: this.save })
			)
		);
	}
});

module.exports = EditorToolBar;
