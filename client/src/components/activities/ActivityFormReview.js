// activity for review shows users their form inputs for review
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import FIELDS from './formFields';

const ActivityFormReview = ({ onCancel, formValues }) => {
	const reviewFields = _.map(FIELDS, (field) => {
		return (
			<div key={field.name}>
				<label>{field.label}</label>
				<div>{formValues[field.name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>please confirm your entries</h5>
			{reviewFields}
			<button className="red white-text btn-flat" onClick={onCancel}>
				Back
			</button>
            <button className="teal btn-flat right white-text">
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

export default connect(mapStateToProps)(ActivityFormReview);
