// this reducer records whether or not the user is logged in
import { FETCH_USER } from '../actions/types';
export default function (state = null, action) {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
}
