import React from 'react';
import ReactDOM from 'react-dom';
import appreducer from './reducers/Reducers.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import {AppRouter} from './Router.jsx';
let store = createStore(appreducer);
class Main extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		//console.log('main.render:',this.props);
		var hei = document.documentElement.clientHeight;
		return (
			<div className="unselectable uibody" style={{height:hei}}>
				<Provider store={store}>
					<AppRouter/>
				</Provider>
			</div>
		)
	}
}
ReactDOM.render(<Main/>, document.getElementById('app'));

//
