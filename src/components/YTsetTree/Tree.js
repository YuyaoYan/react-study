import React, { Component } from "react";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import "./index.css";

const propTypes = {
  expandedKeys: PropTypes.array,
  searchValue: PropTypes.string,
};
const defaultProps = {
  expandedKeys: [],
  searchValue: "",
};
class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: "",
      open: false,
      expandedKeys: props.expandedKeys,
    };
  }

  //展开子节点
  onClickPlus = () => {
    this.setState({ open: true, expandedKeys: [] });
  };

  //折叠子节点
  onClickMinus = () => {
    this.setState({ open: false, expandedKeys: [] });
  };

  //相应按钮操作
  onClickAddIcon = (e) => {
    e.stopPropagation();
    const { addIcon } = this.props;
    addIcon(e);
  };
  //相应按钮操作
  onClickDelIcon = (e) => {
    e.stopPropagation();
    const { delIcon } = this.props;
    delIcon(e);
  };
  //相应按钮操作
  onClickEditIcon = (e) => {
    e.stopPropagation();
    const { editIcon } = this.props;
    editIcon(e);
  };

  //hover事件
  onMouseLeave = (e) => {
    const { onMouseLeave } = this.props;
    this.setState({ isHover: "" });
    onMouseLeave(e);
  };

  //hover事件
  onMouseEnter = (e) => {
    const { onMouseEnter } = this.props;
    this.setState({ isHover: e.target.innerText });
    onMouseEnter(e);
  };

  render() {
    const { treeData, addIcon, delIcon, editIcon, searchValue } = this.props;
    const { isHover, open, expandedKeys } = this.state;
    let hasChild = treeData.children && treeData.children.length;

    //如果展开节点只传值为子节点，需找到其父节点
    //例如：0-3-1-2，需找到 0，0-3，0-3-1
    let hasRootList = ["0"];
    expandedKeys.forEach((item) => {
      hasRootList.push(item);
      let itemarr = item.split("-");
      let len = item.split("-").length;
      let str = 0;

      for (var i = 1; i < len; i++) {
        str += `-${itemarr[i]}`;
        if (expandedKeys.indexOf(str) <= -1 && hasRootList.indexOf(str) <= -1) {
          hasRootList.push(str);
        }
      }
    });
    hasRootList = [...new Set(hasRootList)]; //数组去重
    let isExpanded = hasRootList.indexOf(treeData.id) > -1 || open;

    //渲染搜索字段为红色
    const idx = treeData.title.indexOf(searchValue);
    const beforeStr = treeData.title.substr(0, idx);
    const afterStr = treeData.title.substr(idx + searchValue.length);
    let title = "";
    if (idx > -1) {
      title = (
        <>
          {beforeStr}
          <span className="searchVal-class">{searchValue}</span>
          {afterStr}
        </>
      );
    } else {
      title = treeData.title;
    }

    return (
      <div className="root">
        <div
          className="title-block"
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          {hasChild && !isExpanded && (
            <PlusSquareOutlined onClick={() => this.onClickPlus(hasChild)} />
          )}
          {hasChild && isExpanded && (
            <MinusSquareOutlined onClick={() => this.onClickMinus(hasChild)} />
          )}
          {title}
          {isHover === treeData.title && (
            <div className="icon-block">
              {addIcon && <PlusCircleOutlined onClick={this.onClickAddIcon} />}
              {delIcon && <EditOutlined onClick={this.onClickEditIcon} />}
              {editIcon && <DeleteOutlined onClick={this.onClickDelIcon} />}
            </div>
          )}
        </div>
        {isExpanded && (
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
                    expandedKeys={hasRootList}
                    searchValue={searchValue}
                  ></TreeNode>
                );
              })}
          </div>
        )}
      </div>
    );
  }
}
TreeNode.propTypes = propTypes;
TreeNode.defaultProps = defaultProps;
export default TreeNode;
