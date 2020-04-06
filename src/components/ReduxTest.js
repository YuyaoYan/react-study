import React from "react";
import store from "./../components/store";
export default class ReduxTest extends React.Component {
  render() {
    return <div>{store.getState()}</div>;
  }
}
