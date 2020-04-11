import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "../../components/common/loading";
import connect from "react-redux/lib/connect/connect";
import "./router.css";
import { Link } from "react-router-dom";
import { Avatar } from "antd";

//引入组件
// const Index = Loadable({
//   loader: () => import("./index"),
//   loading: Loading
// }); //用户名
const Wealth = Loadable({
	loader: () => import("./wealth"),
	loading: Loading
}); //财富
const Material = Loadable({
	loader: () => import("./material"),
	loading: Loading
}); //资料
const Bind = Loadable({
	loader: () => import("./bind"),
	loading: Loading
}); //绑定
const Safe = Loadable({
	loader: () => import("./safe"),
	loading: Loading
}); //安全
const Setting = Loadable({
	loader: () => import("./setting"),
	loading: Loading
}); //个人设置

class UserRouter extends Component {
	render() {
		const { userInfo } = this.props; //用户信息
		return (
			<Fragment>
				{/* <!-- 变换部分 --> */}
				<div className="userCentre">
					{userInfo ? (
						<div className="treasure">
							{/* 用户 */}
							<div className="lawyer_left">
								{}
								<div className="my_userName">
									<div className="svatar">
										<Avatar
											size={60}
											icon="user"
											// style={{ height: "60px", width: "60px" }}
											src={userInfo.head_img}
										/>
									</div>
									<div className="user_region">
										<h3 style={{ color: "#333333", fontSize: "14px" }}>
											{userInfo.name}
										</h3>
										<span style={{ color: "#B3B3B3", fontSize: "12px" ,marginLeft:"20px"}}>
										{userInfo.city.name}
										</span>
										<span style={{ margin: "6px 6px 6px 6px" }}>|</span>
										<span style={{ color: "#B3B3B3", fontSize: "12px" }}>
											{userInfo.type_plan}
										</span>
									</div>
									<div className="myoperation">
										<span
											style={{
												marginLeft: "37px",
												fontSize: "12px",
												color: "#333333"
											}}
										>
											关注
										</span>
										<span className="wire4"></span>
										<p style={{ marginLeft: "41px", color: "#4586FF" }}>11</p>
									</div>
									<div className="myoperation">
										<span
											style={{
												marginLeft: "17px",
												fontSize: "12px",
												color: "#333333"
											}}
										>
											粉丝
										</span>
										<span className="wire5"></span>
										<p style={{ marginLeft: "18px", color: "#4586FF" }}>132</p>
									</div>
									<div className="myoperation">
										<span
											style={{
												marginLeft: "13px",
												fontSize: "12px",
												color: "#333333"
											}}
										>
											律文
										</span>
										<p style={{ marginLeft: "19px", color: "#4586FF" }}>23</p>
									</div>
									<div className="myoperation">
										<span className="wire3"></span>
										<span
											style={{
												marginLeft: "17px",
												fontSize: "12px",
												color: "#333333"
											}}
										>
											协同
										</span>
										<p style={{ marginLeft: "25px", color: "#4586FF" }}>23</p>
									</div>
								</div>

								{/* 菜单切换部分 */}
								<div className="classiFication">
									<div className="my_comment">
										<Link to="/user/wealth" style={{ color: "#333333" }}>
											<p
												style={{
													marginLeft: "30px",
													fontSize: "14px",
													fontWeight: "bold"
												}}
											>
												财富
											</p>
										</Link>
									</div>
									<div className="my_law">
										<Link to="/user/material" style={{ color: "#333333" }}>
											<p
												style={{
													marginLeft: "30px",
													fontSize: "14px",
													fontWeight: "bold"
												}}
											>
												账号与资料
											</p>
										</Link>
									</div>
									<div className="my_collect">
										<Link to="/user/safe" style={{ color: "#333333" }}>
											<p
												style={{
													marginLeft: "30px",
													fontSize: "14px",
													fontWeight: "bold"
												}}
											>
												账号安全
											</p>
										</Link>
									</div>
									<div className="my_fans">
										<Link to="/user/bind" style={{ color: "#333333" }}>
											<p
												style={{
													marginLeft: "30px",
													fontSize: "14px",
													fontWeight: "bold"
												}}
											>
												账户绑定
											</p>
										</Link>
									</div>
									<div className="my_keep">
										<Link to="/user/setting" style={{ color: "#333333" }}>
											<p
												style={{
													marginLeft: "30px",
													fontSize: "14px",
													fontWeight: "bold"
												}}
											>
												个人设置
											</p>
										</Link>
									</div>
								</div>
								<div style={{ clear: "both" }}></div>
							</div>
							<Switch>
								{/* <Route exact path="/user/index" component={Index} />
              <Redirect exact from="/user" to="/user/index" /> */}
								<Route path="/user/wealth" component={Wealth} />
								<Route path="/user/bind" component={Bind} />
								<Route path="/user/safe" component={Safe} />
								<Route path="/user/setting" component={Setting} />
								<Route path="/user/material" component={Material} />
							</Switch>
						</div>
					) : null}
				</div>
			</Fragment>
		);
	}
}
const mapState = state => {
	return {
		userInfo: state.getIn(["header", "userInfo"]) //用户信息
	};
};

//添加仓库
UserRouter = connect(mapState, null)(UserRouter);

export default UserRouter;
