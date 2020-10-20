import { FETCH_PRIVATE_ACTIVITIES } from '../actions/types';

export default function (state = [], action) {
	switch (action.type) {
		case FETCH_PRIVATE_ACTIVITIES:
			return action.payload;
		default:
			return state;
	}
}
