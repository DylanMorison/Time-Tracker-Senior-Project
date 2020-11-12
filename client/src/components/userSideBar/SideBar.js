import React from "react";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

import { fetchUsers } from "../../actions/index";

import Spinner from "react-bootstrap/Spinner";

import "./styles.min.css";

class SideBar extends React.Component {
	state = {
		user: null,
		pathname: this.props.location.pathname,
		users: []
	};

	componentDidMount() {
		setInterval(() => {
			this.props.fetchUsers(this.checkPathName());
		}, 3000);

		if (this.props.user) {
			this.setState({ user: this.checkUserName() });
		}
	}

	componentDidUpdate() {
		if (this.state.pathname !== this.props.location.pathname) {
			this.setState({ pathname: this.props.location.pathname });
		}
		if (this.props.users.length !== this.state.users.length) {
			this.setState({ users: this.props.users });
			console.log("Updated props users", this.props.users);
			console.log("Updated state users", this.state.users);
		}
	}

	checkPathName = () => {
		switch (this.state.pathname) {
			case "/profile":
				return "Profile";
			case "/":
				return "Home";
			case "/activities":
				return "Activities";
			case "/activities/activity/instance":
				return `${this.props.activityInstance.title}`;
			case "/goals":
				return "Goals";
			case "/goals/new":
				return "Creating Goal!";
			default:
				return "";
		}
	};

	checkUserName = () => {
		let currentUserName;
		if (this.props.user) {
			if (this.props.user.username === undefined) {
				currentUserName = this.props.user.user.username;
			} else {
				currentUserName = this.props.user.username;
			}
		}
		return currentUserName;
	};

	renderUsers = () => {
		return this.state.users.map((user) => {
			if (user.username === this.checkUserName()) {
				return;
			}
			return (
				<li
					key={user._id}
					className="left-align"
					style={{ borderBottom: "", marginTop: "5px", marginLeft: "6px" }}
				>
					<FaUserCircle
						style={{
							marginRight: "6px",
							color: "greenyellow",
							marginBottom: "2px"
						}}
					/>
					{user.username}
				</li>
			);
		});
	};

	render() {
		return (
			<div className="chat" className="left-align">
				<div id="sidebar" className="chat__sidebar" style={{ cursor: "pointer" }}>
					<h2 className="room-title" style={{ borderBottom: "solid" }}>
						room: {this.checkPathName()}{" "}
					</h2>
					<ul className="users">
						<li
							key={2134123}
							className="left-align"
							style={{
								borderBottom: "",
								marginTop: "5px",
								marginLeft: "6px"
							}}
						>
							<FaUserCircle
								style={{ marginRight: "6px", color: "greenyellow" }}
							/>
							{this.checkUserName()}
						</li>

						{this.renderUsers()}
					</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth,
		activityInstance: state.activityInstance,
		users: state.users
	};
};

export default connect(mapStateToProps, { fetchUsers })(withRouter(SideBar));
