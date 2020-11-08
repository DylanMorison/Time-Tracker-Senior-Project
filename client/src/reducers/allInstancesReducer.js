import { FETCH_ACTIVITY_INSTANCES } from "../actions/types";

export default function (state = [], action) {
	switch (action.type) {
		case FETCH_ACTIVITY_INSTANCES:
			return action.payload;
		default:
			return state;
	}
}
