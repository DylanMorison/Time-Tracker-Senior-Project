import { ACTIVITY_INSTANCE } from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case ACTIVITY_INSTANCE:
            return action.payload;
        default:
            return state;
    }
}