import axios from "axios";
import {
	FETCH_USER,
	ACTIVITY_INSTANCE,
	FETCH_PRIVATE_ACTIVITIES,
	FETCH_PUBLIC_ACTIVITIES,
	FETCH_ALL_USERS,
	CREATE_GOAL,
	FETCH_ALL_GOALS,
	FETCH_ACTIVITY_INSTANCES
} from "./types";

// our middleware, reduxThunk, will inspect whatever
// action we return from this action creator
// if reduxThunk sees that we return a function instead
// of a normal action, redux thunk will automatically call that function
// and pass in the dispatch function as an argument to our function

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get("/api/current_user");
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateActivityInstance = (activityInstance, minutes) => async (dispatch) => {
	activityInstance = { ...activityInstance, currentMinutes: minutes };
	const res = await axios.put("/api/activity/instance/update", activityInstance);
	dispatch({ type: ACTIVITY_INSTANCE, payload: res.data });
};

export const createActivityInstance = (activity, history, pageRefresh) => async (
	dispatch
) => {
	const res = await axios.post("/api/activity/instance", activity);

	if (pageRefresh === false) {
		history.push({ retrievedActivityInstance: res.data });
	} else
		history.push({
			pathname: "/activities/activity/instance",
			state: { comeFromListBool: true }
		});

	dispatch({ type: ACTIVITY_INSTANCE, payload: res.data });
};

export const submitActivity = (values, history) => async (dispatch) => {
	const res = await axios.post("/api/activities/new", values);
	history.push("/activities");
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateActivityPopularity = (activity) => async (dispatch) => {
	await axios.put("/api/activity/user/count", activity);
};

export const fetchActivitiesPublic = () => async (dispatch) => {
	const res = await axios.get("/api/activities/public");
	dispatch({ type: FETCH_PUBLIC_ACTIVITIES, payload: res.data });
};

export const fetchActivitiesPrivate = () => async (dispatch) => {
	const res = await axios.get("/api/activities/private");
	dispatch({ type: FETCH_PRIVATE_ACTIVITIES, payload: res.data });
};

export const fetchActivityInstances = () => async (dispatch) => {
	const res = await axios.get("/api/activity/instances");
	dispatch({ type: FETCH_ACTIVITY_INSTANCES, payload: res.data });
};

export const changeUserName = (username) => async (dispatch) => {
	const res = await axios.put(
		"/api/users/username/change",
		{ username },
		{
			headers: {
				"Content-type": "application/json"
			}
		}
	);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateUserRoom = (newRoom) => async (dispatch) => {
	debugger;
	const res = await axios.post("/api/users/page/update", { newRoom });
	console.log(res);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchUsers = (currentRoom) => async (dispatch) => {
	debugger;

	const res = await axios.post("/api/users", { room: currentRoom });
	console.log(res.data);
	dispatch({ type: FETCH_ALL_USERS, payload: res.data });
};

export const createGoal = (activityInstance) => async (dispatch) => {
	const res = await axios.post("/api/goals/create", activityInstance);
	dispatch({ type: FETCH_ALL_GOALS, payload: res.data });
};

export const fetchGoals = () => async (dispatch) => {
	const res = await axios.get("/api/goals");
	dispatch({ type: FETCH_ALL_GOALS, payload: res.data });
};

export const deleteGoal = (_id) => async (dispatch) => {
	const res = await axios.post("/api/goals/delete", { _id });
	dispatch({ type: FETCH_ALL_GOALS, payload: res.data });
};
