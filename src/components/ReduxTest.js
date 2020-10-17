import React from "react";
import { connect } from "react-redux";
import { add, minus, asyncAdd } from "./store/counter";

// 参数1: mapStateToProps = (state) => {return {num: state}}
// 参数2: mapDispatchToProps => {retun {add:()=>dispatch({type:add})}}
// counrt两个任务
// 1. 自动渲染
// 2. 映射到组件属性
@connect(
  (state) => ({ num: state }), // 状态映射
  {
    add,
    minus,
    asyncAdd,
  }
)
class ReduxTest extends React.Component {
  render() {
    return (
      <div>
        {this.props.num}
        <div>
          <button onClick={this.props.add}>+</button>
          <button onClick={this.props.minus}>-</button>
          <button onClick={() => this.props.add(2)}>+2</button>
          <button onClick={this.props.asyncAdd}>async+</button>
        </div>
      </div>
    );
  }
}
export default ReduxTest;
