import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import ActivityForm from "./ActivityForm";
import ActivityFormReview from "./ActivityFormReview";
import { updateUserRoom } from "../../actions/index";
class ActivityNew extends React.Component {
	state = { showFormActivity: false };

	componentDidMount() {
		this.props.updateUserRoom("activityCreation");
	}

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

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps, {updateUserRoom})(
	reduxForm({
		form: "activityForm"
	})(ActivityNew)
);
