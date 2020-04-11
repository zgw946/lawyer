import React, { Component } from "react";
import "./index.css";
import { changePopupBox } from "../../../components/layout/popup/actionCreators";
import { getUserInfo } from "../../../components/layout/header/actionCreators";
import connect from "react-redux/es/connect/connect";
//账户资料
import { Form, Input, Avatar, Button, Radio, message } from "antd";
import { myRequest } from "../../../function";

class Index extends Component {
	// state = {
	// 	headImg: "", //律师头像
	// 	name: "", //律师姓名
	// 	sex: 0, //性别
	// 	idCard: "", //身份证号码
	// 	licenseNo: "", //执业证号
	// 	typePlan: "", //身份类型
	// 	address: "", //办公地址
	// 	office: "", //执业律师
	// 	introduction: "", //自我介绍
	// 	mobile: "", //手机号码
	// 	email: "", //邮箱
	// 	tel: "" //座机
	// };
	constructor(props) {
		super(props);

		this.state = {
			headImg: "", //律师头像
			name: "", //律师姓名
			sex: 0, //性别
			idCard: "", //身份证号码
			licenseNo: "", //执业证号
			typePlan: "", //身份类型
			address: "", //办公地址
			office: "", //执业律师
			introduction: "", //自我介绍
			mobile: "", //手机号码
			email: "", //邮箱
			tel: "" //座机
		};

		//获取用户详细信息
		this.getUserDetail();
	}
	//获取用户详细信息
	getUserDetail() {
		let that = this;
		myRequest({
			method: "get",
			path: "/lawyer/user/index/detail",
			auth: true,
			callback: function(response) {
				if (response.data.code === 0) {
					const data = response.data.data;
					that.setState({
						headImg: data.head_img.url,
						name: data.name,
						sex: data.user.sex,
						idCard: data.id_card,
						licenseNo: data.license_no,
						typePlan: data.type_plan,
						address: data.address,
						office: data.office,
						introduction: data.introduction,
						mobile: data.user.mobile,
						email: data.user.email,
						tel: data.tel
					});
				}
			}
		});
	}

	//更新性别
	changeSex(e) {
		this.setState(
			{
				sex: e.target.value
			},
			() => {
				this.updateInfo("sex");
			}
		);
	}

	//更新律师信息
	updateInfo(column) {
		let that = this,
			data = {};

		switch (column) {
			case "sex": //修改性别
				data.sex = that.state.sex;
				break;

			case "introduction":
				data.introduction = that.props.form.getFieldValue("introduction");
				break;

			case "email":
				data.email = that.props.form.getFieldValue("email");
				break;

			case "tel":
				data.tel = that.props.form.getFieldValue("tel");
				break;

			default:
				return;
		}
		myRequest({
			method: "put",
			path: "/lawyer/user/index/info",
			auth: true,
			data,
			callback: function(response) {
				if (response.data.code !== 0) {
					message.error(response.data.msg, 1);
				}
			}
		});
	}

