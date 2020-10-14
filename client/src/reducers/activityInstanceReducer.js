import { ACTIVITY_INSTANCE } from '../actions/types';

const initialState = {
	user: '',
	activityTitle: 'Activity Title',
	minutes: 0,
	hours: 0,
	startTime: 0
};


export default function (state = initialState, action) {
	switch (action.type) {
		case ACTIVITY_INSTANCE:
				state = {...state,
					user: action.payload.user,
					activityTitle: action.payload.activityTitle,
					minutes: action.payload.minutes,
					startTime: 0
				};
			return state;
		default:
			return state;
	}
}
