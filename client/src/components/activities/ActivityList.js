import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActivities, createActivityInstance } from '../../actions';
import { withRouter } from 'react-router-dom';

class ActivityList extends Component {
	state = { term: '', activityTitles: [] };

	componentDidMount() {
		this.props.fetchActivities();

	}

	dynamicSearch = () => {
		return this.props.activities.activityTitles.filter((title) =>
			title.toLowerCase().includes(this.state.term.toLowerCase())
		);
	};

	renderActivities() {
		return this.props.activities.map((activity) => {
			if (
				!activity.title
					.toLowerCase()
					.includes(this.state.term.toLowerCase())
			) {
				return false;
			}

			return (
				<div className="card" key={activity.title}>
					<div
						style={{ cursor: 'pointer' }}
						className="card-content grey lighten-4"
						onClick={() => {
							this.props.createActivityInstance(
								activity,
								this.props.history,
								true
							);
						}}
					>
						<span className="card-title">{activity.title}</span>
						<p>{activity.description}</p>
						<p className="right">
							Date Created:{' '}
							{new Date(
								activity.dateCreated
							).toLocaleDateString()}
						</p>
					</div>
					<div className="card-action">
						<i className="material-icons">cloud_download</i>

						<i
							className="material-icons"
							style={{ marginLeft: '20%' }}
						>
							favorite
						</i>
					</div>
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				<form className="ui form">
					<div className="field">
						<label>Search For a Subject or Class</label>
						<input
							placeholder="What do you want to track?"
							type="text"
							value={this.state.term}
							onChange={(e) =>
								this.setState({ term: e.target.value })
							}
						/>
					</div>
				</form>
				{this.renderActivities()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { activities: state.activities };
}

export default connect(mapStateToProps, {
	fetchActivities,
	createActivityInstance
})(withRouter(ActivityList));
