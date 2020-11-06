import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { changeUserName, updateUserRoom } from "../../actions/index";

class Profile extends Component {
	state = { term: "" };

	componentDidMount() {
		this.props.updateUserRoom("Profile");
	}

	enterKeyPush = (e) => {
		if (e.key === "Enter") {
			this.props.changeUserName(this.state.term);
			this.setState({ term: "" });
		}
	};

	render() {
		let userNamePlaceHolder;
		let userNameTextChange;
		let currentUserName;
		if (this.props.user) {
			if (this.props.user.username === undefined) {
				currentUserName = this.props.user.user.username;
			} else {
				currentUserName = this.props.user.username;
			}

			userNamePlaceHolder = `Enter New Username`;
			userNameTextChange = this.state.term === "" ? "" : this.state.term;
		} else {
			userNamePlaceHolder = "Enter username!";
			userNameTextChange = "";
		}
		return (
			<>
				<Container>
					<Row style={{ margin: "5px" }}>
						<Col sm={12}>
							<Jumbotron style={{ textAlign: "center" }}>
								<h1>Your Basic Profile!</h1>
								<Form.Group>
									<Form.Control
										size="lg"
										type="text"
										pattern="[A-Za-z]{3}"
										placeholder={userNamePlaceHolder}
										value={this.state.term}
										onChange={(e) => {
											let term = e.target.value;
											term = term.replace(/[^A-Za-z]/gi, "");
											this.setState({ term });
										}}
										onKeyDown={(e) => this.enterKeyPush(e)}
										style={{ textAlign: "center" }}
									></Form.Control>
								</Form.Group>

								{/* <h4>
									change your username to:{" "}
									<span style={{ color: "red" }}>
										{userNameTextChange}
									</span>
								</h4> */}

								<Button
									variant="primary"
									onClick={() => {
										if (this.state.term.length > 20) {
											alert(
												"Username must be less than 20 characters"
											);
										} else {
											this.props.changeUserName(this.state.term);
											this.setState({ term: "" });
										}
									}}
								>
									Submit
								</Button>
								<Button
									variant="danger"
									onClick={() => this.setState({ term: "" })}
								>
									Cancel
								</Button>
							</Jumbotron>
						</Col>
					</Row>
					<Row>
						<Col sm={12}></Col>
					</Row>
				</Container>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return { user: state.auth };
};

export default connect(mapStateToProps, { changeUserName, updateUserRoom })(Profile);
