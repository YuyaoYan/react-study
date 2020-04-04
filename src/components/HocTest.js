// 高阶组件
import React from "react";
function Lesson(props) {
  return (
    <div>
      {props.stage} - {props.title}
    </div>
  );
}
// 模拟数据
const lessons = [
  { stage: "React", title: "核心API" },
  { stage: "React", title: "组件化1" },
  { stage: "React", title: "组件化2" }
];
//Lesson是样式
//withContent是逻辑  Comp是传入的组件  props是传入的参数
//LessonWithContent 相当于把样式和逻辑组合起来的组合体，然后直接调用就可以了
const withContent = (Comp) => (props) => {
  const content = lessons[props.idx];
  return <Comp {...content} />;
};
const withLog = (Comp) => {
  return class extends React.Component {
    componentDidMount(){
      console.log(this,this.props)
    }
    render(){
      return <Comp />
    }
  };
};
const LessonWithContent = withLog(withContent(Lesson));

export default function HocTest() {
  return (
    <div>
      {[0, 0, 0].map((item, idx) => (
        <LessonWithContent idx={idx} key={idx} />
      ))}
    </div>
  );
}