	componentWillReceiveProps(props) {
		console.log(props);
		console.log(props.showBox !== this.props.showBox);

		//关闭弹窗后重新获取用户列表信息
		if (props.showBox !== this.props.showBox) {
			// 更新用户信息
			console.log(1112222111);

			this.getUserDetail();
		} 
		// console.log(1111111);

		// this.props.getUserInfo();
	}
	componentDidMount() {
		this.getUserDetail();
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="my_information">
				<Form className="login-form">
					{/* 基本信息 */}
					<div className="essential_information">
						<div className="myde_essential">
							<span className="diamonds"></span>
							<h2 style={{ marginLeft: "25px" }}>基本信息</h2>
						</div>
						{/* 头像内容 */}
						<div className="my_days">
							<Avatar
								src={this.state.headImg}
								style={{ marginLeft: "18px" }}
								shape="square"
								size={64}
								icon="user"
							/>
							<Button
								onClick={() =>
									this.props.changePopupBox([{ type: "head_image" }])
								}
								style={{
									backgroundColor: "#fcfcfc",
									color: "#333",
									position: "absolute",
									left: "105px"
								}}
							>
								更改头像
							</Button>
							<Form
								style={{ marginLeft: "11px" }}
								labelCol={{ span: 2 }}
								wrapperCol={{ span: 15 }}
							>
								<Form.Item
									label="姓名"
									style={{
										color: "#333",
										fontSize: "16px",
										margin: "10px 0px 10px 0px"
									}}
								>
									<p
										style={{
											color: "#333",
											fontSize: "14px",
											margin: "20px 0px 0px 20px"
										}}
									>
										{this.state.name}
									</p>
								</Form.Item>
								<Form.Item
									label="身份证"
									style={{
										color: "#333",
										fontSize: "16px",
										margin: "0px 0px 10px 0px"
									}}
								>
									<p
										style={{
											color: "#333",
											fontSize: "14px",
											margin: "20px 0px 0px 20px"
										}}
									>
										{this.state.idCard}
									</p>
								</Form.Item>
								<Form.Item
									label="性别"
									style={{
										color: "#333",
										fontSize: "16px",
										margin: "0px 0px 10px 0px"
									}}
								>
									{getFieldDecorator("sex", {
										initialValue: this.state.sex
									})(
										<Radio.Group
											onChange={e => this.changeSex(e)}
											style={{ margin: "8px 0px 0px 20px" }}
										>
											<Radio value={1}>男</Radio>
											<Radio value={2}>女</Radio>
										</Radio.Group>
									)}
								</Form.Item>
							</Form>
							<div style={{ clear: "both" }}></div>
						</div>
						<div style={{ clear: "both" }}></div>
					</div>
					{/* 律师信息 */}
					<div>
						<div className="myde_essential">
							<span className="diamonds"></span>
							<h2 style={{ marginLeft: "25px" }}>律师信息</h2>
						</div>
						{/* 内容输入部分 */}
						<Form
							style={{ marginLeft: "11px", marginTop: "20px" }}
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 15 }}
						>
							<Form.Item
								label="执业证号"
								style={{ color: "#333", margin: "0px 0px 10px 0px" }}
							>
								<p style={{ marginLeft: "20px", marginTop: "20px" }}>
									{this.state.licenseNo}
								</p>
							</Form.Item>

							<Form.Item
								label="身份类型"
								style={{ color: "#333", margin: "0px 0px 10px 0px" }}
							>
								<p style={{ marginLeft: "20px", marginTop: "20px" }}>
									{this.state.typePlan}
								</p>
							</Form.Item>
							<Form.Item
								label="办公地址"
								style={{ color: "#333", margin: "0px 0px 10px 0px" }}
							>
								<p style={{ marginLeft: "20px", marginTop: "20px" }}>
									{this.state.address}
								</p>
							</Form.Item>
							<Form.Item
								label="执业律所"
								style={{ color: "#333", margin: "0px 0px 10px 0px" }}
							>
								<p style={{ marginLeft: "20px", marginTop: "20px" }}>
									{this.state.office}
								</p>
							</Form.Item>

							<Form.Item
								label="简介"
								style={{
									color: "#333",
									fontSize: "16px",
									margin: "0px 0px 10px 0px"
								}}
							>
								{getFieldDecorator("introduction", {
									initialValue: this.state.introduction
								})(
									<Input.TextArea
										onBlur={() => this.updateInfo("introduction")}
										rows={2}
										style={{
											resize: "none",
											marginLeft: "20px",
											width: "500px"
										}}
										placeholder="请简单介绍"
									/>
								)}
							</Form.Item>
						</Form>
					</div>
					{/* 联系方式 */}
					<div>
						<div className="myde_essential">
							<span className="diamonds"></span>
							<h2 style={{ marginLeft: "25px" }}>联系方式</h2>
						</div>
						{/* 内容输入框 */}
						<Form
							style={{
								marginLeft: "11px",
								marginTop: "20px",
								marginBottom: "60px"
							}}
							labelCol={{ span: 2 }}
							wrapperCol={{ span: 15 }}
						>
							<Form.Item
								label="手机"
								style={{
									color: "#333",
									fontSize: "16px",
									margin: "0px 0px 10px 0px"
								}}
							>
								<p style={{ marginLeft: "20px", marginTop: "20px" }}>
									{this.state.mobile}
								</p>
							</Form.Item>
							<Form.Item
								label="邮箱"
								style={{
									color: "#333",
									fontSize: "16px",
									margin: "0px 0px 10px 0px"
								}}
							>
								{getFieldDecorator("email", {
									initialValue: this.state.email
								})(
									<Input
										onBlur={() => this.updateInfo("email")}
										style={{ width: "300px", margin: "5px 0px 0px 20px" }}
										placeholder="请填写所属的邮箱"
									/>
								)}
							</Form.Item>
							<Form.Item
								label="座机"
								style={{
									color: "#333",
									fontSize: "16px",
									margin: "0px 0px 10px 0px"
								}}
							>
								{getFieldDecorator("tel", {
									initialValue: this.state.tel
								})(
									<Input
										onBlur={() => this.updateInfo("tel")}
										style={{ width: "300px", margin: "5px 0px 0px 20px" }}
										placeholder="请填写所属的邮箱"
									/>
								)}
							</Form.Item>
						</Form>
						<div className="clears4"></div>
					</div>
					{/* 底部 */}
				</Form>
			</div>
		);
	}
}
const mapState = state => {
	return {
		showBox: state.getIn(["popup", "showBox"])
	};
};

const mapDispath = dispath => {
	return {
		//改变弹出框状态
		changePopupBox(info) {
			dispath(changePopupBox(info));
		},
		//设置用户信息
		getUserInfo() {
			dispath(getUserInfo());
		}
	};
};
//数据仓库
export default connect(mapState, mapDispath)(Form.create()(Index));
