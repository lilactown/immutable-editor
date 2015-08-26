# immutable-editor

immutable-editor is a React component used to live-edit datastructures created with Facebook's Immutable.JS, complete with Undo and Redo.

Currently supports Maps, Lists and primitive types (String, Number, Boolean).

## How to use

### Installation:
```
npm install Lokeh/immutable-editor
```

### Use:
```javascript
const React = require('react');
const Immutable = require('immutable');
const Cursor = require('immutable/contrib/cursor');
const Editor = require('immutable-editor');

const MyApp = React.createClass({
	getInitialState() {
		return {
			data: Immutable.fromJS({
				hello: {
					world: "!"
				}
			})
		}
	},
	render() {
		const cursor = Cursor.from(this.state.data, (newData, oldData, path) => {
			if (newData !== oldData) {
				this.setState({ data: newData });
			}
		});

		return (
			<Editor
				data={this.state.data}
				cursor={cursor}
				minEditDepth={0}
				minRemovalDepth={0}
			/>
		);
	}
});

React.render(<MyApp />, document.getElementById('app'));
```

### Dependencies

The editor has two external dependencies: FontAwesome (for font icons) and the Source Code Pro font. They can be included like so:
```html
<link href='http://fonts.googleapis.com/css?family=Source+Code+Pro:400,700' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
```
