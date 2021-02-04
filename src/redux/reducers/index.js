import { combineReducers } from 'redux';
import { SET_DIALOG_OPEN, SET_LOCATION, SET_WEATHER } from '../action';

const initialState = {
	weather:{},
	location: {
		city: '臺北市',
		place: '臺北',
	},
	dialogOpen: false
}

function weatherLocation(state = initialState, action) {
	switch (action.type) {
		case SET_DIALOG_OPEN:
			return {
				...state,
				dialogOpen: action.payload.open
			}
		case SET_LOCATION:
			return {
				...state,
				location: action.payload.data
			}
		case SET_WEATHER:
			return {
				...state,
				weather: action.payload
			}
		default:
			return state;
	}
}

const rootReducer = combineReducers({
    weatherLocation
});

export default rootReducer;