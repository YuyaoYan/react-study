import React, { Component } from "react";
import TreeNode from "./Tree";
import deepclone from "clone-deep";
import { Input } from "antd";
const { Search } = Input;
export default class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: ["0-3-0"],
      searchValue: "",
    };
  }
  treeData = {
    title: "Web全栈架构师",
    id: "0",
    children: [
      {
        title: "Java架构师",
        id: "0-1",
      },
      {
        title: "JS高级",
        id: "0-2",
        children: [
          {
            title: "ES6",
            id: "0-2-0",
          },
          {
            title: "动效",
            id: "0-2-1",
          },
        ],
      },
      {
        title: "Web全栈",
        id: "0-3",
        children: [
          {
            title: "Vue训练营",
            id: "0-3-0",

            children: [
              {
                title: "组件化",
                id: "0-3-0-0",
              },
              {
                title: "源码",
                id: "0-3-0-1",
              },
              {
                title: "docker部署",
                id: "0-3-0-2",
              },
            ],
          },
          {
            title: "React",
            id: "0-3-1",
            children: [
              {
                title: "JSX",
                id: "0-3-1-0",
              },
              {
                title: "虚拟DOM",
                id: "0-3-1-1",
              },
            ],
          },
          {
            title: "Node",
            id: "0-3-2",
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
    // let _treeData = deepclone(this.treeData);
    this.setState({
      searchValue: e.target.value,
    });
    // let val = e.target.value;
    // _treeData.map((item) => {
    //   if (item.title.indexOf(val) > -1) {
    //   }
    // });
  };

  //给查询到的节点上色
  renderColor = () => {};

  render() {
    const { expandedKeys, searchValue } = this.state;
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
          expandedKeys={expandedKeys}
          searchValue={searchValue}
        />
      </div>
    );
  }
}
