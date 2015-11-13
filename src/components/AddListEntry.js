import React, {Component} from 'react';
import Immutable, {List, Map} from 'immutable';

export class AddListEntry extends Component {
	constructor() {
		super();

		this.state = {
			showOptions: false,
			dataType: "string"
		};
	}
	pushPath(e) {
		e.preventDefault();
		const types = {
			map: new Map({}),
			list: new List([]),
			string: ""
		};
		if (this.props.keyName) {
			this.props.cursor.get(this.props.keyName).push(types[this.state.dataType]);
		}
		else {
			this.props.cursor.push(types[this.state.dataType]);
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
	render() {
		if (this.state.showOptions) {
			return (
				<div style={{marginLeft: "20px"}}>
					<label htmlFor="type">type:</label> <select name="type" onChange={(e) => this.setType(e)}>
						<option value="string">String</option>
						<option value="map">Map</option>
						<option value="list">List</option>
					</select>
					{' '}<a href="#" onClick={(e) => this.pushPath(e)}><i className="fa fa-plus" style={{color: "#A6E22E"}} /></a>
					{' '}<a href="#" onClick={(e) => this.toggleOptions(e)}><i className="fa fa-remove" style={{color: "#FD971F"}} /></a>
				</div>
			);
		}
		return (<div style={{marginLeft: "19px"}}>{String.fromCharCode(8627)} <a href="#"><i onClick={(e) => this.toggleOptions(e)} className="fa fa-plus-circle add" style={{color: "#A6E22E"}} /></a></div>);
	}
}
