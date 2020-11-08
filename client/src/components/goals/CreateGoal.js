import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import { withRouter } from "react-router-dom";

import { fetchActivityInstances, createGoal } from "../../actions/index";

class CreateGoal extends Component {
	state = { term: "", _id: null, title: null };

	componentDidMount() {
		this.props.fetchActivityInstances();
	}

	renderInstances = (instances) => {
		const test = instances.map(({ title, _id, description }) => {
			let border = "primary";
			return (
				<Card
					border={this.state._id === _id ? "danger" : "primary"}
					style={{ cursor: "pointer", textAlign: "center" }}
					key={_id}
					onClick={() => {
						console.log(_id);
						this.setState({ _id, title });
					}}
				>
					<Card.Body>
						<Card.Title>{title}</Card.Title>
						<Card.Text>{description}</Card.Text>
					</Card.Body>
				</Card>
			);
		});
		return test;
	};

	renderRow = (instances) => {
		const row = this.renderInstances(instances);
		return <CardDeck>{row}</CardDeck>;
	};

	enterKeyPush = (e) => {
		if (e.key === "Enter") {
			this.props.changeUserName(this.state.term);
			this.setState({ term: "" });
		}
	};

	onSelect = (event) => {
		const selectedIndex = event.target.options.selectedIndex;
		console.log(event.target.options[selectedIndex].getAttribute("key"));
	};

	render() {
		const { instances } = this.props;
		let allCards = [];
		var i, j, row;
		switch (instances.length) {
			case 2:
				var chunk = 2;
				for (i = 0, j = instances.length; i < j; i += chunk) {
					row = instances.slice(i, i + chunk);
					allCards.push(this.renderRow(row));
				}
			case 3:
				var chunk = 3;
				for (i = 0, j = instances.length; i < j; i += chunk) {
					row = instances.slice(i, i + chunk);
					allCards.push(this.renderRow(row));
				}
			case 4:
				var chunk = 4;
				for (i = 0, j = instances.length; i < j; i += chunk) {
					row = instances.slice(i, i + chunk);
					allCards.push(this.renderRow(row));
				}
			default:
				var chunk = 8;
				for (i = 0, j = instances.length; i < j; i += chunk) {
					row = instances.slice(i, i + chunk);
					allCards.push(this.renderRow(row));
				}
		}

		return (
			<>
				<Jumbotron style={{ textAlign: "center" }}>
					<h1>
						{this.state.title === null
							? "Select An Activity!"
							: `You have selected "${this.state.title}"!`}
					</h1>
					<Form.Group>
						<Form.Control
							size="lg"
							type="text"
							pattern="[A-Za-z0-9_-]*$"
							placeholder="Enter a name for your new goal!"
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
					<p>
						<Button
							variant="primary"
							onClick={() => {
								if (this.state.term.length > 50) {
									alert("Goal name must be less than 50 characters");
								} else if (this.state._id === null) {
									alert("You must select an Activity!");
								} else {
									this.props.createGoal({
										title: this.state.term,
										_id: this.state._id
									});
									this.props.history.push({
										pathname: "/goals"
									});
								}
							}}
						>
							Create Goal
						</Button>
						<Button
							variant="danger"
							onClick={() =>
								this.setState({ term: "", title: null, _id: null })
							}
						>
							Cancel
						</Button>
					</p>
				</Jumbotron>
				{allCards.map((cardRow) => {
					return <div>{cardRow}</div>;
				})}
			</>
		);
	}
}

function mapStateToProps(state) {
	return { instances: state.instances };
}

export default connect(mapStateToProps, { fetchActivityInstances, createGoal })(
	withRouter(CreateGoal)
);
