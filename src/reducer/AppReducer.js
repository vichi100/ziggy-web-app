import { ACTION_TYPES } from './ActionType';

const initialState = {
	dishArray: [],
	clickedItem: null,
	restaurantDetails: null
};
const AppReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.SET_DISH_ARRAYX:
			console.log("SET_DISH_ARRAYX");
			return {
				...state,
				dishArray: action.payload
			};

		case ACTION_TYPES.SET_CLICKED_ITEM:
			console.log("SET_CLICKED_ITEM");
			return {
				...state,
				clickedItem: action.payload
			};
		case ACTION_TYPES.SET_RESTAURANT_DETAILS:
			console.log("SET_RESTAURANT_DETAILS");
			return {
				...state,
				restaurantDetails: action.payload
			};
		default:
			console.log("Default");
			return state;
	}
	return state;
};
export default AppReducer;
