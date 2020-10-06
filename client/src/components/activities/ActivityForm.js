import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import ActivityField from './ActivityField';

const FIELDS = [
	{ label: 'Activity Title', name: 'title' },
	{ label: 'Activity Desciption', name: 'desciption' }
];

class ActivityForm extends React.Component {
	renderFields() {
		return _.map(FIELDS, (field) => {
			return (
				<Field
					key={field.name}
					component={ActivityField}
					type="text"
					label={field.label}
					name={field.name}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit((values) =>
						console.log(values)
					)}
				>
					{this.renderFields()}
					<Link to="/activities" className="red btn-flat white-text">
						CANCEL
					</Link>
					<button
						type="submit"
						className="teal btn-flat right white-text"
					>
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.title){
		errors.title = 'You must provide a title';
	}

	

	return errors;
}

// redux form adds additional props to ActivityForm, such as this.props.handleSubmit()
export default reduxForm({
	validate: validate,
	form: 'activityForm'
})(ActivityForm);
