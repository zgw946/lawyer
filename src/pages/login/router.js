import React, { Component, Fragment } from "react";
import "./router.css";
import { Link, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "../../components/common/loading";
//引入组件
const Normal = Loadable({
	loader: () => import("./normal"),
	loading: Loading
}); //常规登录
const Wx = Loadable({
	loader: () => import("./wx"),
	loading: Loading
}); //微信登录
const ResetPassword = Loadable({
	loader: () => import("./reset_password"),
	loading: Loading
}); //重置密码
const PreIdentity = Loadable({
  loader: () => import("./pre_identity"),
  loading: Loading
}); //认证前置页面

class LoginRouter extends Component {
	render() {
		return (
			<Fragment>
				<div>
					{/* 头部 */}
					<div className="auth_headers">
						{/* login图片 */}
						<div className="auth_logins_img">
							<Link to="/">
								<img
									src={require("../../statics/images/logo/web_logo.png")}
									alt=""
								/>
							</Link>
							<span className="hx">|</span>
							<span className="auth_logins">登录</span>
						</div>
					</div>
					<div className="mymj_imgs">
						{/* 背景图 */}
						<img
							className="bj_imgs"
							src={require("../../statics/images/背景/background3.png")}
							alt=""
						/>
					</div>
					<div style={{ width: 970 }}>
						{/* 路由 */}
						<div className="tab_login">
							<Switch>
								<Route path="/login/normal" component={Normal} />
								<Route path="/login/wx" component={Wx} />
								<Route path="/login/reset_password" component={ResetPassword}/>
                <Route path="/login/pre_identity" component={PreIdentity}/>
							</Switch>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default LoginRouter;
