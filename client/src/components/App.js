import React, { Component } from 'react';

// BrowserRouter is the "brains" of react-router
// BrowserRouter is the thing that tells react-router how to behave
// It also looks at the current URL, and then changes the set of components
// that are visible on the screen at any given time.

// The Route object is a react component
// used to set up a rule between a certain route the user might visit
// and a set of components that will be visible on the screen
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

// BrowserRouter expects to only get one child/div
class App extends Component {

	componentDidMount(){
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

// once we pass in actions they are assigned to the App component as props
export default connect(null, actions)(App);
