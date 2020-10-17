import React from "react";
import { connect } from "react-redux";
// @connect(
//   (state) => ({ num: state }), // 状态映射
//   (dispatch) => ({
//     add: () => dispatch({ type: "add" }), // action creator
//     minus: () => dispatch({ type: "minus" }), // action creator
//   })
// )
//和上面一样
// 参数1: mapStateToProps = (state) => {return {num: state}}
// 参数2: mapDispatchToProps => {retun {add:()=>dispatch({type:add})}}

@connect(
  (state) => ({ num: state }), // 状态映射
  {
    add: (num) => ({ type: "add", payload: num }), // action creator
    minus: () => ({ type: "minus" }), // action creator
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
        </div>
      </div>
    );
  }
}
export default ReduxTest;
