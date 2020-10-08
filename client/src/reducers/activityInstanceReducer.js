import { ACTIVITY_INSTANCE } from '../actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case ACTIVITY_INSTANCE:
			console.log('made it to the reducer', action.payload);
			return action.payload;
		default:
			return state;
	}
}
