import React, { Component } from "react";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";

import "./index.css";
class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, isHover: "" };
  }

  onClickTitle = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };
  onClickAddIcon = (e) => {
    e.stopPropagation();
    const { addIcon } = this.props;
    addIcon(e);
  };
  onClickDelIcon = (e) => {
    e.stopPropagation();
    const { delIcon } = this.props;
    delIcon(e);
  };
  onClickEditIcon = (e) => {
    e.stopPropagation();
    const { editIcon } = this.props;
    editIcon(e);
  };

  onMouseLeave = (e) => {
    const { onMouseLeave } = this.props;
    this.setState({ isHover: "" });
    onMouseLeave(e);
  };
  onMouseEnter = (e) => {
    const { onMouseEnter } = this.props;
    this.setState({ isHover: e.target.innerText });
    onMouseEnter(e);
  };

  render() {
    const { treeData, addIcon, delIcon, editIcon } = this.props;
    const { open, isHover } = this.state;
    let hasChild = treeData.children && treeData.children.length;

    return (
      <div className="root">
        <div
          className="title-block"
          onClick={this.onClickTitle}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          {hasChild && !open && <PlusSquareOutlined />}
          {hasChild && open && <MinusSquareOutlined />}
          {treeData.title}
          {isHover === treeData.title && (
            <div className="icon-block">
              {addIcon && <PlusCircleOutlined onClick={this.onClickAddIcon} />}
              {delIcon && <EditOutlined onClick={this.onClickEditIcon} />}
              {editIcon && <DeleteOutlined onClick={this.onClickDelIcon} />}
            </div>
          )}
        </div>
        {open && (
          <div className="root">
            {hasChild &&
              treeData.children.map((item) => {
                return (
                  <TreeNode
                    treeData={item}
                    key={item.title}
                    addIcon={addIcon}
                    delIcon={delIcon}
                    editIcon={editIcon}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                  ></TreeNode>
                );
              })}
          </div>
        )}
      </div>
    );
  }
}
export default TreeNode;
