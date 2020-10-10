import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createActivityInstance } from '../../actions/index';

class ActivitySession extends Component {
	componentDidMount() {
		const {activity} = this.props;
	}

	renderSession() {
		// user: '',
		// activityTitle: '',
		// minutes: 0,
		// hours: 0,
		// startTime: 0

		const { activityTitle, minutes, hours } = this.props.activityInstance;

		return (
			<ul className="collection with-header">
				<li className="collection-header">{activityTitle}</li>
				<li className="collection-item">hours: {hours}</li>
				<li className="collection-item">minutes: {minutes}</li>
			</ul>
		);
	}

	render() {
		return <div>{this.renderSession()}</div>;
	}
}

function mapStateToProps(state) {
	console.log(state);
	return { activityInstance: state.activityInstance };
}

export default connect(mapStateToProps, { createActivityInstance })(
	ActivitySession
);
