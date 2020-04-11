import React, { Component, Fragment } from "react";
import "./router.css";
import {Link, Route, Switch} from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "../../components/common/loading";

//引入组件
const Identity = Loadable({
	loader: () => import("./identity"),
	loading: Loading
}); //认证页面
const ReIdentity = Loadable({
  loader: () => import("./reidentity"),
  loading: Loading
}); //重新认证页面
const Await = Loadable({
	loader: () => import("./await"),
	loading: Loading
}); //认证状态页面
class UserRouter extends Component {
	render() {
		return (
			<Fragment>
        {/* 头部 */}
        <div className="suceessheader">
          {/* login图片 */}
          <div className="logins_imgs2">
            <Link to="/login/normal">
              <img
                src={require("../../statics/images/logo/web_logo.png")}
                alt=""
              />
            </Link>
            <span className="hxs2">|</span>
            <span className="loginsccesss">律师认证</span>
          </div>
        </div>
				{/* <!-- 左边变换部分 --> */}
				<Switch>
					<Route path="/auth/identity" component={Identity} />
          <Route path="/auth/reidentity" component={ReIdentity} />
					<Route path="/auth/await" component={Await} />
				</Switch>
			</Fragment>
		);
	}
}

export default UserRouter;
