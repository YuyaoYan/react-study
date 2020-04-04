import React from "react";
// import Mock from "./components/Mock";
// import HookMock from "./components/Hook-Mock";
// import EffectHook from "./components/EffectHook";
// import JSXTest from "./components/JXSTest";
import { Clock, ClockFun } from "./components/StateMGt";
import EventHandle from "./components/EventHandle";
import ContextTest from "./components/ContextTest";
import HocTest from "./components/HocTest";
import Composition from "./components/Composition";
import ContextTestUpGrade from "./components/ContextTest_upgrade";
import CompositionUpgrade from "./components/Composition_upgrade";
import HooksTest from "./components/HooksTest"
import HooksTestUpgrade from "./components/HooksTest_upgrade"
import FruitsText from './components/FruitsText'
//挂载 Mock

function App() {
  return (
    <div className="App">
      {/* <Mock />
      <HookMock />
      <EffectHook /> */}
      {/* <JSXTest></JSXTest> */}
      {/* <Clock change={(change) => console.log("change", change)}></Clock> */}
      {/* <ClockFun change={(change) => console.log("change", change)}></ClockFun> */}
      {/* <EventHandle></EventHandle> */}
      {/* <ContextTest></ContextTest> */}
      {/* <HocTest></HocTest> */}
      {/* <Composition></Composition> */}
      {/* <ContextTestUpGrade></ContextTestUpGrade> */}
      {/* <CompositionUpgrade></CompositionUpgrade> */}
      {/* <HooksTest></HooksTest> */}
      <HooksTestUpgrade></HooksTestUpgrade>
      <FruitsText></FruitsText>
    </div>
  );
}

export default App;
