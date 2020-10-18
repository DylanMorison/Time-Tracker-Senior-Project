import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createActivityInstance } from '../../actions/index';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
		const { title, minutes } = this.props.activityInstance;
		console.log(title);


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
					<li className="collection-header">{title}</li>
					<li className="collection-item">
						{hoursText}: {hours}
					</li>
					<li className="collection-item">
						{minutesText}: {tempMinutes}
					</li>
					<li className="collection-item">
						<StopWatch title={title} mounted={this.mounted} />
					</li>
				</ul>
				<Link
					to="/activities"
					className="waves-effect waves-light btn-large"
				>
					<i className="material-icons right">done</i>Done Studying!
				</Link>
			</>
		);
	}

	// 	<Link to="/activities/new" className="btn-floating btn-large red">
	// 	<i className="material-icons">add</i>
	// </Link>

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
