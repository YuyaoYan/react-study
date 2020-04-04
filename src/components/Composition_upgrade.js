import React from "react";
function Radio({ children, ...rest }) {
  return (
    <div>
      <label>
        <input type="radio" {...rest} />
        {children}
      </label>
    </div>
  );
}
function RadioGroup(props) {
  return (
    <div>
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, { name: props.name });
      })}
    </div>
  );
}
export default function CompositionUpgrade() {
  return (
    <div>
      <RadioGroup name="mvvm">
        <Radio value="vue">vue</Radio>
        <Radio value="vue">vue</Radio>
        <Radio value="vue">vue</Radio>
        <Radio value="vue">vue</Radio>
      </RadioGroup>
    </div>
  );
}
