import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createActivityInstance } from '../../actions/index';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import StopWatch from './StopWatchV2';

class ActivitySession extends Component {
	componentDidMount() {
		setTimeout(() => {
			if (this.props.activityInstance.title === 'Activity Title') {
				this.props.history.push('/activities');
			}
		}, 10);
	}

	renderSession() {
		const { minutes } = this.props.activityInstance;

		const hours = Math.trunc(minutes / 60);
		const tempMinutes = minutes % 60;
		// let hoursText;
		// let minutesText;

		// hours === 1 ? (hoursText = 'hour') : (hoursText = 'hours');
		// tempMinutes === 1
		// 	? (minutesText = 'minute')
		// 	: (minutesText = 'minutes');
		return (
			<>
				<StopWatch
					mounted={this.mounted}
					activityMinutes={tempMinutes}
					activityHours={hours}
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

export default connect(mapStateToProps, { createActivityInstance })(
	withRouter(ActivitySession)
);
