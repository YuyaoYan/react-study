import React, { Component } from "react";
import TreeNode from "./Tree";
import { Input } from "antd";
const { Search } = Input;
export default class Tree extends Component {
  treeData = {
    title: "Web全栈架构师",
    children: [
      {
        title: "Java架构师",
      },
      {
        title: "JS高级",
        children: [
          {
            title: "ES6",
          },
          {
            title: "动效",
          },
        ],
      },
      {
        title: "Web全栈",
        children: [
          {
            title: "Vue训练营",
            expand: true,
            children: [
              {
                title: "组件化",
              },
              {
                title: "源码",
              },
              {
                title: "docker部署",
              },
            ],
          },
          {
            title: "React",
            children: [
              {
                title: "JSX",
              },
              {
                title: "虚拟DOM",
              },
            ],
          },
          {
            title: "Node",
          },
        ],
      },
    ],
  };
  onAddFun = () => {
    console.log("add");
  };
  onDelFun = () => {
    console.log("del");
  };
  onEditFun = () => {
    console.log("edit");
  };
  
  /**
   * hover回调
   */
  onMouseLeave = (e) => {};
  onMouseEnter = (e) => {};

  /**
   * 树搜索
   */
  onChange = (e) => {
    console.log(e.target.value);
  };

  render() {
    return (
      <div className="tree-container">
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <TreeNode
          treeData={this.treeData}
          addIcon={this.onAddFun}
          delIcon={this.onDelFun}
          editIcon={this.onEditFun}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        />
      </div>
    );
  }
}
