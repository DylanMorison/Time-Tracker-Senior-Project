import React from "react";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { fetchUsers } from "../../actions/index";

import "./styles.min.css";

class SideBar extends React.Component {
	state = {
		user: null,
		pathname: this.props.location.pathname
	};

	componentDidMount() {
		setInterval(() => {
			this.props.fetchUsers(this.checkPathName());
		}, 3000);
	}

	componentDidUpdate() {
		if (this.state.pathname !== this.props.location.pathname) {
			this.setState({ pathname: this.props.location.pathname });
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
		return this.props.users.map((user) => {
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
				<div id="sidebar" className="chat__sidebar">
					<h2 className="room-title" style={{ borderBottom: "solid" }}>
						room: {this.checkPathName()}
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

export default connect(mapStateToProps, { fetchUsers })(
	withRouter(SideBar)
);
