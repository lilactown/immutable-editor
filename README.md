# immutable-editor

immutable-editor is a React component used to live-edit JSON data, complete with change history (undo/redo) and file saving.

Underneath the hood, it uses Facebook's Immutable.js library for performance.

## Changelog

### 0.1.0 - 2015-08-27:
	- Change API to allow generic JSON and callback instead of requiring client to use Immutable types/cursors


## How to use

### Installation:
```
npm install immutable-editor --save
```

### Use:
```javascript
const React = require('react');
const Editor = require('immutable-editor');

const MyApp = React.createClass({
	getInitialState() {
		return {
			data: {
				hello: {
					world: "!"
				}
			}
		}
	},
	render() {
		return (
			<div>
				<button onClick={() => this.setState({ data: Editor.undo() })}>undo</button>
				<button onClick={() => this.setState({ data: Editor.redo() })}>redo</button>
				<button onClick={() => Editor.save('test.json')}>save</button>
				<Editor
					data={this.state.data}
					onUpdate={(data) => this.setState({ data })}
					minEditDepth={0}
					minRemovalDepth={0}
				/>
			</div>
		);
	}
});

React.render(<MyApp />, document.getElementById('app'));
```

If you're using Immutable.js in your project, you can tell the editor to pass back immutable data by setting the `immutable` flag on the `<Editor />` component, as well as passing `true` to `undo` and `redo()` (e.g. `Editor.undo(true)` to get the previous Immutable type instead of JS object).

### Dependencies

The editor has two external dependencies: FontAwesome (for font icons) and the Source Code Pro font. They can be included like so:
```html
<link href='http://fonts.googleapis.com/css?family=Source+Code+Pro:400,700' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
```
