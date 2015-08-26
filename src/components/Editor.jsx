// Top-level component
const React = require('react');
const { Map, List } = require('immutable');

const HistoryModel = require('../models/HistoryModel');

const Entry = require('./Entry');
const Toolbar = require('./Toolbar');
const AddMapEntry = require('./AddMapEntry');
const AddListEntry = require('./AddListEntry');

const editorStyle = {
	background: '#282828',
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
		// console.log(this.props.cursor.size);
		const isMap = Map.isMap(this.props.data);
		const isList = List.isList(this.props.data);
		return (
			<div style={editorStyle}>
				<div style={{ margin: "0px 10px" }}>
					<Toolbar cursor={this.props.cursor} />
					{isMap ? '{' : '['}
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
						{this.props.minEditDepth === 0
							? (isMap
								? (<AddMapEntry cursor={this.props.cursor} />)
								: (<AddListEntry cursor={this.props.cursor} />)
							) : ''
						}
					</div>
					{isMap ? '}' : ']'}
				</div>
			</div>
		);
	}
});

window.HistoryModel = HistoryModel;

module.exports = Editor;
