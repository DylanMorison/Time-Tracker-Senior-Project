import { FETCH_PUBLIC_ACTIVITIES } from '../actions/types';

export default function (state = [], action) {
	switch (action.type) {
		case FETCH_PUBLIC_ACTIVITIES:
			return action.payload;
		default:
			return state;
	}
}
