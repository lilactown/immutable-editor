const React = require('react');
const Immutable = require('immutable');
const Cursor = require('immutable/contrib/cursor');
const {List, Map} = Immutable;
const assign = require('object-assign');

const AddMapEntry = require('./AddMapEntry.jsx');
const AddListEntry = require('./AddListEntry.jsx');

const inputStyle = {
	fontFamily: '"Source Code Pro", monospace',
	background: '#282828',
	border: '0',
	color: '#E6DB74',
	wordBreak: 'break-word'
};

const inputContainerStyle = {
	fontFamily: '"Source Code Pro", monospace',
	color: '#E6DB74',
	fontSize: '11px'
};

const Entry = React.createClass({
	propTypes: {
		keyName: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		]).isRequired,
		value: React.PropTypes.oneOfType([
			React.PropTypes.instanceOf(List),
			React.PropTypes.instanceOf(Map),
			React.PropTypes.string
		]).isRequired,
		minEditDepth: React.PropTypes.number,
		minRemovalDepth: React.PropTypes.number,
	},
	getInitialState() {
		return {
			collapsed: false,
			inputValue: ""
		};
	},
	_onChange(e) {
		this.setState({ inputValue: e.target.value });
	},
	_onBlur(e) {
		// update the model on blur
		this.props.cursor.set(this.props.keyName, this.state.inputValue);
	},
	_onKeyUp(e) {
		// update the model on enter
		if (e.key === "Enter") {
			this.props.cursor.set(this.props.keyName, this.state.inputValue);
		}
	},
	deletePath(e) {
		e.preventDefault();
		this.props.cursor.delete(this.props.keyName);
	},
	toggleCollapsed(e) {
		e.preventDefault();
		this.setState({ collapsed: !this.state.collapsed });
	},
	componentWillMount() {
		this.setState({
			inputValue: this.props.value
		});
	},
	componentWillReceiveProps(nextProps) {
		this.setState({
			inputValue: nextProps.value
		});
	},
	shouldComponentUpdate(nextProps, nextState) {
		return this.props.value !== nextProps.value
			|| this.props.style !== nextProps.style
			|| this.state.collapsed !== nextState.collapsed
			|| this.state.inputValue !== nextState.inputValue
	},
	render() {
		const cursor = this.props.cursor.get(this.props.keyName);
		const value = this.props.value;
		const collapsed = this.state.collapsed;


		const isMinRemovalDepth = this.props.cursor['_keyPath'].length +1 >= this.props.minRemovalDepth;
		const isMinEditDepth = this.props.cursor['_keyPath'].length +1 >= this.props.minEditDepth;
		const isMap = Map.isMap(value);
		const isList = List.isList(value);

		const hideEntry = { display: collapsed ? 'none' : 'block' };
		return (
			<div style={assign({marginLeft: "20px"}, this.props.style)}>
			{(isMap || isList) ? <a onClick={this.toggleCollapsed}><i className={`fa ${collapsed ? 'fa-plus-square' : 'fa-minus-square'}`} style={{color: "#FFD569", marginLeft: '-23px'}} /></a> : '' } {this.props.keyName}:{' '}
			{
				(isMap ?
					(<span>{'{'} {(isMinRemovalDepth) ? <a href="#" onClick={this.deletePath}><i className="fa fa-times-circle" style={{color: "#FD971F"}} /> </a> : '' }
						{value.map((v, k) => {
							return (<Entry {...this.props} cursor={cursor} key={k} value={v} keyName={k} style={hideEntry} />);
						}).toList()}
						{(isMinEditDepth && !collapsed) ? <AddMapEntry cursor={this.props.cursor} keyName={this.props.keyName} /> : ''}
					{'}'}</span>) :
				(isList ?
					(<span>{'['} {(isMinRemovalDepth) ? <a href="#" onClick={this.deletePath}><i className="fa fa-times-circle" style={{color: "#FD971F"}} /> </a> : '' }
						{value.map((v, k) => {
							return (<Entry {...this.props} cursor={cursor} key={k} value={v} keyName={k} style={hideEntry} />);
						}).toList()} 
						{(isMinEditDepth && !collapsed) ? <AddListEntry cursor={this.props.cursor} keyName={this.props.keyName} /> : ''}
					{']'}</span>) :
				(<span style={inputContainerStyle}>
					"<input
						type="text"
						value={this.state.inputValue}
						onChange={this._onChange}
						onBlur={this._onBlur}
						onKeyUp={this._onKeyUp}
						size={this.state.inputValue.length}
						style={inputStyle}
					/>" <a href="#" onClick={this.deletePath}><i className="fa fa-times-circle" style={{color: "#FD971F"}} /></a>
				</span>)))
			}
			</div>
		);
	}
});

module.exports = Entry;
