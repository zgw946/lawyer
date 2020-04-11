import React, { Component, Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "../../components/common/loading";
import "./router.css";

//引入组件
const Index = Loadable({
  loader: () => import("./index"),
  loading: Loading
}); //个人主页
const Case = Loadable({
  loader: () => import("./case"),
  loading: Loading
}); //我的案例
const Reply = Loadable({
  loader: () => import("./reply"),
  loading: Loading
}); //问题解答

class CircleRouter extends Component {
  render() {
    return (
      <Fragment>
        {/* <!-- 变换部分 --> */}
        <Switch>
          <Route path="/homepage/index" component={Index} />
          <Redirect exact from="/homepage" to="/homepage/index" />
          <Route path="homepage/case" component={Case} />
          <Route path="homepage/reply" component={Reply} />
        </Switch>
      </Fragment>
    );
  }
}

export default CircleRouter;
