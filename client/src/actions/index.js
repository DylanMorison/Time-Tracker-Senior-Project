import axios from 'axios';
import { FETCH_USER, FETCH_ACTIVITIES, ACTIVITY_INSTANCE } from './types';

// our middleware, reduxThunk, will inspect whatever
// action we return from this action creator
// if reduxThunk sees that we return a function instead
// of a normal action, redux thunk will automatically call that function
// and pass in the dispatch function as an argument to our function

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const createActivityInstance = (values, history) => async (dispatch) => {
	const res = await axios.post('/api/activity/instance', values);
	history.push('/activities/activity/instance');
	dispatch({ type: ACTIVITY_INSTANCE, payload: res.data });
};

export const submitActivity = (values, history) => async (dispatch) => {
	const res = await axios.post('/api/activities/new', values);
	history.push('/activities');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchActivities = () => async (dispatch) => {
	const res = await axios.get('api/activities');
	dispatch({ type: FETCH_ACTIVITIES, payload: res.data });
};
