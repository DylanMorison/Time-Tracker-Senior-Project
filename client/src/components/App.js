import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Navbar from "./navbar/Navbar";
import Home from "./homePage/Home";
import Dashboard from "./Dashboard";
import ActivityNew from "./activities/ActivityNew";
import ActivitySession from "./activitySession/ActivitySession";
import Goals from "./goals/Goals";
import "./App.css";

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Navbar />
					<Route exact path="/" component={Home} />
					<Route exact path="/activities" component={Dashboard} />
					<Route
						exact
						path="/activities/activity/instance"
						component={ActivitySession}
					/>
					<Route exact path="/goals" component={Goals} />

					<Route path="/activities/new" component={ActivityNew} />
				</div>
			</BrowserRouter>
		);
	}
}
export default connect(null, actions)(App);
