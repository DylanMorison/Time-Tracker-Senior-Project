import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUserRoom, fetchGoals, deleteGoal } from "../../actions/index";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import { TiDeleteOutline } from "react-icons/ti";

class Goals extends Component {
	state = { term: "", _id: null };

	componentDidMount() {
		this.props.fetchGoals();
		this.props.updateUserRoom("Goals");
	}

	enterKeyPush = (e) => {
		if (e.key === "Enter") {
			this.setState({ term: "" });
		}
	};

	returnSplitGoals = () => {
		const goals = this.props.goals;
		const numGoals = goals.length;
		let chunkSize;

		if (numGoals % 2 === 0) {
			chunkSize = 2;
		} else if (numGoals % 3 === 0) {
			chunkSize = 3;
		} else if (numGoals % 4 === 0) {
			chunkSize = 4;
		} else if (numGoals % 5 === 0) {
			chunkSize = 5;
		} else if (numGoals % 6 === 0) {
			chunkSize = 6;
		} else {
			chunkSize = 4;
		}

		let index = 0;
		let cardRow = [];

		for (index = 0; index < numGoals; index += chunkSize) {
			let row = goals.slice(index, index + chunkSize);
			cardRow.push(this.renderRow(row));
		}

		return cardRow;
	};

	renderRow = (goalRow) => {
		const row = this.renderGoals(goalRow);
		return <CardDeck>{row}</CardDeck>;
	};

	renderGoals = (goalRow) => {
		const cards = goalRow.map(
			({ title, minuteGoal, currentMinutes, _id, instanceTitle }) => {
				if (!title.toLowerCase().includes(this.state.term.toLowerCase())) {
					return false;
				}
				const now = (currentMinutes / minuteGoal) * 100;
				const nowStr = `${now.toFixed(2)}%`;

				const newHoursCompleted = Math.trunc(currentMinutes / 60);
				const newMinutesCompleted = currentMinutes % 60;

				const remaining = minuteGoal - currentMinutes;
				const remainingMinutes = remaining % 60;
				const remainingHours = Math.trunc(remaining / 60);

				return (
					<Card
						border={this.state._id === _id ? "danger" : "primary"}
						style={{ textAlign: "center" }}
						key={_id}
						onClick={() => {
							console.log(_id);
							if (this.state._id !== _id) {
								this.setState({ _id, title });
							} else {
								this.setState({ _id: null });
							}
						}}
					>
						<Card.Body>
							<TiDeleteOutline
								size={35}
								style={{
									cursor: "pointer",
									position: "absolute",
									top: "5",
									right: "5",
									color: "red"
								}}
								onClick={() => this.props.deleteGoal(_id)}
							/>
							<Card.Title>{title}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								{instanceTitle}
							</Card.Subtitle>
							<ProgressBar now={now} label={nowStr} />
							<Card.Text>
								You have completed {newHoursCompleted} hours and{" "}
								{newMinutesCompleted} minutes! You have {remainingHours}{" "}
								hours and {remainingMinutes} left to reach your goal!
							</Card.Text>
						</Card.Body>
					</Card>
				);
			}
		);
		return cards;
	};

	render() {
		let allCards = this.returnSplitGoals();
		return (
			<>
				<Form.Group>
					<Form.Control
						size="lg"
						type="text"
						pattern="[A-Za-z0-9_-]*$"
						placeholder="Find a goal"
						value={this.state.term}
						onChange={(e) => {
							let term = e.target.value;
							term = term.replace(/[^A-Z a-z 0-9_-]/gi, "");
							this.setState({ term });
						}}
						onKeyDown={(e) => this.enterKeyPush(e)}
						style={{ textAlign: "center" }}
					></Form.Control>
				</Form.Group>
				{allCards.map((cardRow) => {
					return <div>{cardRow}</div>;
				})}
				<div
					className="fixed-action-btn"
					onClick={() => this.props.history.push("/goals/new")}
				>
					<div className="btn-floating btn-large red">
						<i className="material-icons">add</i>
					</div>
				</div>
			</>
		);
	}
}

function mapStateToProps(state) {
	return { goals: state.goals };
}

export default connect(mapStateToProps, {
	updateUserRoom,
	fetchGoals,
	deleteGoal
})(withRouter(Goals));
