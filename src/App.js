import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import store from "./store"; //数据仓库
import Loadable from "react-loadable";
import Loading from "../src/components/common/loading";
import { getLocalStorage } from "./function";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";

// 引入组件
const Header = Loadable({
	loader: () => import("./components/layout/header"),
	loading: Loading
}); //头部
const Popup = Loadable({
	loader: () => import("./components/layout/popup"),
	loading: Loading
}); //弹出框
const Index = Loadable({
	loader: () => import("./pages/index"),
	loading: Loading
}); //未登录首页
const Home = Loadable({
	loader: () => import("./pages/home"),
	loading: Loading
}); //登录后首页
const AuthRouter = Loadable({
	loader: () => import("./pages/auth/router"),
	loading: Loading
}); //身份认证
const LoginRouter = Loadable({
	loader: () => import("./pages/login/router"),
	loading: Loading
}); //login登录
const Dynamic = Loadable({
	loader: () => import("./pages/dynamic"),
	loading: Loading
}); //最新动态
const CaseCenterRouter = Loadable({
	loader: () => import("./pages/case_center/router"),
	loading: Loading
}); //办案中心
const CircleRouter = Loadable({
	loader: () => import("./pages/circle/router"),
	loading: Loading
}); //律师圈
const OpenRouter = Loadable({
	loader: () => import("./pages/open/router"),
	loading: Loading
}); //法律广场
const SkyDriveRouter = Loadable({
	loader: () => import("./pages/sky_drive/router"),
	loading: Loading
}); //云盘
const HomepageRouter = Loadable({
	loader: () => import("./pages/homepage/router"),
	loading: Loading
}); //个人主页
const UserRouter = Loadable({
	loader: () => import("./pages/user/router"),
	loading: Loading
}); //用户中心
const UserIndex = Loadable({
	loader: () => import("./pages/user_index"),
	loading: Loading
}); //用户中心
const Pay = Loadable({
	loader: () => import("./pages/pay"),
	loading: Loading
}); //支付

class App extends Component {

	render() {
		return (
			<Provider store={store}>
				<Router>
					<Route
						path="/"
						render={() => (
							<Fragment>
								<Switch>
									<Route exact path="/" component={Index} />
									<Route
										path="/auth"
										render={() =>
											getLocalStorage("api_token") ? (
												<Route component={AuthRouter} />
											) : (
												<Redirect to="/login/normal" />
											)
										}
									/>
									<Route path="/login" component={LoginRouter} />

									<Route
										render={() => (
											<Fragment>
												<Header />
												<Popup />
												<Switch>
													<Route
														path="/dynamic"
														render={() =>
															getLocalStorage("api_token") ? (
																<Route component={Dynamic} />
															) : (
																<Redirect to="/login/normal" />
															)
														}
													/>
														{/* <Route path="/dynamic" component={Dynamic} /> */}
													<Route path="/home" component={Home} />
													<Route
														path="/case_center"
														render={() =>
															getLocalStorage("api_token") ? (
																<Route component={CaseCenterRouter} />
															) : (
																<Redirect to="/login/normal" />
															)
														}
													/>
													<Route
														path="/circle"
														render={() =>
															getLocalStorage("api_token") ? (
																<Route component={CircleRouter} />
															) : (
																<Redirect to="/login/normal" />
															)
														}
													/>
													<Route
														path="/open"
														render={() =>
															getLocalStorage("api_token") ? (
																<Route component={OpenRouter} />
															) : (
																<Redirect to="/login/normal" />
															)
														}
													/>
													<Route
														path="/sky_drive"
														render={() =>
															getLocalStorage("api_token") ? (
																<Route component={SkyDriveRouter} />
															) : (
																<Redirect to="/login/normal" />
															)
														}
													/>
													<Route path="/homepage" component={HomepageRouter} />
													<Route
														path="/user"
														render={() =>
															getLocalStorage("api_token") ? (
																<Route component={UserRouter} />
															) : (
																<Redirect to="/login/normal" />
															)
														}
													/>
													<Route
														path="/pay"
														render={() =>
															getLocalStorage("api_token") ? (
																<Route component={Pay} />
															) : (
																<Redirect to="/login/normal" />
															)
														}
													/>
													<Route
														path="/user_index"
														render={() =>
															getLocalStorage("api_token") ? (
																<Route component={UserIndex} />
															) : (
																<Redirect to="/login/normal" />
															)
														}
													/>
												</Switch>
											</Fragment>
										)}
									/>
								</Switch>
							</Fragment>
						)}
					/>
				</Router>
			</Provider>
		);
	}
}

export default App;
