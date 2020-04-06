import React from "react";

//
function YFormCreate(Comp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.options = {};
      this.state = {};
    }
    validField = (name) => {
      const { rules } = this.options[name];
      console.log(this.options, rules, name, this.options[name]);
      let ret = rules.some((i) => {
        if (i.required && !this.state[name]) {
          this.setState({ [name + "Message"]: i.message });
          return false;
        }
        this.setState({ [name + "Message"]: "" });
        return true;
      });
      return ret;
    };
    validFields = () => {};
    onChange = (e) => {
      const { name, value } = e.target;
      this.setState(
        {
          [name]: value,
        },
        () => this.validField(name)
      );
    };
    //包装
    getFieldDec = (field, option) => {
      console.log("--", option);

      this.options[field] = option;
      return (InputComp) => {
        return (
          <div>
            {React.cloneElement(InputComp, {
              name: field,
              value: this.state[field] || "",
              onChange: this.onChange,
            })}
            {<p>{this.state[field + "Message"]}</p>}
          </div>
        );
      };
    };
    render() {
      return (
        <div>
          <Comp {...this.props} validField={this.validField} getFieldDec={this.getFieldDec}></Comp>
        </div>
      );
    }
  };
}
@YFormCreate
class YformTest extends React.Component {
  confirm = () => {
    console.log("confirm");
  };
  render() {
    const { getFieldDec } = this.props;
    return (
      <div>
        {getFieldDec("user", { rules: [{ required: true, message: "please input" }] })(
          <input></input>
        )}
        <button onClick={this.confirm}>confirm</button>
      </div>
    );
  }
}
export default YformTest;
