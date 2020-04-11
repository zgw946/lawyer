import React, { PureComponent, Fragment } from "react";
import "./index.css";
import {
	Modal,
	Button,
	Avatar,
	Icon,
	DatePicker,
	Tag,
	Input,
	Divider,
	Form,
	Tooltip,
	message
} from "antd";
// import TaskInputs from './task_input';
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";
import { myRequest } from "../../../../function";
import moment from "moment";
const { RangePicker } = DatePicker;
//案件任务详情
class Index extends PureComponent {
	state = {
		tags: [],
		size: "default",
		inputVisible: false,
		inputValue: "",
		case_name: "", //案件名称
		column_name: "", // 列名称
		status_plan: "", //完成状态
		title: "", // 标题
		name: "", // 创建者名称
		executorName: "", // 执行者名称
		priority_plan: "", // 优先级
		remark: "", // 备注
		subtask: false, // 添加子任务
		subtaskInput: "", //请输入子任务内容
		participant: [], // 参与者列表
		file: [], // 文件列表
		tag: [], // 我的标签
		children: [], // 子任务列表
		listLog: [] // 日志列表
	};
	handleSizeChange = e => {
		this.setState({ size: e.target.value });
	};
	// 获取任务日志
	tasklistLog() {
		let that = this;
		myRequest({
			method: "get",
			path:
				"/lawyer/efficiency/my_case/task/" + this.props.lawyerId + "/task_log",
			auth: true,
			callback: function(response) {
				console.log(response);
				//处理返回结果
				if (response.data.code === 0) {
					that.setState({
						listLog: response.data.data
					});
				}
			}
		});
	}
	// 获取任务详细
	taskDetail() {
		let that = this;
		myRequest({
			method: "get",
			path: "/lawyer/efficiency/my_case/task/" + this.props.lawyerId + "/task",
			auth: true,
			callback: function(response) {
				if (response.data.code === 0) {
					that.setState({
						case_name: response.data.data.case_name,
						column_name: response.data.data.column_name,
						title: response.data.data.title,
						priority_plan: response.data.data.priority_plan,
						remark: response.data.data.remark,
						participant: response.data.data.participant,
						tag: response.data.data.tag,
						children: response.data.data.children,
						file: response.data.data.file,
						name: response.data.data.founder.name,
						executorName: response.data.data.executor.name
					});
				}
			}
		});
	}
	showInput = () => {
		let that = this;
		myRequest({
			method: "post",
			path: "/lawyer/efficiency/my_case/task/tag",
			auth: true,
			data: {
				name: toString(this.state.inputValue)
			},
			callback: function(response) {
				//处理返回结果
				if (response.data.code === 0) {
					that.setState(
						{
							inputVisible: true
						},
						() => that.input.focus()
					);
				} else {
					message.error(response.data.msg);
				}
			}
		});
	};
	// tag标签
	handleClose = removedTag => {
		const tags = this.state.tags.filter(tag => tag !== removedTag);
		console.log(tags);
		this.setState({ tags });
	};
	handleInputChange = e => {
		this.setState({ inputValue: e.target.value });
	};

	handleInputConfirm = () => {
		const { inputValue } = this.state;
		let { tags } = this.state;
		if (inputValue && tags.indexOf(inputValue) === -1) {
			tags = [...tags, inputValue];
		}
		console.log(tags);
		this.setState({
			tags,
			inputVisible: false,
			inputValue: ""
		});
	};
	saveInputRef = input => (this.input = input);
	componentDidMount() {
		this.taskDetail(); // 获取任务详细
		this.tasklistLog(); // 日志列表
	}
	// 添加子任务输入
	taskInput(e) {
		this.setState({
			subtaskInput: e.target.value
		});
	}

