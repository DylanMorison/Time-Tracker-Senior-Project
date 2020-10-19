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

import Navbar from './navbar/Navbar'
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import ActivityNew from './activities/ActivityNew';
import ActivitySession from './activitySession/ActivitySession';

// BrowserRouter expects to only get one child/div
class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Navbar />
					<Route exact path="/" component={Landing} />
					<Route exact path="/activities" component={Dashboard} />
					<Route
						exact
						path="/activities/activity/instance"
						component={ActivitySession}
					/>

					<Route path="/activities/new" component={ActivityNew} />
				</div>
			</BrowserRouter>
		);
	}
}

// once we pass in actions they are assigned to the App component as props
export default connect(null, actions)(App);
