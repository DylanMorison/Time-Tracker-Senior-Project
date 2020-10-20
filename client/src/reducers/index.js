import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import activitiesReducer from './activitiesReducer';
import publicActivitiesReducer from './activitiesPublicReducer';
import privateActivitiesReducer from './activitiesPrivateReducer';

import activityInstanceReducer from './activityInstanceReducer';

// the keys we put into the combineReducers object will represent
// the keys that exsist inside the state object.
export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	activities: activitiesReducer,
	publicActivities: publicActivitiesReducer,
	privateActivities: privateActivitiesReducer,
	activityInstance: activityInstanceReducer
});
