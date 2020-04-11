import React, { Component, Fragment } from "react";
// 引入路由
import { Link, withRouter } from "react-router-dom";
import "./index.css";
// antd
import { Menu, Icon, Avatar, Dropdown, Modal, message, Spin } from "antd";
import { changePopupBox } from "../popup/actionCreators";
import {
	changeLocation,
	getUserInfo,
	changemyLocation
} from "../header/actionCreators";
import connect from "react-redux/lib/connect/connect";
import {
	clearToken,
	myRequest,
	getLocalStorage,
	setLocalStorage
} from "../../../function";

class Header extends Component {
	state = {
		selecteds: "", //当前选中菜单
		loginStatus: false // 登录状态
	};

	render() {
		const { userInfo } = this.props; //用户信息
		return (
			<Fragment>
				<div className="headers">
					{/* {
						userInfo(

						):(
							null
						)
					} */}
					<div className="header_container">
						<div className="headers_left">
							{/* login图片 */}
							<Link to="/">
								<div className="logins_img">
									<img
										width="100%"
										height="100%"
										src={require("../../../statics/images/logo/web_logo2.png")}
										alt=""
									/>
								</div>
							</Link>
							{/* 边线 */}
							<div className="bianxian" />
							{/* 城市定位 */}
							<div className="citys">
								<i className="glyphicon glyphicon-map-marker icons_citys"></i>
								<span
									className="dingweiss"
									onClick={() =>
										this.props.changePopupBox([{ type: "location" }])
									}
								>
									{this.props.locations.city ? (
										<Fragment>{this.props.locations.city.name}</Fragment>
									) : (
										<Spin size="small" />
									)}
									{/* {this.props.myLocation.city ? (
										<Fragment>{this.props.myLocation.city.name}</Fragment>
									) : (
										<Spin size="small" />
									)} */}
								</span>
							</div>
						</div>
						{/* 导航 咨询，介绍，法律广场 */}
						<div className="headers_center">
							<Menu
								style={{
									backgroundColor: "#2e3341",
									borderBottom: 0,
									color: "#fff",
									margin: "0 auto",
									width: "460px"
								}}
								selectedKeys={[this.state.selecteds]}
								mode="horizontal"
							>
								<Menu.Item key="home">
									<Link to="/home" style={{ color: "#fff" }}>
										首页
									</Link>
								</Menu.Item>
								<Menu.Item key="dynamic">
									<Link to="/dynamic" style={{ color: "#fff" }}>
										最新动态
									</Link>
								</Menu.Item>
								<Menu.Item key="case_center">
									<Link to="/case_center/index">办案中心</Link>
								</Menu.Item>
								<Menu.Item key="open">
									<Link to="/open/index" style={{ color: "#fff" }}>
										法律广场
									</Link>
								</Menu.Item>
								<Menu.Item key="circle">
									<Link to="/circle" style={{ color: "#fff" }}>
										律师圈
									</Link>
								</Menu.Item>
							</Menu>
						</div>
						{userInfo ? (
							<div className="headers_right">
								<div className="myrf">
									{/* 网盘 */}
									<Link to="/sky_drive/index">
										<img
											className="wp"
											src={require("../../../statics/images/导航/icon_yun.png")}
											alt=""
										/>
									</Link>
									{/* 日程安排 */}
									<Icon
										onClick={() =>
											this.props.changePopupBox([{ type: "schedule" }])
										}
										type="calendar"
										className="shouTiems"
										style={{ color: "#fff" }}
									/>
									{/* 用户中心 */}
									<Dropdown
										overlay={
											<Menu>
												<Menu.Item className="meunitem">
													<Link to="/user_index">{userInfo.name}</Link>
												</Menu.Item>
												<Menu.Item className="meunitem">
													<Link to="/user/wealth">财富</Link>
												</Menu.Item>
												<Menu.Item className="meunitem">
													<Link to="/user/material">账号与资料</Link>
												</Menu.Item>
												<Menu.Item className="meunitem">
													<Link to="/user/bind">账号绑定</Link>
												</Menu.Item>
												<Menu.Item className="meunitem">
													<Link to="/user/safe">账号安全</Link>
												</Menu.Item>
												<Menu.Item className="meunitem">
													<Link to="/user/setting">个人设置</Link>
												</Menu.Item>
												<Menu.Item onClick={() => this.logout()}>
													退出账号
												</Menu.Item>
											</Menu>
										}
										placement="bottomLeft"
									>
										<Avatar
											size={30}
											icon="user"
											style={{ marginTop: "-11px" }}
											src={userInfo.head_img}
										/>
									</Dropdown>
								</div>
							</div>
						) : null}
					</div>
				</div>
			</Fragment>
		);
	}

	//根据url设置选中菜单
	setNav(pathName) {
		let params = pathName.split("/");
		this.setState({
			selecteds: params[1]
		});
	}
	componentWillReceiveProps(props) {
		this.setNav(props.location.pathname);
	}
	//退出登录
	logout() {
		let that = this;
		Modal.confirm({
			title: "登出",
			content: "确认登出系统吗？",
			cancelText: "取消",
			okText: "确定",
			onOk: () => {
				//提交请求
				myRequest({
					method: "delete",
					path: "/common/auth/logout",
					auth: true,
					callback: function(response) {
						//处理返回结果
						if (response.data.code === 0) {
							that.props.history.push("/login/normal");
							//清除用户信息
							clearToken();
						} else {
							message.error(response.data.msg, 2);
						}
					}
				});
			}
		});
	}
	//初始化选择的地区
	initArea() {
		let location = getLocalStorage("location"); // 存储
		//查看缓存是否存在地区信息
		if (location) {
			this.props.changeLocation(location);
		} else {
			//通过IP查询当前地区
			let that = this;
			myRequest({
				method: "get",
				path: "/common/location/auto_location_from_ip",
				auth: true,
				callback: function(response) {
					//处理返回结果
					if (response.data.code === 0) {
						//储存当前位置到本地
						setLocalStorage("location", response.data.data);
						//改变当前位置
						that.props.changeLocation(response.data.data);
					}
				}
			});
		}
	}
	componentDidMount() {
		this.setNav(this.props.location.pathname);
		this.initArea();
		this.props.getUserInfo();
	}
}
const mapState = state => {
	return {
		userInfo: state.getIn(["header", "userInfo"]), //用户信息
		locations: state.getIn(["header", "location"]), //当前位置
		myLocation: state.getIn(["header", "mylocation"]) //我的位置
	};
};
const mapDispath = dispath => {
	return {
		//改变弹出框状态
		changePopupBox(info) {
			dispath(changePopupBox(info));
		},
		//修改当前位置
		changeLocation(value) {
			dispath(changeLocation(value));
		},
		//获取用户信息
		getUserInfo(value) {
			dispath(getUserInfo(value));
		},
		//我的位置
		changemyLocation(value) {
			dispath(changemyLocation(value));
		}
	};
};

//添加仓库
Header = connect(mapState, mapDispath)(Header);
//添加路由信息
Header = withRouter(Header);

export default Header;
