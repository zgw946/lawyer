import React, { Component } from "react";
import "./index.css";
import {
	Button,
	Cascader,
	Form,
	Icon,
	Input,
	message,
	Select,
	Tag,
	Tooltip
} from "antd";
import { myRequest } from "../../../../function";
import moment from "moment";

//案件详情
class Index extends Component {
	state = {
		showAdd: false, // 是否显示添加额外字段表单
		name: "", //案件名称
		type: 0, //类型码
		typePlan: "", //类型
		status: 0, //状态码
		statusPlan: "", //状态
		litigant: "", //当事人
		describe: "", //案件描述
		created: "", //创建时间
		extra: {}, //额外内容
		editColumn: "", //正在编辑的字段
		allType: [], //所有案件类型
		editExtra: "" //正在编辑的额外字段
	};

	//选择要编辑的字段
	selectEditColumn(column) {
		//当column为空时说明需要提交修改字段
		if (!column) {
			let data = {};

			//判断需要修改的字段
			switch (this.state.editColumn) {
				case "name": //修改案件名称
					data.name = this.props.form.getFieldValue("name");
					break;
				case "litigant": //修改当事人
					data.litigant = this.props.form.getFieldValue("litigant");
					break;
				case "type": //修改案件类型
					const seleteType = this.props.form.getFieldValue("litigant");
					if (seleteType) {
						data.type = seleteType[seleteType.length - 1];
					}
					break;
				case "status": //修改状态
					data.status = this.props.form.getFieldValue("status");
					break;
				case "describe": //修改描述
					data.describe = this.props.form.getFieldValue("describe");
					break;
				default:
					return;
			}
			this.changeDetail(data);
		} else {
		}

		//修改字段
		this.setState(
			{
				editColumn: column
			},
			() => {
				if (column) {
					this.contentInput.focus();
				}
			}
		);
	}

	//添加额外字段
	addExtra() {
		const key = this.props.form.getFieldValue("key");
		const value = this.props.form.getFieldValue("value");

		if (!key) return;

		let extra = this.state.extra;
		extra[key] = value;

		extra = JSON.stringify(extra);

		this.changeDetail({ extra });

		this.setState({
			showAdd: false
		});
	}

	//控制添加额外字段表单的显示隐藏
	handleAddBox(status) {
		this.setState({ showAdd: status });
	}

	//修改额外字段
	editExtra(key, formKey = "") {
		let extra = this.state.extra;

		if (formKey) {
			extra[this.state.editExtra] = this.props.form.getFieldValue(formKey);

			extra = JSON.stringify(extra);

			this.changeDetail({ extra });
		}

		this.setState({
			editExtra: key
		});
	}

	//删除额外字段
	deleteExtra(key) {
		let extra = this.state.extra;

		delete extra[key];

		extra = JSON.stringify(extra);

		this.changeDetail({ extra });
	}

	//修改案件详情
	changeDetail(data) {
		const that = this,
			id = this.props.caseId;
		myRequest({
			method: "put",
			path: "/lawyer/efficiency/my_case/index/" + id,
			auth: true,
			data,
			callback: function(response) {
				//处理返回结果
				if (response.data.code !== 0) {
					message.error(response.data.msg);
				} else {
					that.getDetail();
				}
			}
		});
	}

	//获取案件详情
	getDetail() {
		const that = this;

		const id = this.props.caseId; //案件ID

		myRequest({
			method: "get",
			path: "/lawyer/efficiency/my_case/index/" + id,
			auth: true,
			callback: function(response) {
				//处理返回结果
				if (response.data.code !== 0) {
					message.error(response.data.msg);
				} else {
					const data = response.data.data;

					that.setState({
						name: data.name,
						type: data.type,
						typePlan: data.type_plan,
						status: data.status,
						statusPlan: data.status_plan,
						litigant: data.litigant,
						describe: data.describe,
						created: data.created,
						extra: data.extra
					});
				}
			}
		});
	}

