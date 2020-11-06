import React, { Component } from "react";
import { connect } from "react-redux";
import { createActivityInstance, updateUserRoom } from "../../actions/index";
import { withRouter } from "react-router-dom";
import StopWatch from "./StopWatchV2";

class ActivitySession extends Component {
	componentDidMount() {
		setTimeout(() => {
			if (this.props.activityInstance.title === "Activity Title") {
				this.props.history.push("/activities");
			} else {
				this.props.updateUserRoom(this.props.activityInstance.title);
			}
		}, 10);
	}

	renderSession() {
		const { minutes } = this.props.activityInstance;

		const hours = Math.trunc(minutes / 60);
		const tempMinutes = minutes % 60;
		let hoursText;
		let minutesText;

		hours === 1 ? (hoursText = "total hour") : (hoursText = " total hours");
		tempMinutes === 1
			? (minutesText = "total minute")
			: (minutesText = "total minutes");
		return (
			<>
				<StopWatch
					mounted={this.mounted}
					activityMinutes={tempMinutes}
					activityHours={hours}
					hoursText={hoursText}
					minutesText={minutesText}
				/>
			</>
		);
	}

	render() {
		return <div>{this.renderSession()}</div>;
	}
}

function mapStateToProps(state) {
	return { activityInstance: state.activityInstance };
}

export default connect(mapStateToProps, { createActivityInstance, updateUserRoom })(
	withRouter(ActivitySession)
);
