import { createStore } from "redux";

const counterReducer = function (state = 0, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
    default:
      return state; //默认相当于初始化
  }
};

const store = createStore(counterReducer);
export default store