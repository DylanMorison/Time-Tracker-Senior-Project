import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import _ from "lodash";

import { fetchActivityInstances, createGoal, updateUserRoom } from "../../actions/index";

class CreateGoal extends Component {
	state = { term: "", _id: null, title: null, mins: 0, hours: 0, instancesTitles: [] };

	componentDidMount() {
		this.props.updateUserRoom("goalCreation");
		this.props.fetchActivityInstances();
		const { instancesTitles } = this.props.location.state;
		this.setState({ instancesTitles });
	}

	renderInstances = (instances) => {
		const cards = instances.map(({ title, _id, description }) => {
			if (this.state.instancesTitles.includes(title)) {
				return;
			}
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
		return cards;
	};

	renderRow = (instances) => {
		const row = this.renderInstances(instances);
		return <CardDeck>{row}</CardDeck>;
	};

	renderNums = () => {
		let nums = _.times(60, (num) => {
			return <option key={num}>{num}</option>;
		});
		return nums;
	};

	enterKeyPush = (e) => {
		if (e.key === "Enter") {
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
		const length = instances.length;
		switch (length) {
			case 2:
				var chunk = 2;
				for (i = 0, j = instances.length; i < j; i += chunk) {
					row = instances.slice(i, i + chunk);
					allCards.push(this.renderRow(row));
				}
				break;
			case 3:
				var chunk = 3;
				for (i = 0, j = instances.length; i < j; i += chunk) {
					row = instances.slice(i, i + chunk);
					allCards.push(this.renderRow(row));
				}
				break;
			case 4:
				var chunk = 4;
				for (i = 0, j = instances.length; i < j; i += chunk) {
					row = instances.slice(i, i + chunk);
					allCards.push(this.renderRow(row));
				}
				break;
			default:
				var chunk = 8;
				for (i = 0, j = instances.length; i < j; i += chunk) {
					row = instances.slice(i, i + chunk);
					allCards.push(this.renderRow(row));
				}
				break;
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
							placeholder="Enter Goal Title!"
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
					<Container>
						<Row>
							<Col sm={6}>
								<Form.Group controlId="exampleForm.ControlSelect1">
									<Form.Label>Select your hour goal</Form.Label>
									<Form.Control
										as="select"
										size="lg"
										onChange={(e) =>
											this.setState({ hours: e.target.value })
										}
									>
										{this.renderNums()}
									</Form.Control>
								</Form.Group>
							</Col>
							<Col sm={6}>
								<Form.Group controlId="exampleForm.ControlSelect1">
									<Form.Label>Select your minute goal</Form.Label>
									<Form.Control
										as="select"
										size="lg"
										onChange={(e) =>
											this.setState({ mins: e.target.value })
										}
									>
										{this.renderNums()}
									</Form.Control>
								</Form.Group>
							</Col>
						</Row>
					</Container>

					<p>
						<Button
							variant="primary"
							onClick={() => {
								if (this.state.term.length > 50) {
									alert("Goal name must be less than 50 characters");
								} else if (this.state._id === null) {
									alert("You must select an Activity!");
								} else if (
									this.state.mins === 0 &&
									this.state.hours === 0
								) {
									alert("You must select a minute or hour goal!");
								} else if (this.state.term.length < 6) {
									alert(
										"Your goal name must be atleast 6 characters long!"
									);
								} else {
									this.props.createGoal({
										title: this.state.term,
										instanceTitle: this.state.title,
										_id: this.state._id,
										minuteGoal:
											parseInt(this.state.mins) +
											parseInt(this.state.hours) * 60
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
								this.setState({
									term: "",
									title: null,
									_id: null
								})
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

export default connect(mapStateToProps, {
	fetchActivityInstances,
	createGoal,
	updateUserRoom
})(withRouter(CreateGoal));
