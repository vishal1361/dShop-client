import { combineReducers } from "redux";
import sellerReducer from './sellerReducer.js';
import auth from "./auth.js";
export default combineReducers({ sellerReducer, auth });