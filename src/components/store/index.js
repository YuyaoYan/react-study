import { createStore } from "redux";

const counterReducer = function (state = 0, action) {
  const num = typeof action.payload == "number" ? action.payload : 1;
  switch (action.type) {
    case "add":
      return state + num;
    case "minus":
      return state - num;
    default:
      return state; //默认相当于初始化
  }
};

const store = createStore(counterReducer);
export default store;
