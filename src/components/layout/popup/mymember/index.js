import React, { PureComponent } from "react";
import "./index.css";
import { Form, message, Modal } from "antd";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";
import { Input, Button } from "antd";
import { myRequest } from "../../../../function";

//移动或复制文件
class Index extends PureComponent {
	state = {
		loading: false, //是否提交中
		disabledBtn: false, //是否使按钮失效
		leftTime: 120 //重置按钮剩余时间
	};

	//新增成员
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let that = this;
				//改变提交按钮状态
				that.setState({
					loading: true
				});
				//提交请求
				myRequest({
					method: "post",
					path: "/lawyer/efficiency/my_case/member/" + this.props.caseId,
					data: {
						mobile: values.mobile
					},
					auth: true,
					callback: function(response) {
						//改变提交按钮状态
						that.setState({
							loading: false
						});
						//处理返回结果
						if (response.data.code !== 0) {
							message.error(response.data.msg, 2);
						} else {
							// 跳转
							message.success("邀请成功，请耐心等待对方接受", 1);
							that.props.changePopupBox([{ type: that.props.popupType }]);
						}
					}
				});
			}
		});
	};
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
						user_type: 1,
						code_type: 2
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
		//改变按钮状态
		this.setState({
			disabledBtn: true
		});
		let that = this; //赋值父类

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
	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Modal
				style={{ marginTop: "70px" }}
				width={450}
				destroyOnClose={true}
				footer={null}
				onCancel={() =>
					this.props.changePopupBox([{ type: this.props.popupType }])
				}
				visible={true}
			>
				<Form
					onSubmit={this.handleSubmit}
					// className="login-form"
					labelCol={{ span: 5 }}
					wrapperCol={{ span: 18 }}
				>
					<div>
						<h3 className="invitename">邀请成员</h3>
					</div>
					<Form.Item label="手机号码">
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
					<Form.Item label="验证码">
						{getFieldDecorator("code", {
							rules: [
								{ required: true, message: "请输入验证码" },
								{ len: 6, message: "验证码长度必须为6" }
							]
						})(
							<Input
								type="mobile"
								style={{ width: "200px" }}
								placeholder="请输入验证码"
							/>
						)}

						{this.state.disabledBtn ? (
							<Button
								style={{
									fontSize: "12px",
									backgroundColor: "#fff",
									color: "#ccc",
									position: "absolute",
									top: "-7px",
									left: "205px"
								}}
							>
								{this.state.leftTime}秒后可获取
							</Button>
						) : (
							<Button
								style={{
									fontSize: "12px",
									backgroundColor: "#fff",
									color: "#ccc",
									position: "absolute",
									top: "-7px",
									left: "205px"
								}}
								onClick={() => this.sendCode()}
							>
								获取验证码
							</Button>
						)}
					</Form.Item>
					<div className="amount">
						<Button
							htmlType="submit"
							style={{
								backgroundColor: "#2e3341",
								color: "#FFF",
								marginRight: "5px"
							}}
						>
							确认
						</Button>
						<Button
							onClick={() => this.props.changePopupBox([{ type: "mymember" }])}
							style={{
								backgroundColor: "#666",
								color: "#FFF",
								marginLeft: "5px"
							}}
						>
							取消
						</Button>
					</div>
				</Form>
			</Modal>
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

//数据仓库
Index = connect(null, mapDispath)(Index);

//添加表单
Index = Form.create()(Index);

export default Index;
