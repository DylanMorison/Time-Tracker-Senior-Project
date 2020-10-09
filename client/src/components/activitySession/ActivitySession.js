import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createActivityInstance } from '../../actions/index';

class ActivitySession extends Component {
	componentDidUpdate() {
		console.log(this.props.activityInstance)
	}

	renderSession(){
		return(
			<div>
				
			</div>
		)
	}

	render() {
		return <div>ActivitySession</div>;
	}
}

function mapStateToProps(state) {
	console.log(state);
	return { activityInstance: state.activityInstance };
}

export default connect(mapStateToProps, { createActivityInstance })(
	ActivitySession
);
