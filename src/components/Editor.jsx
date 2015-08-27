// Top-level component
const React = require('react');
const Immutable = require('immutable');
const { Map, List } = Immutable;
const Cursor = require('immutable/contrib/cursor');

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
		data: React.PropTypes.object.isRequired,
		onUpdate: React.PropTypes.func.isRequired,
		immutable: React.PropTypes.bool,
		minEditDepth: React.PropTypes.number,
		minRemovalDepth: React.PropTypes.number
	},
	componentDidMount() {
		HistoryModel.push(Immutable.fromJS(this.props.data));
	},
	shouldComponentUpdate(nextProps) {
		return this.props.data !== nextProps.data;
	},
	render() {
		const data = Immutable.fromJS(this.props.data);

		const rootCursor = Cursor.from(data, (newData, oldData, path) => {
			console.log(newData !== oldData);
			if (newData !== oldData) {
				HistoryModel.push(newData);
				this.props.onUpdate(this.props.immutable ? newData : newData.toJS());
			}
		});

		const isMap = Map.isMap(this.props.data);
		const isList = List.isList(this.props.data);
		return (
			<div style={editorStyle}>
				<div style={{ margin: "0px 10px" }}>
					<Toolbar cursor={rootCursor} />
					{isMap ? '{' : '['}
					<div style={{marginLeft: "5px"}}>
						{data.map((entry, key) => 
							(<Entry
								{...this.props}
								cursor={rootCursor}
								value={entry}
								key={key}
								keyName={key}
							/>)
						).toList()}
						{this.props.minEditDepth === 0
							? (isMap
								? (<AddMapEntry cursor={rootCursor} />)
								: (<AddListEntry cursor={rootCursor} />)
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
