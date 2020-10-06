import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import ActivityField from './ActivityField';
import FIELDS from './formFields';


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
					onSubmit={this.props.handleSubmit(
						this.props.onActivitySubmit
					)}
				>
					{this.renderFields()}
					<Link to="/activities" className="red btn-flat white-text">
						Cancel
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

	_.each(FIELDS, ({ name }) => {
		if (!values[name]) {
			errors[name] = 'You must provide a value';
		}
	});

	return errors;
}

// redux form adds additional props to ActivityForm, such as this.props.handleSubmit()
export default reduxForm({
	validate: validate,
	form: 'activityForm',
	destroyOnUnmount: false
})(ActivityForm);
