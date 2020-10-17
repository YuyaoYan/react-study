export const add = (num) => ({ type: "add", payload: num }); // action creator
export const minus = () => ({ type: "minus" }); // action creator
//异步函数
export const asyncAdd = () => (dispatch) => {
  setTimeout(() => {
    dispatch({ type: "add" });
  }, 1000);
};
export const counterReducer = function (state = 0, action) {
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
