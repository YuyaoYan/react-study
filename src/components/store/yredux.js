//手写一个redux和中间件

/**
 *
 * @param {function} reducer 就是 counterReducer
 * @param {*} enhancer 是插件
 */
export function createStore(reducer, enhancer) {
  if (enhancer) {
    //高阶函数，把createStore变强后，接收reducer参数
    return enhancer(createStore)(reducer);
  }

  let currentState = undefined;
  const currentListeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    // 修改
    currentState = reducer(currentState, action);
    //变更通知
    currentListeners.forEach((v) => v());

    return action; //可以没有返回值，中间件可能需要返回值
  }

  function subscribe(cb) {
    currentListeners.push(cb);
  }

  dispatch({ type: "@YYY-REDUX" }); //只要和用户的action type重复就可以

  return {
    getState,
    dispatch,
    subscribe,
  };
}

export function applyMiddleware(...middlewares) {
  return (createStore) => (...args) => {
    //先完成之前createStore工作
    const store = createStore(...args); //args里面有reducer
    //原先的dispatch
    let dispatch = store.dispatch;
    //强化dispatch
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args),
    };
    const chain = middlewares.map((mw) => mw(midApi));

    //强化dispatch，让他可以按顺序执行中间件函数
    dispatch = compose(...chain)(store.dispatch);

    //返回全新的store，更新强化过的dispatch函数
    return {
      ...store,
      dispatch,
    };
  };
}

export function compose(...funs) {
  if (funs.length == 0) {
    return (arg) => arg;
  }
  if (funs.length == 1) {
    return funs[0];
  }
  //如果让数组中的函数[fn1,fn2,fn3]按顺序执行，可以转换成fn3(fn2(fn1))的形式
  //聚合函数数组为一个数组
  //args就是dispatch
  return funs.reduce((left, right) => (...args) => right(left(...args)));
}
