import { combineReducers } from 'redux';
import Dropdown from "./Dropdown.js";
import Post from "./Post";

const rootReducer = combineReducers({
  Dropdown,
  Post,
});

export default rootReducer;
