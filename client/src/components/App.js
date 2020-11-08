import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import * as actions from "../actions";
import Navbar from "./navbar/Navbar";
import Home from "./homePage/Home";
import Dashboard from "./Dashboard";
import ActivityNew from "./activities/ActivityNew";
import ActivitySession from "./activitySession/ActivitySession";
import WebSocketMain from "./WebSocketMain";
import SideBar from "./userSideBar/SideBar";
import Profile from "./profile/Profile";
import Goals from "./goals/Goals";
import CreateGoal from "./goals/CreateGoal";

import "./App.css";

class App extends Component {
	state = { sideBar: true };

	componentDidMount() {
		this.props.fetchUser();
		window.addEventListener("resize", this.showSideBar);
		if (window.innerWidth <= 1600) {
			this.setState({ sideBar: false });
		}
	}

	showSideBar = () => {
		if (window.innerWidth <= 1600) {
			this.setState({ sideBar: false });
		} else if (window.innerWidth >= 1800) {
			this.setState({ sideBar: true });
		}
	};

	renderSideBar = () => {
		if (this.props.user && this.state.sideBar) {
			return (
				<div
					id="right"
					style={{
						position: "sticky",
						bottom: "0",
						left: "0",
						zIndex: "1000",
						position: "absolute"
					}}
					onClick={() => {
						this.setState({ sideBar: false });
					}}
				>
					<SideBar />
				</div>
			);
		} else if (this.props.user && !this.state.sideBar) {
			return (
				<div
					id="right"
					style={{
						position: "sticky",
						bottom: "0",
						left: "0",
						zIndex: "1000",
						position: "absolute"
					}}
				>
					<Button
						variant="danger"
						size="lg"
						onClick={() => {
							this.setState({ sideBar: true });
						}}
					>
						Toggle Bar
					</Button>{" "}
				</div>
			);
		}
	};

	render() {
		return (
			<BrowserRouter>
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
					<Route exact path="/goals" component={Goals} />

					<Route path="/activities/new" component={ActivityNew} />
					<Route path="/goals/new" component={CreateGoal} />
				</div>
				{this.renderSideBar()}
			</BrowserRouter>
		);
	}
}

const mapStateToProps = (state) => {
	return { user: state.auth };
};

export default connect(mapStateToProps, actions)(App);
