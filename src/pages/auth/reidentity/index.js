import React, { Component, Fragment } from "react";
import "./index.css";
import { DOMAIN } from "../../../constant";
import { withRouter } from "react-router-dom";
import { myRequest } from "../../../function";
import {
	Input,
	Upload,
	Icon,
	Checkbox,
	Button,
	Form,
	Modal,
	Cascader,
	message,
	Radio
} from "antd";
class Index extends Component {
	state = {
		loading: false,
		region: "", // 地区
		previewVisible: false, //身份证是否显示预览
		previewImage: "", //身份证预览的图片
		hasUpload: 0, // 身份证已经上传的图片数量
		practicingNum: 0, //执业证已经上传的图片数量
		certificationNum: 0, //资格证已经上传的图片数量
		againstFileNum: 0, //反面
		type: 1, //律师类型
		realName: "", //真实姓名
		idCard: "", //身份证号码
		idCardFront: [], //身份证正面
		idCardBack: [], //身份证反面
		province: 0, //省份
		city: 0, //城市
		area: 0, //区/县
		address: "", //详细地址
		office: "", //律师事务所
		licenseNo: "", //执业证号
		license: [] //执业证
	};

	//获取律师认证信息
	getIdentityInfo() {
		let that = this;
		myRequest({
			method: "get",
			path: "/common/lawyer/identification",
			auth: true,
			callback: function(response) {
				if (response.data.code === 0) {
					const data = response.data.data;

					that.setState({
						realName: data.name,
						idCard: data.id_card,
						idCardFront: data.id_card_front
							? [
									{
										uid: data.id_card_front.id,
										url: data.id_card_front.url
									}
							  ]
							: [],
						hasUpload: 1,
						idCardBack: data.id_card_back
							? [
									{
										uid: data.id_card_back.id,
										url: data.id_card_back.url
									}
							  ]
							: [],
						againstFileNum: 1,
						type: data.type,
						province: data.province.id,
						city: data.city.id,
						area: data.area.id,
						address: data.address,
						office: data.office,
						licenseNo: data.license_no,
						license: data.license
							? [
									{
										uid: data.license.id,
										url: data.license.url
									}
							  ]
							: [],
						practicingNum: 1,

						certificationNum: 1
					});
				} else {
					message.error(response.data.msg);
				}
			}
		});
	}

	// 身份证
	normFile(e) {
		this.setState({
			hasUpload: e.fileList.length
		});
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	}
	// 身份证反面
	againstPreview(e) {
		this.setState({
			againstFileNum: e.fileList.length
		});
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	}
	// 执业证
	practicingFile(e) {
		this.setState({
			practicingNum: e.fileList.length
		});

		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	}
	// 资格证
	certificationFile(e) {
		this.setState({
			certificationNum: e.fileList.length
		});

		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	}
	//关闭预览
	cancelPreview() {
		this.setState({
			previewVisible: false
		});
	}
	//预览图片
	changePreview(file) {
		this.setState({
			previewVisible: true,
			previewImage: file.url || file.thumbUrl
		});
	}
	// 获取选择的地区
	getRegion() {
		let that = this;
		myRequest({
			method: "get",
			path: "/common/location/all_area",
			callback: function(response) {
				if (response.data.code === 0) {
					that.setState({
						region: response.data.data
					});
				}
			}
		});
	}
	// 提交验证
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				//律师证正面ID
				let id_card_front;
				if (
					values.id_card_front[0].response &&
					values.id_card_front[0].response.code === 0
				) {
					id_card_front = values.id_card_front[0].response.data.id;
				} else {
					id_card_front = values.id_card_front[0].uid;
				}

				//律师证反面ID
				let id_card_back;
				if (
					values.id_card_back[0].response &&
					values.id_card_back[0].response.code === 0
				) {
					id_card_back = values.id_card_back[0].response.data.id;
				} else {
					id_card_back = values.id_card_back[0].uid;
				}

				//执业证id
				let license;
				if (
					values.license[0].response &&
					values.license[0].response.code === 0
				) {
					license = values.license[0].response.data.id;
				} else {
					license = values.license[0].uid;
				}

				//判断是否勾选了相关协议
				if (!values.permit) {
					message.error("请勾选相关协议");
					return;
				}

				//改变提交按钮状态
				this.setState({
					loading: true
				});

				let that = this;

