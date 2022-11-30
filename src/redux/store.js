import { createStore, combineReducers } from "redux";
import TaskReducer from "./task/reducers";

const rootReducer = combineReducers({
  task: TaskReducer,
});
const store = createStore(rootReducer);

export default store;
