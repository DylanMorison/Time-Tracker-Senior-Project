import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActivities, createActivityInstance } from '../../actions';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import * as actions from '../../actions';

class ActivityList extends Component {
	componentDidMount() {
		this.props.fetchActivities();
	}

	renderActivities() {
		return this.props.activities.map((activity) => {
			return (
				<Link to={{
					pathname: ""
				}}>
					<div
						className="card blue-grey darken-1"
						style={{ cursor: 'pointer' }}
						key={activity._id}
					>
						<div className="card-content">
							<span className="card-title text-white">
								{activity.title}
							</span>
							<p>{activity.description}</p>
							<p className="right">
								Date Created:{' '}
								{new Date(
									activity.dateCreated
								).toLocaleDateString()}
							</p>
						</div>
						<div className="card-action"></div>
					</div>
				</Link>
			);
		});
	}

	render() {
		return <div>{this.renderActivities()}</div>;
	}
}

function mapStateToProps(state) {
	return { activities: state.activities };
}

export default connect(mapStateToProps, {
	fetchActivities,
	createActivityInstance
})(withRouter(ActivityList));
