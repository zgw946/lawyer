import React, { Component, Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "../../components/common/loading";
import { changePopupBox } from "../../components/layout/popup/actionCreators";
import connect from "react-redux/es/connect/connect";
import { Link } from "react-router-dom";
import "./router.css";
import { Avatar, Button } from "antd";
//引入组件
const Index = Loadable({
	loader: () => import("./index"),
	loading: Loading
}); //律圈首页
const Mine = Loadable({
	loader: () => import("./mine"),
	loading: Loading
}); //我发布的律圈
const Collect = Loadable({
	loader: () => import("./collect"),
	loading: Loading
}); //我收藏的律圈
const Follow = Loadable({
	loader: () => import("./follow"),
	loading: Loading
}); //我关注的律师
const Fans = Loadable({
	loader: () => import("./fans"),
	loading: Loading
}); //我的粉丝
const FLawarticleans = Loadable({
	loader: () => import("./Law_article"),
	loading: Loading
}); //律文详细

class CircleRouter extends Component {
	render() {
		return (
			<Fragment>
				<div className="bagcors">
					<div className="lawyer_circle">
						{/* 用户 */}
						<div className="lawyer_left">
							<div className="my_userName">
								<div className="svatar">
									<Avatar
										style={{ height: "60px", width: "60px" }}
										src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
									/>
								</div>
								<div className="user_region">
									<h3 style={{ color: "#333333", fontSize: "14px" }}>用户名</h3>
									<span style={{ color: "#B3B3B3", fontSize: "12px" }}>
										广东深圳
									</span>
									<span style={{ margin: "6px" }}>|</span>
									<span style={{ color: "#B3B3B3", fontSize: "12px" }}>
										律师
									</span>
								</div>
								<div className="myoperation">
									<span
										style={{
											marginLeft: "30px",
											fontSize: "12px",
											color: "#333333"
										}}
									>
										我的编文
									</span>
									<span className="wire"></span>
									<p style={{ marginLeft: "42px", color: "#4586FF" }}>101</p>
								</div>
								<div className="myoperation">
									<span
										style={{
											marginLeft: "15px",
											fontSize: "12px",
											color: "#333333"
										}}
									>
										我的关注
									</span>
									<span className="wire2"></span>
									<p style={{ marginLeft: "25px", color: "#4586FF" }}>132</p>
								</div>
								<div className="myoperation">
									<span
										style={{
											marginLeft: "15px",
											fontSize: "12px",
											color: "#333333"
										}}
									>
										我的粉丝
									</span>
									<p style={{ marginLeft: "25px", color: "#4586FF" }}>23</p>
								</div>
							</div>
							{/* 菜单切换部分 */}
							<div className="classiFication">
								<div className="my_comment">
									<Link to="/circle/index" style={{ color: "#333333" }}>
										<p
											style={{
												marginLeft: "30px",
												fontSize: "14px",
												fontWeight: "bold"
											}}
										>
											新的评论
										</p>
									</Link>
								</div>
								<div className="my_law">
									<Link to="/circle/mine" style={{ color: "#333333" }}>
										<p
											style={{
												marginLeft: "30px",
												fontSize: "14px",
												fontWeight: "bold"
											}}
										>
											我的律文
										</p>
									</Link>
								</div>
								<div className="my_collect">
									<Link to="/circle/collect" style={{ color: "#333333" }}>
										<p
											style={{
												marginLeft: "30px",
												fontSize: "14px",
												fontWeight: "bold"
											}}
										>
											我的收藏
										</p>
									</Link>
								</div>
								<div className="my_fans">
									<Link to="/circle/fans" style={{ color: "#333333" }}>
										<p
											style={{
												marginLeft: "30px",
												fontSize: "14px",
												fontWeight: "bold"
											}}
										>
											我的粉丝
										</p>
									</Link>
								</div>
								<div className="my_keep">
									<Link to="/circle/follow" style={{ color: "#333333" }}>
										<p
											style={{
												marginLeft: "30px",
												fontSize: "14px",
												fontWeight: "bold"
											}}
										>
											我的关注
										</p>
									</Link>
								</div>
							</div>
							<div style={{ marginTop: "20px" }}>
								<Button
									onClick={() =>
										this.props.changePopupBox([{ type: "publish" }])
									}
									style={{
										width: "240px",
										height: "50px",
										backgroundColor: "#2e3341",
										color: "#ffffff",
										borderRadius: "8px"
									}}
								>
									发表律文
								</Button>
							</div>
						</div>
						{/* <!-- 左边变换部分 --> */}
						<Switch>
							<Route exact path="/circle/index" component={Index} />
							<Redirect exact from="/circle" to="/circle/index" />
							<Route path="/circle/mine" component={Mine} />
							<Route path="/circle/collect" component={Collect} />
							<Route path="/circle/follow" component={Follow} />
							<Route path="/circle/fans" component={Fans} />
							<Route path="/circle/Law_article" component={FLawarticleans} />
						</Switch>
					</div>
					<div className="clears"></div>
				</div>
				<div className="clears"></div>
			</Fragment>
		);
	}
}
const mapDispath = dispath => {
	return {
		//改变弹出框状态
		changePopupBox(info) {
			dispath(changePopupBox(info));
		}
	};
};

export default connect(null, mapDispath)(CircleRouter);

// export default CircleRouter;
