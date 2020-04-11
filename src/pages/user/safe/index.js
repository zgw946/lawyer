import React, { Component, Fragment } from "react";
import "./index.css";
import { Form, Input, Tabs, Button, message } from "antd";
import { myRequest } from "../../../function";
const { TabPane } = Tabs;
//账户安全
class Index extends Component {
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
	//处理表单提交
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let that = this;
				//提交请求
				myRequest({
					method: "put",
					path: "/lawyer/user/index/update_pay_password",
					auth: true,
					data: {
						old_password: values.old_password,
						password: values.password,
						password_confirmation: values.confirm_password
					},
					callback: function(response) {
						//处理返回结果
						if (response.data.code === 0) {
							message.success("修改成功");
							//更新用户信息
							that.props.getUserInfo();
							that.props.changePopupBox([{ type: "update_password" }]);
						} else {
							message.error(response.data.msg);
						}
					}
				});
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Fragment>
				<div className="safetys">
					<Form
						onSubmit={this.handleSubmit}
						labelCol={{ span: 5 }}
						wrapperCol={{ span: 18 }}
					>
						<Tabs>
							<TabPane tab="登录密码" key="1">
								<Form
									style={{ marginLeft: "11px" }}
									labelCol={{ span: 2 }}
									wrapperCol={{ span: 15 }}
								>
									<Form.Item
										label="原始密码"
										style={{
											color: "#333",
											fontSize: "16px",
											margin: "0px 0px 15px 0px"
										}}
									>
										{getFieldDecorator("old_password", {
											rules: [
												{ required: true, message: "请输入旧密码" },
												{ min: 8, message: "密码长度至少为8" }
											]
										})(
											<Input
												style={{ width: "320px" }}
												placeholder="请输入旧密码"
												type="password"
											/>
										)}
									</Form.Item>
									<Form.Item
										label="新密码"
										style={{
											color: "#333",
											fontSize: "16px",
											margin: "0px 0px 15px 0px"
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
												style={{ width: "320px" }}
												placeholder="请输入新的密码"
												type="password"
											/>
										)}
									</Form.Item>
									<Form.Item
										label="确认密码"
										style={{
											color: "#333",
											fontSize: "16px",
											margin: "0px 0px 15px 0px"
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
												style={{ width: "320px" }}
												placeholder="请再次输入密码"
												type="password"
											/>
										)}
									</Form.Item>
									<Button
										htmlType="submit"
										style={{
											backgroundColor: "#2e3341",
											color: "#fff",
											margin: "18px 0px 10px 97px"
										}}
									>
										提交
									</Button>
								</Form>
							</TabPane>
							{/* 律师案例 */}
							{/*<TabPane tab="支付密码" key="2">*/}
							{/*<Form style={{ marginLeft: "11px" }} labelCol={{ span: 2 }} wrapperCol={{ span: 15 }}>*/}
							{/*<Form.Item label="原始密码" style={{ color: "#333", fontSize: "16px", margin: "0px 0px 15px 0px", }}>*/}
							{/*<Input style={{ width: "400px", marginLeft: "20px" }} placeholder="请输入原始密码" />*/}
							{/*</Form.Item>*/}
							{/*<Form.Item label="新密码" style={{ color: "#333", fontSize: "16px", margin: "0px 0px 15px 0px", }}>*/}
							{/*<Input style={{ width: "400px", marginLeft: "20px" }} placeholder="请输入6-20位密码" />*/}
							{/*</Form.Item>*/}
							{/*<Form.Item label="确认密码" style={{ color: "#333", fontSize: "16px", margin: "0px 0px 15px 0px", }}>*/}
							{/*<Input style={{ width: "400px", marginLeft: "20px" }} placeholder="确认密码与新密码一致" />*/}
							{/*</Form.Item>*/}
							{/*<Button style={{ backgroundColor: "#2e3341", color: "#fff", margin: "18px 0px 10px 97px" }}>保存</Button>*/}
							{/*</Form>*/}
							{/*</TabPane>*/}
						</Tabs>
					</Form>
				</div>
			</Fragment>
		);
	}
}

//数据仓库
export default Form.create()(Index);
