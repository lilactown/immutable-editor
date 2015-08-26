// Top-level component
const React = require('react');

const HistoryModel = require('../models/HistoryModel');

const Entry = require('./Entry');
const Toolbar = require('./Toolbar');

const editorStyle = {
	color: "#F8F8F2",
	fontFamily: '"Source Code Pro", monospace',
	fontSize: "16px",
	WebkitFontSmoothing: "initial",
};

const Editor = React.createClass({
	propTypes: {
		name: React.PropTypes.string
	},
	componentDidMount() {
		HistoryModel.push(this.props.data);
	},
	componentWillReceiveProps(nextProps) {
		HistoryModel.push(nextProps.data);
	},
	shouldComponentUpdate(nextProps) {
		return this.props.data !== nextProps.data;
	},
	render() {
		console.log(this.props.cursor.size);
		return (
			<div style={editorStyle}>
				<div style={{ margin: "0px 10px" }}>
					<Toolbar cursor={this.props.cursor} />
					{'{'}
					<div style={{marginLeft: "5px"}}>
						{this.props.data.map((entry, key) => 
							(<Entry
								{...this.props}
								cursor={this.props.cursor}
								value={entry}
								key={key}
								keyName={key}
							/>)
						).toList()}
					</div>
					{'}'}
				</div>
			</div>
		);
	}
});

window.HistoryModel = HistoryModel;

module.exports = Editor;
