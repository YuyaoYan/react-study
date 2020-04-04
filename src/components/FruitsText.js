import React, { useState, useContext, useReducer, useEffect } from "react";
//useReducer将状态提取到全集范围内，从而将子组件从中解偶
//useContext用于在快速在函数组件中导入上下文。
//useEffect 给函数组件增加了执行副作用操作的能力。
//副作用(Side Effect)是指一个 function 做了和本身运算返回值无关的事，比如:修改了全局变量、修改了传入的 参数、甚至是 console.log()，所以 ajax 操作，修改 dom 都是算作副作用。
//useEffect相当于created或者mounted，只会执行一次，有几个副作用的操作，就写几个useEffect

const Context = React.createContext();
function actFruits(act, list) {
  switch (list.action) {
    case "init":
      return list.content;
    case "add":
      return [...act, list.content];
    default:
      return act;
  }
}
function FruitsList(props) {
  return (
    <div>
      <ul>
        {props.fruits.map((i, j) => {
          return (
            <li key={j} onClick={() => props.onSelect(i)}>
              {i}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
function FruitsAdd() {
  const [name, setName] = useState("");
  const { setFruits } = useContext(Context);
  const add = (e) => {
    if (e.key === "Enter") {
      setFruits({ action: "add", content: e.target.value });
      setName("");
    }
  };
  return (
    <div>
      <input type="text" onChange={(e) => setName(e.target.value)} onKeyDown={add} value={name} />
    </div>
  );
}
export default function FruitsText() {
  const [fruit, setFruit] = useState("");
  const [fruits, setFruits] = useReducer(actFruits, []);
  useEffect(() => {
    setFruits({ action: "init", content: ["88", "99"] });
  }, []);
  return (
    <div>
      <Context.Provider value={{ fruits, setFruits }}>
        <FruitsAdd />
        {fruit}
        <FruitsList fruits={fruits} onSelect={(i) => setFruit(i)}></FruitsList>
      </Context.Provider>
    </div>
  );
}
