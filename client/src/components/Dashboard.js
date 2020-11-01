import React from "react";
import { Link } from "react-router-dom";
import ActivityList from "./activities/ActivityList";
import WebSocketMain from "./WebSocketMain";

const Dashboard = () => {
	return (
		<div>
			<ActivityList />
			<WebSocketMain />
			<div className="fixed-action-btn">
				<Link to="/activities/new" className="btn-floating btn-large red">
					<i className="material-icons">add</i>
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;
