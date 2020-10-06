import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

// the keys we put into the combineReducers object will represent
// the keys that exsist inside the state object.
export default combineReducers({
    auth: authReducer,
    form: reduxForm
});