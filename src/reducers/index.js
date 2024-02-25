import { combineReducers } from "redux";
import sellerReducer from './sellerReducer.js';
import auth from "./auth.js";
import buyerReducer from "./buyerReducer.js";
export default combineReducers({ sellerReducer, buyerReducer, auth });