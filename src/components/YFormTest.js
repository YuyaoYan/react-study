import React, { Component } from "react";
import { Input, Button } from "antd";

/**
 * @description 这个文件主要封装了一个简单的Form表单，并加以引用
 * @description 如果将表单单独提出来一个文件的话，可以将validateFields等方法挂载在Form上，更方便引用
 */

function KFormCreated(Comp) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.options = {};
    }
    handleChange = (e) => {
      e.persist();
      const { name, value } = e.target;
      this.setState({ [name]: value }, () => this.validateField(name));
    };
    /**
     * @description 包装表filed
     * @param {String} field label name
     * @param {Object} option include "rules" and more.
     */
    getFieldDec = (field, option) => {
      this.options[field] = option;
      return (InputComp) => {
        return (
          <div>
            {React.cloneElement(InputComp, {
              name: field,
              value: this.state[field] || "",
              onChange: this.handleChange,
            })}
            {/* 校验信息 */}
            {this.state[field + "Message"] && (
              <p style={{ color: "red" }}>{this.state[field + "Message"]}</p>
            )}
          </div>
        );
      };
    };
    validateField = (field) => {
      const { rules } = this.options[field];
      const ret = !rules.some((rule) => {
        if (rule.required) {
          if (!this.state[field]) {
            this.setState({ [field + "Message"]: rule.message });
            return true;
          }
        }
        return false;
      });
      if (ret) {
        this.setState({ [field + "Message"]: "" });
      }
      return ret;
    };
    validateFields = (callback) => {
      const rets = Object.keys(this.options).map((item) => {
        return this.validateField(item);
      });
      const ret = rets.every((v) => v);
      callback(ret, this.state);
    };

    render() {
      return (
        <div className={"KFormCreated"}>
          <Comp
            {...this.props}
            getFieldDec={this.getFieldDec}
            validateFields={this.validateFields}
          ></Comp>
        </div>
      );
    }
  };
}

/**
 * @description form表单可以提供以下函数：
 * @description validateFields(), getFieldDec()
 */

@KFormCreated
class Form extends Component {
  render() {
    const { getFieldDec, colums } = this.props;

    return (
      <div>
        {colums.map((item, index) => {
          return (
            <div className={"Form"}>
              {getFieldDec(item.field, { rules: item.rules })(
                <Input type={item.renderType} key={index}></Input>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default class KFormTest extends Component {
  culoums = [
    {
      field: "username",
      rules: [{ required: true, message: "Please enter username." }],
      renderType: "text",
    },
    {
      field: "password",
      rules: [{ required: true, message: "Please enter password." }],
      renderType: "password",
    },
  ];
  onSubmit = () => {
    this.refs.form.validateFields((ret) => {
      if (ret) {
        console.log("success");
      } else {
        console.log("error");
      }
    });
  };
  render() {
    return (
      <div className={"KFormTest"}>
        <Form ref="form" colums={this.culoums}></Form>
        <Button onClick={this.onSubmit}>Submit</Button>
      </div>
    );
  }
}
