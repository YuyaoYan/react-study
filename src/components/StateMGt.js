import React, { Component, useState, useEffect } from "react";

//函数组件状态管理：useState,useEffect
//hooks只能在16.8.x以后使用
function ClockFun() {
  //创建状态，useState返回状态和修改状态的函数所组成的数组
  // console.log("useState(new Date())", useState(new Date()));
  const [date, setDate] = useState(new Date());
  //启动定时器是副作用，需要用useEffect
  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []); //参数2传递空数组使我们参数1函数仅执行一次
  return <div>{date.toLocaleTimeString()}</div>;
}

//class组件通过state和setState维护状态
class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }
  //mounted
  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState(
        {
          date: new Date()
        },
        () => {
          this.props.change(this.state.date);
        }
      );
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  render() {
    return <div>{this.state.date.toLocaleTimeString()}</div>;
  }
}
export { Clock, ClockFun };
