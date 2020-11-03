import React from "react";
import _ from "lodash";
import io from "socket.io-client";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

import "./styles.min.css";

class SideBar extends React.Component {
	state = {
		user: null,
		ENDPOINT: "http://localhost:5000",
		socket: false,
		users: [0, 1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29, 30,],
		pathname: this.props.location.pathname
	};

	componentDidMount() {
		this.initSocket();
	}

	componentDidUpdate() {
		if (this.state.pathname !== this.props.location.pathname) {
			this.setState({ pathname: this.props.location.pathname });
		}
	}

	initSocket = () => {
		const socket = io(this.state.ENDPOINT);
		socket.on("message", (msg) => {
			console.log(msg);
		});
		this.setState({ socket: socket });
	};

	sendToServer = () => {
		if (this.state.socket !== false) {
			this.state.socket.emit("increment");
		}
	};

	checkPathName = () => {
		switch (this.state.pathname) {
			case "/":
				return "Home";
			case "/activities":
				return "Activities";
			case "/activities/activity/instance":
				return "Time Tracking";
			default:
				return "";
		}
	};

	renderUsers = () => {
		return this.state.users.map((key) => {
			return (
				<li
					key={key}
					className="center-align"
					style={{ borderBottom: "", marginTop: "5px" }}
				>
					<FaUserCircle style={{ marginRight: "4px", color: "greenyellow" }} />
					username
				</li>
			);
		});
	};

	render() {
		return (
			<div className="chat" className="center-align">
				<div id="sidebar" className="chat__sidebar">
					<h2 className="room-title" style={{ borderBottom: "solid" }}>
						room: {this.checkPathName()}
					</h2>
					<ul className="users">{this.renderUsers()}</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { auth: state.auth };
};

export default connect(mapStateToProps)(withRouter(SideBar));
