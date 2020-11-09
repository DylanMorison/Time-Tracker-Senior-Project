import { ACTIVITY_INSTANCE } from "../actions/types";

const initialState = {
	user: "",
	activity: "",
	title: "Activity Title",
	description: "activity description",
	minutes: 0,
	_id: ""
};

export default function (state = initialState, action) {
	switch (action.type) {
		case ACTIVITY_INSTANCE:
			state = {
				...state,
				user: action.payload.user,
				activity: action.payload.activity,
				title: action.payload.title,
				description: action.payload.description,
				minutes: action.payload.minutes,
				_id: action.payload._id
			};
			return state;
		default:
			return state;
	}
}
