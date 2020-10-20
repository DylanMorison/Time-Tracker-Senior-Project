import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateActivityInstance } from '../../actions/index';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';

class Stopwatch extends Component {
	state = {
		timerOn: false,
		timerStart: 0,
		timerTime: 0,
		title: this.props.title,
		tempMinutes: 0
	};

	componentDidMount() {
		this.mounted = true;
		this.startTimer();
	}
	componentWillUnmount() {
		this.mounted = false;
	}

	startTimer = () => {
		this.setState({
			timerOn: true,
			timerTime: this.state.timerTime,
			timerStart: Date.now() - this.state.timerTime
		});
		this.timer = setInterval(() => {
			if (this.mounted) {
				this.setState({
					timerTime: Date.now() - this.state.timerStart
				});
			}
		}, 10);
	};

	// stopTimer = () => {
	// 	this.setState({ timerOn: false });
	// 	clearInterval(this.timer);
	// };
	// resetTimer = () => {
	// 	this.setState({
	// 		timerStart: 0,
	// 		timerTime: 0
	// 	});
	// };

	updateSession = () => {
		const { activityInstance } = this.props;
		activityInstance.minutes += 1;
		this.props.updateActivityInstance(activityInstance);
	};

	render() {
		// let { title, totalActivityMinutes, description } = this.props.activityInstance;

		// const hours = Math.trunc(totalActivityMinutes / 60);
		// const tempMinutes = minutes % 60;
		// let hoursText;
		// let minutesText;

		const { timerTime } = this.state;
		let centiseconds = ('0' + (Math.floor(timerTime / 10) % 100)).slice(-2);
		let seconds = ('0' + (Math.floor(timerTime / 1000) % 60)).slice(-2);
		let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2);
		let hours = ('0' + Math.floor(timerTime / 3600000)).slice(-2);

		if (parseInt(minutes) !== this.state.tempMinutes) {
			if (this.mounted) {
				this.setState({ tempMinutes: parseInt(minutes) });
				this.updateSession();
			}
		}
		let secondsPercentage = Math.trunc((seconds / 60) * 100);
		let minutesPercentage = Math.trunc((minutes / 60) * 100);

		return (
			<>
				<Container>
					<Jumbotron
						style={{
							textAlign: 'center',
							margin: '3%'
						}}
					>
						<h1>{this.props.activityInstance.title}</h1>
						<h3>{this.props.activityInstance.description}</h3>
					</Jumbotron>
					<Jumbotron
						style={{
							textAlign: 'center',
							margin: '5%'
						}}
					>
						<Row>
							<Col sm={12}>
								<h1>Global Time</h1>
							</Col>
						</Row>
						<Row>
							<Col sm={6} style={{ textSizeAdjust: '10px' }}>
								<CircularProgressbar
									value={this.props.activityMinutes}
									text={`${parseInt(
										this.props.activityMinutes
									)} total mins`}
									styles={buildStyles({
										textSize: '12px'
									})}
								/>
							</Col>
							<Col sm={6}>
								<CircularProgressbar
									value={this.props.activityHours}
									text={`${this.props.activityHours} total hours`}
									styles={buildStyles({
										textSize: '12px'
									})}
								/>
							</Col>
						</Row>
					</Jumbotron>

					<Jumbotron
						style={{
							textAlign: 'center',
							margin: '10%'
						}}
					>
						<Row
							style={{
								marginBottom: '3%'
							}}
						>
							<Col sm={12}>
								<h1>Current Time</h1>
							</Col>
						</Row>
						<Row>
							<Col sm={4}>
								<CircularProgressbar
									value={secondsPercentage}
									text={`${parseInt(seconds)} sec`}
								/>
							</Col>
							<Col sm={4}>
								<CircularProgressbar
									value={minutesPercentage}
									text={`${parseInt(minutes)} min`}
								/>
							</Col>
							<Col sm={4}>
								<CircularProgressbar
									value={hours}
									text={`${parseInt(hours)} hours`}
								/>
							</Col>
						</Row>
					</Jumbotron>
				</Container>
			</>
		);
	}
}

function mapStateToProps(state) {
	return { activityInstance: state.activityInstance };
}

export default connect(mapStateToProps, { updateActivityInstance })(Stopwatch);
