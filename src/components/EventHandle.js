//用户事件处理,没有双向绑定
import React, { Component } from "react";

export default class EventHandle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    //覆盖handleChange的this指向
    // this.handleChange = this.handleChange.bind(this)
  }
  //单向数据流
  handleChange = (e) => {
    this.setState({
      name: e.target.value
    });
  };
  render() {
    return (
      <div>
        
        <input type="text" value={this.state.name} onChange={this.handleChange} />
      </div>
    );
  }
}
