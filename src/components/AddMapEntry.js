import React, {Component} from 'react';
import Immutable, {List, Map} from 'immutable';

const inputStyle = {
	fontFamily: '"Source Code Pro", monospace',
	background: '#282828',
	border: '0',
	color: '#E6DB74',
	wordBreak: 'break-word'
}

export class AddMapEntry extends Component {
	constructor() {
		super();

		this.state = {
			showOptions: false,
			keyName: "",
			dataType: "string"
		};
	}
	setPath(e) {
		e.preventDefault();
		const types = {
			map: Map({}),
			list: List([]),
			string: ""
		};
		console.log(this.props.keyName)
		if (this.props.keyName !== undefined) {
			this.props.cursor.get(this.props.keyName).set(this.state.keyName, types[this.state.dataType]);
		}
		else {
			this.props.cursor.set(this.state.keyName, types[this.state.dataType]);
		}
		this.toggleOptions();
	}
	toggleOptions() {
		this.setState({ showOptions: !this.state.showOptions });
	}
	setType(e) {
		const dataType = e.target.value;
		this.setState({ dataType });
	}
	setKey(e) {
		const keyName = e.target.value;
		this.setState({ keyName });
	}
	render() {
		if (this.state.showOptions) {
			return (
				<div style={{marginLeft: "20px"}}>
					<label htmlFor="key">key:</label> <input name="key" type="text" onChange={(e) => this.setKey(e)} /><br />
					<label htmlFor="type">type:</label> <select name="type" onChange={(e) => this.setType(e)}>
						<option value="string">String</option>
						<option value="map">Map</option>
						<option value="list">List</option>
					</select>
					{' '}<a href="#" onClick={(e) => this.setPath(e)}><i className="fa fa-plus" style={{color: "#A6E22E"}} /></a>
					{' '}<a href="#" onClick={(e) => this.toggleOptions(e)}><i className="fa fa-remove" style={{color: "#FD971F"}} /></a>
				</div>
			);
		}
		return (<div style={{marginLeft: "19px"}}>{String.fromCharCode(8627)} <a href="#"><i onClick={(e) => this.toggleOptions(e)} className="fa fa-plus-circle" style={{color: "#A6E22E"}} /></a></div>);
	}
}
