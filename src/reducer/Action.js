import { ACTION_TYPES } from './ActionType';

export const setDishArray = (payload) => {
	console.log("payload", payload);
	return {
		type: ACTION_TYPES.SET_DISH_ARRAYX,
		payload
	};
};

export const setClickedItem = (payload) => {
	console.log("payload", payload);
	return {
		type: ACTION_TYPES.SET_CLICKED_ITEM,
		payload
	};
};




