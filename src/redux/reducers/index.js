import { combineReducers } from 'redux';
import { SET_DIALOG_OPEN } from '../action';

const initialState = {
	city: '臺北市',
	place: '臺北',
	dialogOpen: false
}

function weatherLocation(state = initialState, action) {
	switch (action.type) {
		case SET_DIALOG_OPEN:
			return {
				...state,
				dialogOpen: action.payload.open
			}
		default:
			return state;
	}
}

const rootReducer = combineReducers({
    weatherLocation
});

export default rootReducer;