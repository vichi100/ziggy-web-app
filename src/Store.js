import { createStore, combineReducers } from "redux";
import AppReducer from "./reducer/AppReducer";
const rootReducer = combineReducers({ AppReducer });
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
