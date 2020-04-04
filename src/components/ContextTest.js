// 上下文
import React from "react";

const Context = React.createContext();
const Provider = Context.Provider;
const Consumer = Context.Consumer;

function Child(props) {
  return <div onClick={() => props.add()}>{props.count}</div>;
}
export default class ContextTest extends React.Component {
  state = {
    count: 0
  };
  add = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return (
      <Provider value={{ count: this.state.count, add: this.add }}>
        <Consumer>{(value) => <Child {...value}></Child>}</Consumer>
        <Consumer>{(value) => <Child {...value}></Child>}</Consumer>
        <Consumer>{(value) => <Child {...value}></Child>}</Consumer>
        <Consumer>{(value) => <Child {...value}></Child>}</Consumer>
      </Provider>
    );
  }
}
