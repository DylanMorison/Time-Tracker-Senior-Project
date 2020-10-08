import React, { Component } from 'react';
import { connect } from 'react-redux';

class ActivitySession extends Component {
	state = { currentActivity: {} };

	componentDidMount() {
		this.setState({ currentActivity: this.props.activityInstance });
		console.log(this.props.activityInstance)
	}

	render() {
		return <div>ActivitySession</div>;
	}
}

function mapStateToProps(state) {
	return { activityInstance: state.activityInstance };
}

export default connect(mapStateToProps)(ActivitySession);
