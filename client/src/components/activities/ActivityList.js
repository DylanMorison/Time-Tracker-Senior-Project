import React, { Component } from "react";
import { connect } from "react-redux";
import {
	fetchActivitiesPublic,
	fetchActivitiesPrivate,
	createActivityInstance
} from "../../actions";
import { withRouter } from "react-router-dom";

import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { AiFillHeart } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";

class ActivityList extends Component {
	state = {
		term: "",
		activityTitles: [],
		private: true,
		checkString: "Private Activities"
	};

	componentDidMount() {
		this.props.fetchActivitiesPublic();
		this.props.fetchActivitiesPrivate();
	}

	dynamicSearch = () => {
		return this.props.activities.activityTitles.filter((title) =>
			title.toLowerCase().includes(this.state.term.toLowerCase())
		);
	};

	returnSplitActivityList = () => {
		// this is where we check if we should use
		// public activities or private activities

		let activities;
		let numActivities;

		if (this.state.private) {
			activities = this.props.privateActivities;
			numActivities = activities.length;
		} else {
			activities = this.props.publicActivities;
			numActivities = activities.length;
		}

		let index = 0;
		let tempArray = [];
		let chunkSize;

		if (numActivities % 2 === 0) {
			chunkSize = 4;
		} else {
			chunkSize = 3;
		}

		for (index = 0; index < numActivities; index += chunkSize) {
			let myChunk = activities.slice(index, index + chunkSize);
			tempArray.push(myChunk);
		}

		return tempArray;
	};

	renderCards(row) {
		return row.map((activity) => {
			if (!activity.title.toLowerCase().includes(this.state.term.toLowerCase())) {
				return false;
			}
			return (
				<Card border="primary" style={{ width: "18rem" }} key={activity.id}>
					<Card.Body
						style={{ cursor: "pointer", textAlign: "center" }}
						onClick={() => {
							this.props.createActivityInstance(
								activity,
								this.props.history,
								true
							);
						}}
					>
						<Card.Title>{activity.title}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">
							{activity.subject}
						</Card.Subtitle>

						<Card.Text>{activity.description}</Card.Text>
					</Card.Body>
					<Card.Footer>
						<Card.Link>
							<FiUsers
								style={{
									marginBottom: "2px"
								}}
							/>

							{activity.userCount}
						</Card.Link>
					</Card.Footer>
				</Card>
			);
		});
	}

	renderCardRow = (oneRow) => {
		return <CardDeck key={oneRow[0].title}>{this.renderCards(oneRow)}</CardDeck>;
	};

	toggleEnabled = () => {
		if (this.state.private) {
			this.setState({ private: false, checkString: "Public Activities" });
		} else {
			this.setState({ private: true, checkString: "Private Activities" });
		}
	};

	render() {
		let activitiesSplit = this.returnSplitActivityList();

		return (
			<div>
				<Form.Group>
					<Form.Control
						size="lg"
						type="text"
						placeholder="Search For An Activity"
						value={this.state.term}
						onChange={(e) => this.setState({ term: e.target.value })}
					/>
					<Form>
						<Form.Check
							type="switch"
							id="custom-switch"
							onChange={this.toggleEnabled}
							label={this.state.checkString}
						/>
					</Form>
				</Form.Group>
				{activitiesSplit.map((oneRow) => this.renderCardRow(oneRow))}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		activities: state.activities,
		privateActivities: state.privateActivities,
		publicActivities: state.publicActivities
	};
}

export default connect(mapStateToProps, {
	fetchActivitiesPublic,
	fetchActivitiesPrivate,
	createActivityInstance
})(withRouter(ActivityList));
