import axios from 'axios';
import { FETCH_USER } from './types';

// our middleware, reduxThunk, will inspect whatever
// action we return from this action creator
// if reduxThunk sees that we return a function instead
// of a normal action, redux thunk will automatically call that function
// and pass in the dispatch function as an argument to our function

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data });
};