				// 提交请求
				myRequest({
					method: "put",
					path: "/common/lawyer/identification",
					auth: true,
					data: {
						type: values.type,
						real_name: values.real_name, // 姓名
						id_card: values.id_card, //身份证号码
						id_card_front, // 身份证正面
						id_card_back, // 身份证反面
						province: values.regions[0], // 执业证省份ID
						city: values.regions[1], // 执业证城市ID
						area: values.regions[2], // 执业区ID
						address: values.address, // 详细地址
						office: values.office, // 执业律所
						license_no: values.license_no, // 执业证号
						license // 执业证ID
					},
					callback: function(response) {
						//处理返回结果
						if (response.data.code === 0) {
							message.success("提交成功,请耐心等待审核");

							// 提交后跳转到待审核页面
							that.props.history.push("/auth/await");
						} else {
							message.error(response.data.msg);
						}
					}
				});
			}
		});
	};
	componentDidMount() {
		this.getRegion(); // 地区
		this.getIdentityInfo();
	}

	//改变律师类型
	onChangeType(e) {
		this.setState({ type: e.target.value });
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const uploadButton = (
			<div className="uploadButton">
				<span className="sf_hx"></span>
				<span className="sf_hx2"></span>
				<span className="sf_hx3"></span>
				<Icon
					className="uploadIcon"
					type="plus-circle"
					theme="filled"
					style={{ fontSize: "30px", color: "#4586FF" }}
				/>
				<Icon type="user" className="type_user" />
			</div>
		);

		//根据类型改变证件名称
		let licenseName = this.state.type === 1 ? "执业证号" : "实习证号";

		return (
			<Fragment>
				<div style={{ margin: "0 auto", width: 1200 }}>
					<Fragment>
						<Form
							labelCol={{ span: 5 }}
							wrapperCol={{ span: 19 }}
							onSubmit={this.handleSubmit}
							style={{ marginLeft: 170 }}
						>
							<Form.Item style={{ marginBottom: "5px" }}>
								<p
									style={{ marginBottom: "5px" }}
									className="sf_authentications"
								>
									身份信息
								</p>
								<p className="jx_authentications">
									进行身份证时验证请确保身份信息准确
								</p>
							</Form.Item>
							<Form.Item label="真实姓名" style={{ marginBottom: "15px" }}>
								{getFieldDecorator("real_name", {
									rules: [{ required: true, message: "请输入您的真实姓名" }],
									initialValue: this.state.realName
								})(
									<Input
										style={{ width: "500px" }}
										placeholder="请输入您的真实姓名"
									/>
								)}
							</Form.Item>
							<Form.Item label="身份证号" style={{ marginBottom: "15px" }}>
								{getFieldDecorator("id_card", {
									rules: [
										{ required: true, message: "请输入您的身份证号码" },
										{
											pattern:
												"^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$|^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$",
											message: "身份证号码格式有误"
										}
									],
									initialValue: this.state.idCard
								})(
									<Input
										style={{ width: "500px" }}
										placeholder="请输入您的身份证号码"
									/>
								)}
							</Form.Item>
							<div style={{ display: "flex" }}>
								<Form.Item
									label="证件照片"
									style={{ margin: "0px 0px 15px 140px", display: "flex",width:"300px"  }}
								>
									{/* 身份证正面 */}
									<div
										style={{
											margin: "0px 0px 0px 12px",
											float: "left",
											width: "156px"
										}}
									>
										{getFieldDecorator("id_card_front", {
											valuePropName: "fileList",
											getValueFromEvent: e => this.normFile(e),
											rules: [
												{
													required: true,
													message: "请上传身份证正面"
												}
											],
											initialValue: this.state.idCardFront
										})(
											<Upload
												accect="image/*"
												action={DOMAIN + "/common/file/upload"}
												name="file"
												listType="picture-card"
												onPreview={file => this.changePreview(file)}
											>
												{this.state.hasUpload >= 1 ? null : uploadButton}
											</Upload>
										)}
										<Modal
											visible={this.state.previewVisible}
											footer={null}
											onCancel={this.cancelPreview.bind(this)}
										>
											<img
												alt="show"
												style={{ width: "100%" }}
												src={this.state.previewImage}
											/>
										</Modal>
									</div>
								</Form.Item>
								<Form.Item style={{width:"300px" }}>
									{/* 反面 */}
									{getFieldDecorator("id_card_back", {
										valuePropName: "fileList",
										getValueFromEvent: e => this.againstPreview(e),
										rules: [
											{
												required: true,
												message: "请上传身份证反面"
											}
										],
										initialValue: this.state.idCardBack
									})(
										<Upload
											accect="image/*"
											action={DOMAIN + "/common/file/upload"}
											name="file"
											listType="picture-card"
											onPreview={file => this.changePreview(file)}
										>
											{this.state.againstFileNum >= 1 ? null : uploadButton}
										</Upload>
									)}
									<Modal
										visible={this.state.previewVisible}
										footer={null}
										onCancel={this.cancelPreview.bind(this)}
									>
										<img
											alt="show"
											style={{ width: "100%" }}
											src={this.state.previewImage}
										/>
									</Modal>
								</Form.Item>
							</div>

							{/* 律师身份认证 */}
							<div style={{ marginTop: "20px" }}>
								<Form.Item style={{ marginBottom: "15px" }}>
									<p
										style={{ marginBottom: "5px" }}
										className="sf_authentications"
									>
										律师信息
									</p>
									<p className="jx_authentications">
										请确保律师信息与相关证件信息一致
									</p>
								</Form.Item>
								<Form.Item label="律师类型" style={{ marginBottom: "15px" }}>
									{getFieldDecorator("type", {
										rules: [{ required: true, message: "请选择律师类型" }],
										initialValue: this.state.type
									})(
										<Radio.Group onChange={e => this.onChangeType(e)}>
											<Radio.Button value={1}>律师</Radio.Button>
											<Radio.Button value={2}>实习律师</Radio.Button>
										</Radio.Group>
									)}
								</Form.Item>
								<Form.Item label="地区选择" style={{ marginBottom: "15px" }}>
									{getFieldDecorator("regions", {
										rules: [{ required: true, message: "请选择地区" }],
										initialValue: [
											this.state.province,
											this.state.city,
											this.state.area
										]
									})(
										<Cascader
											fieldNames={{
												value: "id",
												label: "name",
												children: "children"
											}}
											options={this.state.region}
											style={{ width: "500px" }}
											placeholder="请选择地区"
										/>
									)}
								</Form.Item>
								<Form.Item label="详细地址" style={{ marginBottom: "15px" }}>
									{getFieldDecorator("address", {
										rules: [{ required: true, message: "请填写详细地址" }],
										initialValue: this.state.address
									})(
										<Input
											style={{ width: "500px" }}
											placeholder="请填写详细地址"
										/>
									)}
								</Form.Item>
								<Form.Item label="律师事务所" style={{ marginBottom: "15px" }}>
									{getFieldDecorator("office", {
										rules: [
											{ required: true, message: "请填写所在的律师事务所" }
										],
										initialValue: this.state.office
									})(
										<Input
											style={{ width: "500px" }}
											placeholder="请填写所在的律师事务所"
										/>
									)}
								</Form.Item>
								<Form.Item label={licenseName} style={{ marginBottom: "15px" }}>
									{getFieldDecorator("license_no", {
										rules: [
											{ required: true, message: "请填写" + licenseName }
										],
										initialValue: this.state.licenseNo
									})(
										<Input
											style={{ width: "500px" }}
											placeholder={"请填写" + licenseName}
										/>
									)}
								</Form.Item>
								<Form.Item label={licenseName} style={{ marginBottom: "15px" }}>
									<div style={{ display: "flex" }}>
										{getFieldDecorator("license", {
											valuePropName: "fileList",
											getValueFromEvent: e => this.practicingFile(e),
											rules: [
												{ required: true, message: "请上传" + licenseName }
											],
											initialValue: this.state.license
										})(
											<Upload
												accect="image/*"
												action={DOMAIN + "/common/file/upload"}
												data={{ type: "image" }}
												name="file"
												listType="picture-card"
												onPreview={file2 => this.changePreview(file2)}
											>
												{this.state.practicingNum >= 1 ? null : (
													<div>
														<Icon type="plus" />
														<div className="ant-upload-text">{licenseName}</div>
													</div>
												)}
											</Upload>
										)}
										<Modal
											visible={this.state.previewVisible}
											footer={null}
											onCancel={this.cancelPreview.bind(this)}
										>
											<img
												alt="show"
												style={{ width: "100%" }}
												src={this.state.previewImage}
											/>
										</Modal>
									</div>
								</Form.Item>
							</div>
							<div style={{ clear: "both" }} />
							<div style={{ marginLeft: "120px" }}>
								<p className="information">
									1.请您上传相关的证件照片，确保照片清晰且每张照片大小不超过
									<span style={{ fontWeight: "bold" }}>3M</span>。
								</p>
								<p style={{ marginTop: "-15px" }} className="information">
									2.这些信息只有你才能看到请放心上传
								</p>
							</div>
							<Form.Item>
								{getFieldDecorator("permit", {
									rules: [{ required: true, message: "阅读并勾选相关协议" }],
									valuePropName: "checked",
									initialValue: true
								})(<Checkbox style={{ marginLeft: "296px" }} />)}
								<span style={{ marginLeft: "15px" }}>我已阅读</span>
								<span style={{ color: "#74a4ff" }}>《xxxx》</span>
								<span>内容</span>
							</Form.Item>
							<Form.Item>
								<Button
									htmlType="submit"
									loading={this.state.loading}
									style={{
										backgroundColor: "#2e3341",
										color: "#FFF",
										margin: "0 0px 20px 348px "
									}}
								>
									提交
								</Button>
							</Form.Item>
						</Form>
					</Fragment>
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
