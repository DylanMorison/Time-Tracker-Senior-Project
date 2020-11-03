import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";
import Navbar from "./navbar/Navbar";
import Home from "./homePage/Home";
import Dashboard from "./Dashboard";
import ActivityNew from "./activities/ActivityNew";
import ActivitySession from "./activitySession/ActivitySession";
import WebSocketMain from "./WebSocketMain";
import SideBar from "./userSideBar/SideBar";
import Profile from "./profile/Profile";

import "./App.css";

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<div
					id="right"
					style={{
						position: "relative",
						bottom: "0",
						left: "0",
						position: "fixed",
						zIndex: "1000"
					}}
				>
					<SideBar />
				</div>
				<div className="container" id="left">
					<Navbar />
					<Route exact path="/profile" component={Profile} />
					<Route exact path="/" component={Home} />
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
export default connect(null, actions)(App);
