// Top-level component
import React from 'react';
import Immutable, { Map, List } from 'immutable';
import Cursor from 'immutable/contrib/cursor';
import fs from '../libs/FileSaver';

import HistoryModel from '../models/HistoryModel';

import {Entry} from './Entry';
import {AddMapEntry} from './AddMapEntry';
import {AddListEntry} from './AddListEntry';

const editorStyle = {
	background: '#282828',
	color: "#F8F8F2",
	fontFamily: '"Source Code Pro", monospace',
	fontSize: "16px",
	WebkitFontSmoothing: "initial",
};

export const Editor = React.createClass({
	statics: {
		undo(immutable = false) {
			HistoryModel.incOffset();
			const nextState = HistoryModel.get(HistoryModel.getAll().offset);
			// this.props.cursor.update((v) => { return nextState; });
			return immutable ? nextState : nextState.toJS();
		},
		redo(immutable = false) {
			HistoryModel.decOffset();
			const nextState = HistoryModel.get(HistoryModel.getAll().offset);
			// this.props.cursor.update((v) => { return nextState; });
			return immutable ? nextState : nextState.toJS();
		},
		save(name) {
			const blob = new Blob([JSON.stringify(HistoryModel.get(HistoryModel.getAll().offset).toJS())], {type: "application/json;charset=utf-8"});
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
					{/*<Toolbar cursor={rootCursor} />*/}
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
