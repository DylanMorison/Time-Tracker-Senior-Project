import { ACTIVITY_INSTANCE } from '../actions/types';

const initialState = {
	//Assuming these are the only values in response
	user: '',
	activityTitle: 'Activity Title',
	minutes: 0,
	hours: 0,
	startTime: 0
};

//   user: String,
//   activityTitle: { type: String, unique: true },
//   minutes: { type: Number, min: 0, max: 60, default: 0 },
//   hours: { type: Number, default: 0 },
//   startTime: Number

export default function (state = initialState, action) {
	switch (action.type) {
		case ACTIVITY_INSTANCE:
			return {
				...state,
				user: action.payload.user,
				activityTitle: action.payload.activityTitle,
				minutes: action.payload.minutes,
				hours: action.payload.hours,
				startTime: 0
			};
		default:
			return state;
	}
}
