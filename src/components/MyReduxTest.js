import React, { Component } from "react";
// import logger from "redux-logger";
import { applyMiddleware, createStore } from "./store/yredux";

const counterReducer = function (state = 0, action) {
  debugger;
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

//自定义中间件logger
function logger() {
  //返回真正中间件任务执行函数
  return (dispatch) => (action) => {
    //执行中间件任务
    console.log(action.type + "执行了");

    //执行下一个中间件
    return dispatch(action);
  };
}

//自定义中间件thunk
const thunk = ({ getState }) => (dispatch) => (action) => {
  //处理函数action，（正常action是个对象）
  if (typeof action == "function") {
    console.log("getState", getState);
    console.log("dispatch", dispatch);
    console.log("action", action);

    return action(dispatch, getState);
  }
  //不是函数直接跳过
  return dispatch(action);
};

const store = createStore(counterReducer, applyMiddleware(logger, thunk));

export default class MyReduxTest extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }
  render() {
    return (
      <div>
        {store.getState()}
        <div>
          <button onClick={() => store.dispatch({ type: "add" })}>+</button>
          <button
            onClick={() =>
              store.dispatch(function () {
                setTimeout(() => {
                  store.dispatch({ type: "add" });
                }, 1000);
              })
            }
          >
            async+
          </button>
        </div>
      </div>
    );
  }
}