	//获取所有案件类型
	getAllType() {
		//如果全部类型为空则需要从服务器拉取数据
		if (this.state.allType.length <= 0) {
			const that = this;
			myRequest({
				method: "get",
				path: "/common/type",
				callback: function(response) {
					//处理返回结果
					if (response.data.code === 0) {
						that.setState({
							allType: response.data.data
						});
					}
				}
			});
		}
	}

	//初始化组件
	componentDidMount() {
		this.getDetail();
		this.getAllType();
	}

	render() {
		//带标签表单布局
		const formItemLayout = {
			labelCol: {
				xs: { span: 8 },
				sm: { span: 4 }
			},
			wrapperCol: {
				xs: { span: 20 },
				sm: { span: 18 }
			}
		};

		//表单验证器
		const { getFieldDecorator } = this.props.form;

		return (
			<div className="particulars pt30">
				<Form>
					<Form.Item
						{...formItemLayout}
						label={
							<span style={{ fontSize: 14 }}>
								<Icon
									onClick={() => this.selectEditColumn("name")}
									type="edit"
								/>
								&nbsp; 案件名称
							</span>
						}
					>
						{this.state.editColumn === "name" ? (
							getFieldDecorator("name", {
								rules: [{ required: true, message: "请输入案件名称" }],
								initialValue: this.state.name
							})(
								<Input
									ref={refs => (this.contentInput = refs)}
									onBlur={() => this.selectEditColumn("")}
								/>
							)
						) : (
							<p className="line-h40">{this.state.name}</p>
						)}
					</Form.Item>
					<Form.Item
						{...formItemLayout}
						label={
							<span style={{ fontSize: 14 }}>
								<Icon
									onClick={() => this.selectEditColumn("litigant")}
									type="edit"
								/>
								&nbsp; 当事人
							</span>
						}
					>
						{this.state.editColumn === "litigant" ? (
							getFieldDecorator("litigant", {
								rules: [{ required: true, message: "请输入当事人" }],
								initialValue: this.state.litigant
							})(
								<Input
									style={{ width: 300 }}
									onBlur={() => this.selectEditColumn("")}
									ref={refs => (this.contentInput = refs)}
								/>
							)
						) : (
							<p className="line-h40">{this.state.litigant}</p>
						)}
					</Form.Item>
					<Form.Item
						{...formItemLayout}
						label={
							<span style={{ fontSize: 14 }}>
								<Icon
									onClick={() => this.selectEditColumn("type")}
									type="edit"
								/>
								&nbsp; 案件类型
							</span>
						}
					>
						{this.state.editColumn === "type" ? (
							getFieldDecorator("type", {
								rules: [{ required: true, message: "请选择案件类型" }],
								initialValue: [this.state.type]
							})(
								<Cascader
									ref={refs => (this.contentInput = refs)}
									style={{ width: 200 }}
									onChange={() => this.selectEditColumn("")}
									options={this.state.allType}
									fieldNames={{
										label: "name",
										value: "id",
										children: "children"
									}}
									changeOnSelect
									placeholder="请选择案件类型"
								/>
							)
						) : (
							<Tag className="mt10" color="#2db7f5">
								{this.state.typePlan}
							</Tag>
						)}
					</Form.Item>
					<Form.Item
						{...formItemLayout}
						label={
							<span style={{ fontSize: 14 }}>
								<Icon
									onClick={() => this.selectEditColumn("status")}
									type="edit"
								/>
								&nbsp; 案件状态
							</span>
						}
					>
						{this.state.editColumn === "status" ? (
							getFieldDecorator("status", {
								rules: [{ required: true, message: "请选择案件状态" }],
								initialValue: this.state.status
							})(
								<Select
									ref={refs => (this.contentInput = refs)}
									style={{ width: 200 }}
									onChange={() => this.selectEditColumn("")}
									onBlur={() => this.selectEditColumn("")}
								>
									<Select.Option value={1}>立案</Select.Option>
									<Select.Option value={2}>诉前联调</Select.Option>
									<Select.Option value={3}>一审</Select.Option>
									<Select.Option value={4}>二审</Select.Option>
									<Select.Option value={5}>结案</Select.Option>
									<Select.Option value={6}>执行</Select.Option>
								</Select>
							)
						) : (
							<Tag className="mt10" color="green">
								{this.state.statusPlan}
							</Tag>
						)}
					</Form.Item>
					<Form.Item
						{...formItemLayout}
						label={
							<span style={{ fontSize: 14 }}>
								<Icon
									onClick={() => this.selectEditColumn("describe")}
									type="edit"
								/>
								&nbsp; 备注
							</span>
						}
					>
						{this.state.editColumn === "describe" ? (
							getFieldDecorator("describe", {
								initialValue: this.state.describe
							})(
								<Input.TextArea
									ref={refs => (this.contentInput = refs)}
									rows={5}
									onBlur={() => this.selectEditColumn("")}
								/>
							)
						) : (
							<p style={{ wordBreak: "break-word" }} className="line-h40">
								{this.state.describe}
							</p>
						)}
					</Form.Item>
					<Form.Item {...formItemLayout} label="创建时间">
						<p className="line-h40">
							{moment(this.state.created).format("YYYY-MM-DD HH:mm")}
						</p>
					</Form.Item>
					{Object.keys(this.state.extra).map((name, index) => (
						<Form.Item
							key={index}
							{...formItemLayout}
							label={
								<span style={{ fontSize: 14 }}>
									<Tooltip title={"删除" + name}>
										<Icon
											onClick={() => this.deleteExtra(name)}
											type="delete"
											className="mr5 c-ff4949"
										/>
									</Tooltip>
									<Icon onClick={() => this.editExtra(name)} type="edit" />
									&nbsp;
									{name}
								</span>
							}
						>
							{this.state.editExtra === name ? (
								getFieldDecorator("extra" + index, {
									initialValue: this.state.extra[name]
								})(
									<Input
										style={{ width: 300 }}
										onBlur={() => this.editExtra("", "extra" + index)}
										ref={refs => (this.contentInput = refs)}
									/>
								)
							) : (
								<p className="line-h40">{this.state.extra[name]}</p>
							)}
						</Form.Item>
					))}
					<div className="name_aj">
						<Button
							onClick={() => this.handleAddBox(true)}
							size="small"
							style={{
								backgroundColor: "#393e46",
								color: "#fff",
								border: "#393e46"
							}}
						>
							添加内容
						</Button>
						<div style={{ margin: "10px 0px 0px 15px" }}>
							{this.state.showAdd ? (
								<div className="edit_input">
									{getFieldDecorator("key", {
										rules: [{ required: true, message: "请输入标题" }]
									})(
										<Input
											placeholder="请输入你的标题"
											className="time_input"
										/>
									)}

									{getFieldDecorator(
										"value",
										{}
									)(
										<Input
											placeholder="请输入相关内容"
											style={{ margin: "10px 15px 0px 9px", width: "628px" }}
										/>
									)}

									<div style={{ float: "right", margin: "10px 10px 0px 0px" }}>
										<Button
											onClick={() => this.handleAddBox(false)}
											size="small"
											style={{
												backgroundColor: "#D2D3D6",
												color: "#fff",
												border: "#D2D3D6",
												marginRight: "15px"
											}}
										>
											取消
										</Button>
										<Button
											onClick={() => this.addExtra()}
											size="small"
											style={{
												backgroundColor: "#393e46",
												color: "#fff",
												border: "#393e46"
											}}
										>
											添加
										</Button>
									</div>
								</div>
							) : null}
						</div>
					</div>
				</Form>
			</div>
		);
	}
}

Index = Form.create()(Index);

export default Index;
