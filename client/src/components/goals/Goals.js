import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserRoom, fetchGoals } from "../../actions/index";
import { withRouter } from "react-router-dom";

class Goals extends Component {
	componentDidMount() {
		this.props.fetchGoals();
		this.props.updateUserRoom("Goals");
	}

	render() {
		return (
			<>
				<div
					className="fixed-action-btn"
					onClick={() => this.props.history.push("/goals/new")}
				>
					<div className="btn-floating btn-large red">
						<i className="material-icons">add</i>
					</div>
				</div>
				Goals
			</>
		);
	}
}

function mapStateToProps(state) {
	return { goals: state.goals };
}

export default connect(mapStateToProps, {
	updateUserRoom,
	fetchGoals
})(withRouter(Goals));
