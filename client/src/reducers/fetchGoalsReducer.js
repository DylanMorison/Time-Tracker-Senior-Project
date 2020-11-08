import { FETCH_ALL_GOALS } from "../actions/types";

export default function (state = [], action) {
	switch (action.type) {
		case FETCH_ALL_GOALS:
			return action.payload;
		default:
			return state;
	}
}
