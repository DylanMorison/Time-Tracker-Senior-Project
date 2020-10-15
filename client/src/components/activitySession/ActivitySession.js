import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createActivityInstance } from '../../actions/index';
import { withRouter } from 'react-router-dom';

import StopWatch from './StopWatchV2';

class ActivitySession extends Component {
	componentDidMount() {
		setTimeout(() => {
			if (
				this.props.activityInstance.activityTitle === 'Activity Title'
			) {
				this.props.history.push('/activities');
			}
		}, 10);
	}

	renderSession() {
		const { activityTitle, minutes } = this.props.activityInstance;

		const hours = Math.trunc(minutes / 60);
		const tempMinutes = minutes % 60;
		let hoursText;
		let minutesText;

		hours === 1 ? (hoursText = 'hour') : (hoursText = 'hours');
		tempMinutes === 1
			? (minutesText = 'minute')
			: (minutesText = 'minutes');

		return (
			<>
				<ul className="collection with-header">
					<li className="collection-header">{activityTitle}</li>
					<li className="collection-item">
						{hoursText}: {hours}
					</li>
					<li className="collection-item">
						{minutesText}: {tempMinutes}
					</li>
					<li className="collection-item">
						<StopWatch
							activityTitle={activityTitle}
							mounted={this.mounted}
						/>
					</li>
				</ul>
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

export default connect(mapStateToProps, { createActivityInstance })(
	withRouter(ActivitySession)
);
