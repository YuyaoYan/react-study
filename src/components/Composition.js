import React from "react";
function Dialog(props) {
  // 备选消息
  const messages = {
    foo: { footer: "foo", content: "foo~", header: "header~" },
    bar: { footer: "bar", content: "bar~" }
  };
  //因为props.children传入的是回调函数，所以要执行一下，回调函数接收的参数是{ header, footer }，所以传入参数messages[props.msg]，传入参数后执行这段函数：({ header: <div>{header}</div>, footer: <div>{footer}</div> })，返回一个对象，对象的格式为{header:<div>,footer:<div>}，所以可以通过下面的函数解构出来，每一个解构出来的值例如header，都是一个生成好的DOM，所以才能直接通过下方的return展示出来。
  const { header, footer } = props.children(messages[props.msg]);
  console.log("footer", footer, props.children(messages[props.msg]));
  // 执行函数获得要显示的内容
  return (
    <div style={{ border: "1px solid pink" }}>
      {header}
      {footer}
    </div>
  );
}
export default function Composition() {
  return (
    <div>
      <Dialog msg="foo">
        {({ header, footer }) => ({ header: <div>{header}</div>, footer: <div>{footer}</div> })}
      </Dialog>
    </div>
  );
}
