// activity for review shows users their form inputs for review
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import FIELDS from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const ActivityFormReview = ({
	onCancel,
	formValues,
	submitActivity,
	history
}) => {
	const reviewFields = _.map(FIELDS, (field) => {
		return (
			<div key={field.name}>
				<label>{field.label}</label>
				<div>{formValues[field.name]}</div>
			</div>
		);
	});

	return (
		<div style={{ margin: '5%' }}>
			<h5>please confirm your entries</h5>
			{reviewFields}
			<button className="red white-text btn-flat" onClick={onCancel}>
				Back
			</button>
			<button
				onClick={() => submitActivity(formValues, history)}
				className="teal btn-flat right white-text"
			>
				Create Activity
				<i className="material-icons right">create</i>
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		formValues: state.form.activityForm.values
	};
}

export default connect(
	mapStateToProps,
	actions
)(withRouter(ActivityFormReview));
