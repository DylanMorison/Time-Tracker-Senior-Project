import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createActivityInstance } from '../../actions/index';
import { withRouter } from 'react-router-dom';

import StopWatch from './StopWatchV2';

class ActivitySession extends Component {
	componentDidMount() {
		let { activityTitle } = this.props.activityInstance;
		if (activityTitle === 'Activity Title') {
			this.props.history.push('/activities');
		}
	}

	renderSession() {
		const { activityTitle, minutes } = this.props.activityInstance;
		const hours = Math.trunc(minutes / 60);
		const tempMinutes = minutes % 60;
		return (
			<>
				<ul className="collection with-header">
					<li className="collection-header">{activityTitle}</li>
					<li className="collection-item">hours: {hours}</li>
					<li className="collection-item">minutes: {tempMinutes}</li>
					<li className="collection-item">
						<StopWatch activityTitle={activityTitle} />
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
