import React, { Component } from "react";
import { Button } from "antd";
import Form from "./form/YForm";
class KFormTest extends Component {
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
export default KFormTest;
