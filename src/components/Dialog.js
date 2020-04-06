import React from "react";
import {
  createPortal,
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer,
} from "react-dom";

//react v16之前
export class Dialog2 extends React.Component {
  //render一个null，目的是什么都不渲染
  render() {
    return null;
  }
  componentDidMount() {
    //首次挂载，创建宿主div
    const doc = window.document;
    this.node = doc.createElement("div");
    doc.body.appendChild(this.node);
    this.createPortal(this.props);
  }
  componentDidUpdate() {
    this.createPortal(this.props);
  }
  componentWillUnmount() {
    //清理宿主
    unmountComponentAtNode(this.node);
    //清理节点
    window.document.body.removeChild(this.node);
  }
  createPortal(props) {
    //挂载
    unstable_renderSubtreeIntoContainer(
      this, //当前组件
      <div className="dialog">{props.children}</div>, // 塞进传送门的JSX this.node
      this.node // 传送门另一端的DOM node
    );
  }
}

//react v16之后
export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.node = document.createElement("div");
    document.body.appendChild(this.node);
  }
  render() {
    // Portal传送门，接收两个参数
    return createPortal(
      <div>{this.props.children}</div>, //塞进传送门的JSX
      this.node //传送门的另一端DOM node
    );
  }
}
