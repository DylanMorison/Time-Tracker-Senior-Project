import { combineReducers } from 'redux';
import authReducer from './authReducer';

// the keys we put into the combineReducers object will represent
// the keys that exsist inside the state object.
export default combineReducers({
    auth: authReducer
});