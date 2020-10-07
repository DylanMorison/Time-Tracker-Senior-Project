// this file renders our app root component to the BROWSER DOM
// as well as setting up redux, react-router, etc...

import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// reduxThunk lets us return actions from action creators that
// break the type, property rule
// by giving us direct access to the dispatch function
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
window.axios = axios;
// argument 1: all the different reducers inside our app
// argument 2: involves server side rendering
// argument 3: middleware stuff lol
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// ReactDom takes two arguments:
// argument #1: Our root component
// argument #2: Where we are attempting to render that component to instide our dom
ReactDom.render(
	// argument #1
	// Provider tag is a react component that knows how to read changes
	// from the redux store.
	// Any time redux store gets some new state produced inside of it
	// the provider will inform all its children components
	// or everything that the app renders
	// that some new state is available, and will
	// thus update all components within app with that new state.
	<Provider store={store}>
		<App />
	</Provider>,
	// argument #2
	document.querySelector('#root')
);
