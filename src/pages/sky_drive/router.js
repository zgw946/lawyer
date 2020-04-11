import React, { Component, Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "../../components/common/loading";
import "./router.css";

//引入组件
const Index = Loadable({
  loader: () => import("./index"),
  loading: Loading
}); //我的网盘
const Bin = Loadable({
  loader: () => import("./bin"),
  loading: Loading
}); //回收站

class CircleRouter extends Component {
  render() {
    return (
      <Fragment>
        <div className="networks">
          {/* <!-- 变换部分 --> */}
          <Switch>
            <Route exact path="/sky_drive/index" component={Index} />
            <Redirect exact from="/sky_drive" to="/sky_drive/index" />
            <Route path="/sky_drive/bin" component={Bin} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default CircleRouter;
