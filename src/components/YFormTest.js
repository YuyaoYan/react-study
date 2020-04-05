import React from "react";
import { Input, Button } from "antd";
function widthYFormTest(Comp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.options = {};
      this.state = {};
    }
    validateField = (field) => {
      const { rules } = this.options[field];
      const ret = !rules.some((r) => {
        if (r.required) {
          if (!this.state[field]) {
            this.setState({
              [field + "Message"]: r.message,
            });
            return true;
          }
        }
        return false;
      });
      if (ret) {
        this.setState({
          [field + "Message"]: "",
        });
      }
      console.log("ret", ret);
      return ret;
    };
    validateFields = (cb) => {
      const ret = Object.keys(this.options).every((i) => this.validateField(i));
      cb(ret);
    };
    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState(
        {
          [name]: value,
        },
        () => {
          this.validateField(name);
        }
      );
    };
    getFieldDec = (field, rules) => {
      this.options[field] = rules;
      //返回一个装饰器
      return (InputComp) => {
        return (
          <div>
            {React.cloneElement(InputComp, {
              name: field,
              value: this.state[field] || "",
              onChange: this.handleChange,
            })}
            {<p style={{ color: "red" }}>{this.state[field + "Message"]}</p>}
          </div>
        );
      };
    };

    render() {
      return (
        <div>
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
@widthYFormTest
class YFormTest extends React.Component {
  login = () => {
    const { validateFields } = this.props;
    validateFields((ret) => {
      if (ret) {
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
        {getFieldDec("username", { rules: [{ required: true, message: "please input username" }] })(
          <Input type="text"></Input>
        )}
        {getFieldDec("password", { rules: [{ required: true, message: "please input password" }] })(
          <Input type="text"></Input>
        )}
        <Button onClick={this.login}>Login</Button>
      </div>
    );
  }
}
export default YFormTest;
