import React, { Component } from "react";
import { Input, Button } from "antd";

// 创建高阶组件 - 增加全局校验和包装输入框
// Comp是表单
function KFormCreate(Comp) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.options = {};
      this.state = {};
    }
    validateFields = (cb) => {
      const rets = Object.keys(this.options).map((field) => {
        return this.validateField(field);
      });
      const ret = rets.every((v) => v);
      //将执行结果传出去
      cb(ret, this.state);
    };
    //单项校验
    validateField = (field) => {
      //获取校验项得值
      const { rules } = this.options[field];
      const ret = !rules.some((rule) => {
        if (rule.required) {
          if (!this.state[field]) {
            this.setState({
              [field + "Message"]: rule.message,
            });
            return true;
          }
        }
        return false;
      });
      //若校验成功，清理错误信息
      console.log("ret==", ret);

      if (ret) {
        this.setState({
          [field + "Message"]: "",
        });
      }
      return ret;
    };
    handleChange = (e) => {
      e.persist();
      const { name, value } = e.target;
      this.setState({ [name]: value }, () => this.validateField(name));
    };
    //包装输入框
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
    render() {
      return (
        <Comp
          {...this.props}
          getFieldDec={this.getFieldDec}
          validateFields={this.validateFields}
        ></Comp>
      );
    }
  };
}
@KFormCreate
class KformTest extends Component {
  onLogin = () => {
    //校验
    this.props.validateFields((isValid, data) => {
      if (isValid) {
        console.log("login");
      } else {
        console.log("fail");
      }
    });
  };
  render() {
    const { getFieldDec } = this.props;
    return (
      <div>
        {/* 接收两个参数，返回一个装饰器 */}
        {/* getFieldDec是一个方法，这个方法就收第一个参数后返回一个装饰器，第二个参数才是执行它返回的装饰器的参数 */}
        {getFieldDec("username", {
          rules: [{ required: true, message: "please enter" }],
        })(<Input type="text"></Input>)}
        {getFieldDec("password", {
          rules: [{ required: true, message: "please enter" }],
        })(<Input type="password"></Input>)}
        <Button onClick={this.onLogin}>Login</Button>
      </div>
    );
  }
}

export default KformTest;
