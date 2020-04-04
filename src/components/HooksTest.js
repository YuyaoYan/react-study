import React, { useState } from "react";

function FruitList({ fruits, onSelectFruits }) {
  return (
    <div>
      <ul>
        {fruits.map((f, i) => {
          return (
            <li key={i} onClick={() => onSelectFruits(f)}>
              {f}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
function FruitAdd(props) {
  const [pname, setPname] = useState("");
  console.log("panme", pname);
  const FruitAdd = (e) => {
    if (e.key === "Enter") {
      props.onAddFruit(pname);
      setPname("");
    }
  };
  return (
    <div>
      <input
        type="text"
        value={pname}
        onChange={(e) => setPname(e.target.value)}
        onKeyDown={FruitAdd}
      />
    </div>
  );
}
export default function HooksTest() {
  //useState里面的值就是解构出来以后第一个参数fruit的值
  //第二个参数setFruit相当于setState函数，调用它可以更新第一个参数fruit的值
  const [fruit, setFruit] = useState("");
  const [fruits, setFruits] = useState(["1", "2", "3"]);
  return (
    <div>
      <FruitAdd onAddFruit={(pname) => setFruits([pname, ...fruits])}></FruitAdd>
      <p>{fruit === "" ? "please choose fruit." : "your choose is:" + `${fruit}`}</p>
      <FruitList fruits={fruits} onSelectFruits={(f) => setFruit(f)}></FruitList>
    </div>
  );
}