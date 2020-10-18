import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateActivityInstance } from '../../actions/index';

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
		debugger;
		console.log('Updating Document!');
		const { activityInstance } = this.props;
		activityInstance.minutes += 1;
		this.props.updateActivityInstance(activityInstance);
	};

	render() {
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

		return (
			<div className="Stopwatch-display">
				{/* {this.state.timerOn === false && this.state.timerTime === 0 && (
					<button onClick={this.startTimer}>Start</button>
				)}
				{this.state.timerOn === true && (
					<button onClick={this.stopTimer}>Stop</button>
				)}
				{this.state.timerOn === false && this.state.timerTime > 0 && (
					<button onClick={this.startTimer}>Resume</button>
				)}
				{this.state.timerOn === false && this.state.timerTime > 0 && (
					<button onClick={this.resetTimer}>Reset</button>
				)} */}
				{hours} : {minutes} : {seconds} : {centiseconds}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { activityInstance: state.activityInstance };
}

export default connect(mapStateToProps, { updateActivityInstance })(Stopwatch);
