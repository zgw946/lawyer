import React, { Component, Fragment } from "react";
import {
	Input,
	Button,
	Tabs,
	Icon,
	Form,
	Row,
	Col,
	Modal,
	message
} from "antd";
import "./index.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { myRequest, setLocalStorage } from "../../../function";

const { TabPane } = Tabs;

//常规登录页面
class Index extends Component {
	state = {
		disabledBtn: false, //是否使按钮失效
		leftTime: 120, //重置按钮剩余时间
		type: "code", //登录方式(登录方式有'password'、'code')
		loginLoading: false //登录按钮是否为加载状态
	};
	//选择登录方式
	selectLoginType(type) {
		this.setState({
			type
		});
	}
	//发送验证码
	sendCode() {
		//验证账号
		this.props.form.validateFields(["mobile"], (err, values) => {
			let that = this; //赋值父类
			//验证成功发送请求
			if (!err) {
				let form = this.props.form;
				myRequest({
					method: "post",
					path: "/common/message/send",
					data: {
						mobile: values.mobile,
						user_type: 2, //律师
						code_type: 1 //登录/注册
					},
					callback: function(response) {
						//处理返回结果
						if (response.data.code !== 0) {
							//错误提示
							form.setFields({
								code: {
									errors: [new Error(response.data.msg)]
								}
							});
						} else {
							//关闭错误提示
							form.setFields({
								code: {}
							});

							//改变按钮状态
							that.setState(
								{
									disabledBtn: true
								},
								() => {
									//实时改变按钮状态
									let interval = setInterval(() => {
										let left = that.state.leftTime - 1;

										that.setState({
											leftTime: left
										});

										//如果间隔时间小于0，重置按钮
										if (that.state.leftTime <= 0) {
											//清楚定时器
											clearInterval(interval);

											that.setState({
												disabledBtn: false,
												leftTime: 120
											});
										}
									}, 1000);
								}
							);

							//测试环境直接弹窗显示验证码
							if (response.data.data) {
								Modal.success({
									title: "验证码",
									content: response.data.data.code
								});
							}
						}
					}
				});
			}
		});
	}

	//登录/注册
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let that = this;
				//改变提交按钮状态
				that.setState({
					loginLoading: true
				});
				let path = "",
					data = {
						mobile: values.mobile,
						user_type: 2 //律师
					};
				//根据不同的登录类型作出相应的操作
				if (that.state.type === "code") {
					//验证码登录或注册
					path = "/common/auth/code_login_or_register";
					//设置参数
					data.code = values.code;
				} else {
					//密码登录
					path = "/common/auth/login";
					data.password = values.password;
				}
				//提交请求
				myRequest({
					method: "post",
					path,
					data,
					callback: function(response) {
						//改变提交按钮状态
						that.setState({
							loginLoading: false
						});
						//处理返回结果
						if (response.data.code !== 0) {
							message.error(response.data.msg, 2);
						} else {
							//储存认证令牌
							setLocalStorage("api_token", response.data.data.token);
							// 跳转
							message.success("登录成功", 1);
							that.toIdentity();
						}
					}
				});
			}
		});
	};

	//前往认证
	toIdentity() {
		let that = this;

		// 判断是几种状态 （0[未认证],1[待审核],2[认证通过],3[认证不通过]）
		myRequest({
			method: "get",
			path: "/common/lawyer/identification/is_identity",
			auth: true,
			callback: function(response) {
				//处理返回结果
				if (response.data.code !== 0) {
					message.error(response.data.msg);
				} else {
					const status = response.data.data.status;

					switch (status) {
						case 0: //1[未认证]
							that.props.history.push("/login/pre_identity");
							break;
						case 2: //2[认证通过]
							that.props.history.push("/home");
							break;
						default:
							//待审核/认证不通过
							that.props.history.push("/auth/await");
							break;
					}
				}
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Fragment>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Tabs
						defaultActiveKey="code"
						forceRender
						onChange={activeKey => this.selectLoginType(activeKey)}
					>
						<TabPane tab="短信登录/注册" key="code" />
						<TabPane tab="密码登录" key="password" />
					</Tabs>
					<Form.Item>
						{getFieldDecorator("mobile", {
							rules: [
								{ required: true, message: "请输入手机号码" },
								{
									pattern: "^[1][3,4,5,7,8][0-9]{9}$",
									message: "用户名必须为手机号码"
								}
							]
						})(<Input type="text" placeholder="请输入手机号码" />)}
					</Form.Item>
					{this.state.type === "code" ? (
						<Form.Item>
							<Row gutter={8}>
								<Col span={17}>
									{getFieldDecorator("code", {
										rules: [
											{ required: true, message: "请输入验证码" },
											{ len: 6, message: "验证码长度必须为6" }
										]
									})(
										<Input
											className="mb10"
											prefix={
												<Icon
													type="mobile"
													style={{ color: "rgba(0,0,0,.25)" }}
												/>
											}
											placeholder="短信验证码"
										/>
									)}
								</Col>
								<Col span={7}>
									{this.state.disabledBtn ? (
										<Button
											className="get-captcha"
											style={{ width: "100%" }}
											disabled={true}
										>
											{this.state.leftTime}
											<span style={{ fontSize: "12px" }}>秒后获取</span>
										</Button>
									) : (
										<Button
											className="get-captcha"
											style={{ width: "100%" }}
											onClick={() => this.sendCode()}
										>
											获取验证码
										</Button>
									)}
								</Col>
							</Row>
						</Form.Item>
					) : (
						<Form.Item hasFeedback>
							{getFieldDecorator("password", {
								rules: [
									{ required: true, message: "请输入密码" },
									{ min: 8, message: "密码长度必须大于8" }
								]
							})(<Input type="password" placeholder="请输入密码" />)}
						</Form.Item>
					)}

					<Button
						htmlType="submit"
						style={{ width: "100%", marginTop: 30 }}
						type="primary"
					>
						{this.state.type === "code" ? "登录/注册" : "登录"}
					</Button>
				</Form>
				<div className="h50">
					<Link className="rf mt5 c-ccc" to="/login/reset_password">
						忘记密码
					</Link>
				</div>
				<div className="login_lu">
					<span className="hxs3"></span>
					<span className="dsf">第三方登录</span>
					<span className="hxs"></span>
				</div>
				<div
					className="yuandian"
					onClick={() => {
						message.warn("功能暂未开放，敬请期待！");
					}}
				>
					<Icon className="iconev" type="wechat" />
				</div>
			</Fragment>
		);
	}
}

//添加表单
Index = Form.create()(Index);
//添加路由
Index = withRouter(Index);

export default Index;
