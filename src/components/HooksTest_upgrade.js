import React, { useEffect, useState, useReducer, useContext } from "react";
const Context = React.createContext();
//state是fruits的数据，action是新数据
//传的时候只需要传新数据即可
function fruitReducer(state, action) {
  console.log("state, action", state, action);

  switch (action.type) {
    case "init":
      return action.payload;
    case "add":
      return [...state, action.payload];
    default:
      return state;
  }
}
function FruitList({ fruits, onSelectFruits }) {
  return (
    <div>
      <ul>
        {fruits.map((i, j) => {
          return (
            <li key={j} onClick={() => onSelectFruits(i)}>
              {i}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
function FruitAdd(props) {
  const [name, setName] = useState("");
  const { dispatch } = useContext(Context);
  const add = (e) => {
    if (e.key === "Enter") {
      // props.onAddFruit(e.target.value);
      dispatch({ type: "add", payload: name });
      setName("");
    }
  };
  useEffect(() => {
    document.title = name;
  }, [name]);
  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={add} />
    </div>
  );
}
export default function HooksTestUpgrade() {
  const [fruit, setFruit] = useState("");

  //参数1是reducer，参数2是初始值
  //执行dispatch时就会执行
  const [fruits, dispatch] = useReducer(fruitReducer, []);

  //参数2改变会执行useEffect，如果没有依赖某个参数，那只执行一遍，参数2写空数组即可
  useEffect(() => {
    // setTimeout(() => {
    // setFruits(["香蕉", "西瓜"]);
    // 变更状态，派发动作即可
    dispatch({ type: "init", payload: ["香蕉", "西瓜"] });
    // }, 0);
  }, []);

  return (
    <div>
      <Context.Provider value={{ fruits, dispatch }}>
        {/* <FruitAdd onAddFruit={(pname) => dispatch({ type: "add", payload: pname })} /> */}
        <FruitAdd />
        {fruit}
        <FruitList fruits={fruits} onSelectFruits={(i) => setFruit(i)}></FruitList>
      </Context.Provider>
    </div>
  );
}
