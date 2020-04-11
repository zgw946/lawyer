import React, { Component, Fragment } from "react";
import "./index.css";
import { Button, Col, Form, Icon, Input, Row, Modal, message } from "antd";
import { Link } from "react-router-dom";
import { myRequest } from "../../../function";

//重置密码
class Index extends Component {
	state = {
		disabledBtn: false, //是否使按钮失效
		leftTime: 120, //重置按钮剩余时间
		finishFirst: false, //是否完成了第一步
		keys: "", // key
		loading: false //是否在加载中
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Fragment>
				<Link to="/login/normal">
					<Icon type="left" />
				</Link>
				<p className="tac f17px">找回密码</p>
				<Form onSubmit={this.handleSubmit} className="login-form">
					{this.state.finishFirst ? (
						<Fragment>
							<Form.Item
								hasFeedback
								extra="2-20位，仅支持汉字字母数字和下划线，不能有空格"
								style={{
									color: "#333",
									fontSize: "16px",
									margin: "0px 0px 0px 0px",
									boxSizing: "content-box"
								}}
							>
								{getFieldDecorator("password", {
									rules: [
										{ required: true, message: "请输入新密码" },
										{ min: 8, message: "密码长度至少为8" },
										{ validator: this.validateToNextPassword }
									]
								})(
									<Input.Password
										placeholder="请输入新的密码"
										type="password"
									/>
								)}
							</Form.Item>
							<Form.Item
								hasFeedback
								style={{
									color: "#333",
									fontSize: "16px",
									margin: "11px 0px 15px 0px"
								}}
							>
								{getFieldDecorator("confirm_password", {
									rules: [
										{ required: true, message: "请再次输入密码" },
										{ min: 8, message: "密码长度至少为8" },
										{ validator: this.compareToFirstPassword }
									]
								})(
									<Input.Password
										placeholder="请再次输入密码"
										type="password"
									/>
								)}
							</Form.Item>
						</Fragment>
					) : (
						<Fragment>
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
												<span style={{ fontSize: "12px" }}>秒后可获取</span>
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
						</Fragment>
					)}
					<Button
						htmlType="submit"
						style={{ width: "100%", marginTop: 30 }}
						type="primary"
						loading={this.state.loading}
					>
						{this.state.finishFirst ? "提交" : "下一步"}
					</Button>
				</Form>
			</Fragment>
		);
	}
	//发送验证码
	sendCode() {
		//验证账号
		this.props.form.validateFields(["mobile"], (err, values) => {
			let that = this;
			// 验证成功发送请求
			if (!err) {
				let form = this.props.form;
				myRequest({
					method: "post",
					path: "/common/message/send",
					data: {
						mobile: values.mobile,
						user_type: 2, //律师用户
						code_type: 2 //重置密码
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
							//关闭错误的提示
							form.setFields({
								code: {}
							});
							//改变按钮状态
							that.setState({
								disabledBtn: true
							});
							that.changeBtn(); //发送验证码改变按钮
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
	//改变按钮状态
	changeBtn() {
		let that = this;
		//实时改变按钮状态
		let interval = setInterval(() => {
			let left = that.state.leftTime - 1;
			that.setState({
				leftTime: left
			});
			//如果间隔时间小于0，重置按钮
			if (this.state.leftTime <= 0) {
				//清楚定时器
				clearInterval(interval);
				this.setState({
					disabledBtn: false,
					leftTime: 120
				});
			}
		}, 1000);
	}

	//校验确认密码是否与密码一致
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue("password")) {
			callback("密码输入不一致");
		} else {
			callback();
		}
	};
	//改变密码后再次判断两次输入密码是否一致
	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (
			form.getFieldValue("confirm_password") &&
			value !== form.getFieldValue("confirm_password")
		) {
			form.validateFields(["confirm_password"], { force: true });
		} else {
			//关闭错误提示
			form.setFields({
				confirm_password: {
					value: form.getFieldValue("confirm_password")
				}
			});
		}
		callback();
	};

	//提交表单
	handleSubmit = e => {
		e.preventDefault();

		//判断第一步是否完成，如果是则利用第一步获取的key修改密码，否则则需要在第一步获取key
		if (this.state.finishFirst) {
			this.props.form.validateFields(
				["password", "confirm_password"],
				(err, values) => {
					if (!err) {
						//修改按钮状态
						this.setState({ loading: true });

						let that = this;
						//提交请求
						myRequest({
							method: "post",
							path: "/common/auth/reset_password",
							data: {
								password: values.password,
								key: this.state.keys
							},
							callback: function(response) {
								that.setState({ loading: false });
								//处理返回结果
								if (response.data.code === 0) {
									message.success("修改成功");
									// 成功后跳转回登入页面
									that.props.history.push("/login/normal");
								} else {
									message.error(response.data.msg);
								}
							}
						});
					}
				}
			);
		} else {
			this.props.form.validateFields(["mobile", "code"], (err, values) => {
				if (!err) {
					//修改按钮状态
					this.setState({ loading: true });

					let that = this;
					myRequest({
						method: "post",
						path: "/common/auth/get_reset_password_key",
						data: {
							mobile: values.mobile,
							code: values.code,
							user_type: 2 //律师
						},
						callback: function(response) {
							that.setState({ loading: false });

							if (response.data.code === 0) {
								that.setState({
									keys: response.data.data.key,
									finishFirst: true
								});
							}
						}
					});
				}
			});
		}
	};
}

//添加表单
Index = Form.create()(Index);

export default Index;
