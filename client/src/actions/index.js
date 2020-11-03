import axios from "axios";
import {
	FETCH_USER,
	ACTIVITY_INSTANCE,
	FETCH_PRIVATE_ACTIVITIES,
	FETCH_PUBLIC_ACTIVITIES,
	UPDATE_USERNAME
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

export const updateActivityInstance = (activityInstance) => async (dispatch) => {
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

export const fetchActivitiesPublic = () => async (dispatch) => {
	const res = await axios.get("/api/activities/public");
	dispatch({ type: FETCH_PUBLIC_ACTIVITIES, payload: res.data });
};

export const fetchActivitiesPrivate = () => async (dispatch) => {
	const res = await axios.get("/api/activities/private");
	dispatch({ type: FETCH_PRIVATE_ACTIVITIES, payload: res.data });
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
