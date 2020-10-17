import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk"; //解决异步问题
import {counterReducer} from "./counter"

const store = createStore(counterReducer, applyMiddleware(logger, thunk));
export default store;
