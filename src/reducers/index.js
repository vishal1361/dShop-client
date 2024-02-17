import { combineReducers } from "redux";
import productReducer from './productReducer.js';
import auth from "./auth.js";
export default combineReducers({ productReducer, auth });