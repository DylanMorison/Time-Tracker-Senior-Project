import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GiSandsOfTime } from 'react-icons/gi';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '../buttons/Button';
import './Navbar.css';
import { IconContext } from 'react-icons/lib';
import { connect } from 'react-redux';

class Navbar extends Component {
	state = { click: false, button: true };

	componentDidMount() {
		window.addEventListener('resize', this.showButton);
	}

	handleClick = () => {
		if (this.state.click === false) {
			this.setState({ click: true });
		} else {
			this.setState({ click: false });
		}
	};

	closeMobileMenu = () => {
		this.setState({ click: false });
	};

	showButton = () => {
		if (window.innerWidth <= 960) {
			this.setState({ button: false });
		} else {
			this.setState({ button: true });
		}
	};

	renderContent() {
		switch (this.props.auth) {
			case null:
				return;

			case false:
				return (
					<a
						href="/auth/google"
						className="nav-links"
						onClick={this.closeMobileMenu}
					>
						Login With Google
					</a>
				);
			default:
				return (
					<a
						href="/api/logout"
						className="nav-links"
						onClick={this.closeMobileMenu}
					>
						Logout
					</a>
				);
		}
	}

	render() {
		return (
			<>
				<IconContext.Provider value={{ color: '#fff' }}>
					<div className="navbar">
						<div className="navbar-container container">
							<Link
								to="/"
								className="navbar-logo"
								onClick={this.closeMobileMenu}
							>
								<GiSandsOfTime className="navbar-icon" />
								TimeTracker
							</Link>
							<div
								className="menu-icon"
								onClick={this.handleClick}
							>
								{this.state.click ? <FaTimes /> : <FaBars />}
							</div>
							<ul
								className={
									this.state.click
										? 'nav-menu active'
										: 'nav-menu'
								}
							>
								<li className="nav-item">
									<Link
										to="/"
										className="nav-links"
										onClick={this.closeMobileMenu}
									>
										Home
									</Link>
								</li>
								<li className="nav-item">
									<Link
										to={
											this.props.auth
												? '/activities'
												: '/'
										}
										className="nav-links"
										onClick={this.closeMobileMenu}
									>
										Activities
									</Link>
								</li>
								<li className="nav-item">
									<Link
										to="/profile"
										className="nav-links"
										onClick={this.closeMobileMenu}
									>
										Profile
									</Link>
								</li>
								<li className="nav-item">
									{this.renderContent()}
								</li>
								
							</ul>
						</div>
					</div>
				</IconContext.Provider>
			</>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Navbar);