	// 新增任务
	taskClick() {
		let that = this;
		myRequest({
			method: "post",
			path:
				"/lawyer/efficiency/my_case/task/" +
				this.props.lawyerId +
				"/child_task",
			auth: true,
			data: {
				title: that.state.subtaskInput
			},
			callback: function(response) {
				if (response.data.code === 0) {
					message.success("添加子任务成功");
				} else {
					message.error(response.data.msg);
				}
			}
		});
	}
	// 任务发送消息
	taskMessage() {
		let that = this;
		myRequest({
			method: "post",
			path:
				"/lawyer/efficiency/my_case/task/" + this.props.lawyerId + "/task_log",
			auth: true,
			data: {
				content: that.state.subtaskInput
			},
			callback: function(response) {
				if (response.data.code === 0) {
				} else {
					message.error(response.data.msg);
				}
			}
		});
	}
	saveInputRef = input => (this.input = input);
	render() {
		const { getFieldDecorator } = this.props.form;
		const {
			tags,
			inputVisible,
			inputValue,
			subtask,
			subtaskInput
		} = this.state;
		const { size } = this.state;
		return (
			<Modal
				width={800}
				destroyOnClose={true}
				footer={null}
				onCancel={() =>
					this.props.changePopupBox([{ type: this.props.popupType }])
				}
				visible={true}
			>
				{/* 任务内容 */}
				<div className="task_definition">
					<Form
						labelCol={{ span: 3 }}
						wrapperCol={{ span: 28 }}
						onSubmit={this.handleSubmit}
					>
						{/* header头部 */}
						<div style={{ marginBottom: 15 }}>
							{/* 右边部分 */}
							<div style={{ float: "left", marginTop: "20px" }}>
								<span style={{ color: "#333", fontSize: "16px" }}>
									{this.state.case_name}
								</span>
								<Button
									size="small"
									style={{
										backgroundColor: "#fff",
										color: "#ccc",
										marginLeft: "15px"
									}}
								>
									{this.state.column_name}
								</Button>
							</div>
							{/* 右边部分 */}
							<div
								style={{ float: "right", marginRight: 55, marginTop: "20px" }}
							>
								<span
									style={{
										color: "#333",
										fontWeight: "bold",
										fontSize: "14px"
									}}
								>
									创建人:
								</span>

								<Tooltip
									placement="top"
									title={
										<span
											style={{
												fontSize: "14px",
												marginLeft: "6px"
											}}
										>
											{this.state.name}
										</span>
									}
								>
									<Avatar
										style={{
											color: "#f56a00",
											backgroundColor: "#fde3cf",
											marginLeft: "8px"
										}}
									>
										U
									</Avatar>
								</Tooltip>

								<Button
									icon="delete"
									size="small"
									style={{
										backgroundColor: "#30333c",
										color: "#fff",
										marginLeft: "18px"
									}}
								>
									删除
								</Button>
							</div>
							<div style={{ clear: "both" }}></div>
							<Divider style={{ margin: "10px 0px 0px -24px" }} />
						</div>
						<div style={{ clear: "both" }}></div>
						{/* 内容部分 */}
						<div className="detail_left">
							{/* 左边部分 */}
							{/* 任务内容 */}
							<div>
								<span
									style={{
										color: "#333",
										fontWeight: "bold",
										fontSize: "14px"
									}}
								>
									任务内容:
								</span>
								<div style={{ color: "#666", fontSize: "14px" }}>
									{this.state.title}
								</div>
							</div>
							{/* 执行者名称 */}
							<div style={{ marginTop: "10px" }}>
								<span
									style={{
										color: "#333",
										fontWeight: "bold",
										fontSize: "14px"
									}}
								>
									执行者:
								</span>
								<div
									style={{
										position: "relative",
										marginTop: "5px"
									}}
								>
									<Avatar
										shape="square"
										style={{
											color: "#f56a00",
											backgroundColor: "#fde3cf",
											position: "absolute",
											top: "0px"
										}}
									>
										U
									</Avatar>
									<span
										className="law_names"
										style={{
											color: "#666",
											fontSize: "14px",
											marginLeft: "-3px",
											position: "absolute",
											bottom: "-52px"
										}}
									>
										{this.state.executorName}
									</span>
								</div>
							</div>
							<div style={{ clear: "both" }}></div>
							{/* 时间 */}
							<div style={{ marginTop: "67px" }}>
								<p
									style={{
										color: "#333",
										fontWeight: "bold",
										fontSize: "14px"
									}}
								>
									时间:
								</p>

								<div style={{ marginTop: "10px" }}>
									<RangePicker size={size} />
								</div>
							</div>
							{/* 优先级 */}
							<div style={{ marginTop: "10px" }}>
								<span
									style={{
										color: "#333",
										fontWeight: "bold",
										fontSize: "14px"
									}}
								>
									优先级:
								</span>
								<div style={{ marginTop: "10px" }}>
									<Button
										size="small"
										style={{ backgroundColor: "#2e3341", color: "#fff" }}
									>
										{this.state.priority_plan}
									</Button>
								</div>
							</div>
							{/* 标签 */}
							<div style={{ marginTop: "10px" }}>
								<span
									style={{
										color: "#333",
										fontWeight: "bold",
										fontSize: "14px"
									}}
								>
									我的标签:
								</span>
								<div style={{ clear: "both" }}></div>
								{this.state.tag.map(item => (
									<div
										key={item.id}
										style={{ marginTop: "10px", float: "left" }}
									>
										<Tag color="orange">{item.name}</Tag>
									</div>
								))}
							</div>
							<div style={{ clear: "both" }}></div>
							{/* 添加标签 */}
							<div style={{ marginTop: "10px" }}>
								<span
									style={{
										color: "#333",
										fontWeight: "bold",
										fontSize: "14px"
									}}
								>
									添加标签:
								</span>
								<div style={{ marginTop: "10px" }}>
									{tags.map((tag, index) => {
										const isLongTag = tag.length > 20;
										const tagElem = (
											<Tag
												key={tag}
												closable={index !== 1}
												onClose={() => this.handleClose(tag)}
											>
												{isLongTag ? `${tag.slice(0, 20)}...` : tag}
											</Tag>
										);
										return isLongTag ? (
											<Tooltip title={tag} key={tag}>
												{tagElem}
											</Tooltip>
										) : (
											tagElem
										);
									})}
									{inputVisible && (
										<Input
											ref={this.saveInputRef}
											type="text"
											size="small"
											style={{ width: 78 }}
											value={inputValue}
											onChange={this.handleInputChange}
											onBlur={this.handleInputConfirm}
											onPressEnter={this.handleInputConfirm}
										/>
									)}
									{!inputVisible && (
										<Tag
											onClick={this.showInput}
											style={{
												background: "#fff",
												borderStyle: "dashed"
											}}
										>
											<Icon type="plus" /> 添加标签
										</Tag>
									)}
								</div>
							</div>
							{/* 备注 */}
							<div style={{ marginTop: "10px" }}>
								<span
									style={{
										color: "#333",
										fontWeight: "bold",
										fontSize: "14px"
									}}
								>
									备注:
								</span>
								<div style={{ marginTop: "10px" }}>
									<Button
										size="small"
										style={{ backgroundColor: "#2e3341", color: "#fff" }}
									>
										{this.state.remark}
									</Button>
								</div>
							</div>
							{/* 添加子任务 */}
							<div style={{ marginTop: "10px" }}>
								<span
									style={{
										color: "#333",
										fontWeight: "bold",
										fontSize: "14px"
									}}
								>
									子任务:
								</span>
								<span
									style={{
										color: "#333",
										fontWeight: "bold",
										fontSize: "14px",
										float: "right",
										marginRight: "20px"
									}}
								>
									<Icon type="plus" onClick={() => this.handClick()} />
								</span>
								{/* 添加子任务 */}
								{subtask ? (
									<div style={{ marginTop: "10px" }}>
										<Input.TextArea
											placeholder="请输入任务标题"
											rows={1}
											value={subtaskInput}
											onChange={e => this.taskInput(e)}
											style={{ resize: "none", width: "350px", float: "left" }}
										/>
										<div style={{ margin: "0px 0px 0px 10px", float: "left" }}>
											<Button
												onClick={() => this.taskClick()}
												style={{ backgroundColor: "#2e3341", color: "#fff" }}
											>
												确定
											</Button>
										</div>
									</div>
								) : null}

								{/* 子任务列表 */}
								{this.state.children.map(item => (
									<Fragment>
										<div className="subtask_list" style={{ marginTop: "10px" }}>
											{/* 标题 */}
											<div style={{ float: "left" }}>
												<span style={{ color: "#333", fontSize: "14px" }}>
													某某贩毒刑事案
												</span>
											</div>
											{/* 时间 */}
											<div style={{ float: "right" }}>
											{/* {moment(item.begin).format("YYYY年-MM月-DD日")} */}
											<span style={{marginRight:"10px"}}>2019年-12月-13日</span>
											<Avatar size="small"  style={{ backgroundColor: '#87d068' }} icon="user" />
											</div>
											<div style={{ clear: "both" }}></div>
										</div>
										
									</Fragment>
								))}
							</div>
							<div style={{ clear: "both" }}></div>
							{/* 关联材料 */}
							<div style={{ marginTop: "10px" }}>
								<span
									style={{
										color: "#333",
										fontWeight: "bold",
										fontSize: "14px"
									}}
								>
									关联材料:
								</span>
								{this.state.file.map(item => (
									<div
										key={item.id}
										className="detail_relevance"
										style={{ marginTop: "10px" }}
									>
										<span
											style={{
												color: "#666",
												lineHeight: "28px",
												marginLeft: "15px"
											}}
										>
											{item.name}
										</span>
										<span style={{ color: "#333", lineHeight: "28px" }}>
											{item.type}
										</span>
									</div>
								))}
							</div>
							{/* 参与者列表 */}
						</div>
						<Divider
							type="vertical"
							style={{
								height: "767px",
								float: "left",
								position: "absolute",
								top: "86px"
							}}
						/>
						<div className="detail_right">
							{/* 右边部分 */}
							<div
								style={{
									width: "287px",
									marginLeft: "9px",
									position: "relative"
								}}
							>
								<span
									style={{
										color: "#333",
										fontWeight: "bold",
										fontSize: "14px",
										marginLeft: 10
									}}
								>
									参与者:
								</span>
								<div style={{ clear: "both" }}></div>
								{this.state.participant.map(item => (
									<div
										style={{ marginLeft: 10, float: "left", marginTop: "10px" }}
									>
										<Tooltip placement="top" title={<span>{item.name}</span>}>
											<Avatar
												key={item.id}
												shape="square"
												style={{
													color: "#f56a00",
													backgroundColor: "#fde3cf"
												}}
											>
												U
											</Avatar>
										</Tooltip>
									</div>
								))}
								<span className="xianTop_participant"></span>
							</div>
							<div style={{ clear: "both" }}></div>
							{/* 日志内容 */}
							<div
								style={{
									height: "440px",
									width: "287px",
									marginLeft: "9px",
									marginTop: "30px"
								}}
							>
								{this.state.listLog.map(item => (
									<div key={item.id}>
										{(() => {
											switch (item.type) {
												case 1: // 操作日志
													return (
														<Fragment>
															<div className="task_sender">
																{/* icon */}
																<div
																	style={{ float: "left", marginTop: "10px" }}
																>
																	<Icon type="calendar" />
																</div>

																<div
																	style={{ float: "left", marginLeft: "15px" }}
																>
																	<span>{item.type_plan}</span> <br />
																	<span>{item.content}</span>
																</div>
															</div>
															<div style={{ clear: "both" }}></div>
														</Fragment>
													);
												case 2: //文本消息
												case 3: //文本消息
													return (
														<Fragment>
															<div className="task_sender">
																{/* 头像 */}
																<div
																	style={{ float: "left", marginLeft: "-5px" }}
																>
																	<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
																</div>
																<div
																	style={{ float: "left", marginLeft: "5px" }}
																>
																	<span>{item.sender.name}</span>
																	<br />
																	<span>{item.content}</span>
																	{console.log(item.content)}
																</div>
															</div>
															<div style={{ clear: "both" }}></div>
														</Fragment>
													);
												default:
													break;
											}
										})()}
									</div>
								))}
							</div>

							{/* 输入部分 */}
							<div className="task_TextArea">
								<span className="input_xianTop"></span>
								<div
									style={{ width: "14px", float: "left", marginLeft: "22px" }}
								>
									<Icon type="meh" />
								</div>
								<div
									style={{ width: "14px", float: "left", marginLeft: "15px" }}
								>
									<Icon type="file-text" />
								</div>
								<Input.TextArea
									placeholder="请输入内容"
									rows={6}
									value={subtaskInput}
									onChange={e => this.taskInput(e)}
									style={{
										resize: "none",
										width: "280px",
										border: "none",
										marginLeft: "12px"
									}}
								/>
								<Button
									size="small"
									onClick={() => this.taskMessage()}
									style={{
										backgroundColor: "#2e3341",
										color: "#fff",
										float: "right",
										margin: "0px 15px 10px 0px"
									}}
								>
									确定
								</Button>
							</div>
						</div>
						<div style={{ clear: "both" }}></div>
					</Form>
				</div>
			</Modal>
		);
	}
	handClick() {
		const subtask = this.state.subtask;
		this.setState({
			subtask: !subtask
		});
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
Index = connect(null, mapDispath)(Form.create()(Index));

export default Index;
