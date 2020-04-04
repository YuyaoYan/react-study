import React from "react";

const Context = React.createContext();
const Provider = Context.Provider;
const Consumer = Context.Consumer;
// withConsumer是高阶组件工厂，它能根据配置返回一个高阶组件
function withConsumer(Consumer) {
  return (Comp) => (props) => {
    return <Consumer>{(value) => <Comp {...value} {...props} />}</Consumer>;
  };
}
// Child显示计数器，并能修改它，多个Child之间需要共享数据
// 新的Child是通过withConsumer(Consumer)返回的高阶组件包装所得
const Child = withConsumer(Consumer)(function(props) {
  return (
    <div onClick={() => props.add()} title={props.name}>
      {props.counter}
    </div>
  );
});
export default class ContextTestUpGrade extends React.Component {
  state = {
    counter: 0
  };
  add = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
  render() {
    return (
      <Provider value={{ counter: this.state.counter, add: this.add }}>
        {/* 改造过的Child可以自动从Consumer获取值，直接用就好了 */}
        <Child name="foo" />
        <Child name="bar" />
      </Provider>
    );
  }
}
