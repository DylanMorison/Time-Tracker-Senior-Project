import React from 'react';
import { reduxForm } from 'redux-form';
import ActivityForm from './ActivityForm';
import ActivityFormReview from './ActivityFormReview';

class ActivityNew extends React.Component {
	state = { showFormActivity: false };

	renderContent() {
		if (this.state.showFormActivity) {
			return (
				<ActivityFormReview
					onCancel={() => this.setState({ showFormActivity: false })}
				/>
			);
		}

		return (
			<ActivityForm
				onActivitySubmit={() => {
					this.setState({ showFormActivity: true });
				}}
			/>
		);
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default reduxForm({
	form: 'activityForm'
})(ActivityNew);
