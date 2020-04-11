import React, { Component, Fragment } from "react";
import "./index.css";
import {
	Form,
	Icon,
	Button,
	Card,
	Popover,
	Avatar,
	message,
	Input,
	Tag,
	Tooltip
} from "antd";
import { changePopupBox } from "../../../../components/layout/popup/actionCreators";
import connect from "react-redux/lib/connect/connect";
import { myRequest } from "../../../../function";
import moment from "moment";
//案件任务
class Index extends Component {
	state = {
		taskList: [], //任务列表
		showTaskID: 0, // 新建子任务
		tags: [],
		inputVisible: false, // tag输入控制显示隐藏
		inputValue: "", // input的输入值
		titleInput: "", // 添加子任务输入
		// taskName: "", // 修改任务名状态
		editName: 0, //是否为编辑名称状态
		name: "" //用户名
	};
	//获取任务列表
	gettaskList() {
		const that = this;
		let id = this.props.caseId;
		myRequest({
			method: "get",
			path: "/lawyer/efficiency/my_case/task/" + id,
			auth: true,
			callback: function(response) {
				//处理返回结果
				if (response.data.code === 0) {
					that.setState({
						taskList: response.data.data
					});
				} else {
					message.error(response.data.msg);
				}
			}
		});
	}
	// 删除列表
	delClick(id) {
		myRequest({
			method: "DELETE",
			path: "/lawyer/efficiency/my_case/task/" + id + "/column",
			auth: true,
			callback: function(response) {
				//处理返回结果
				if (response.data.code === 0) {
					message.success("删除列表成功");
				} else {
					message.error(response.data.msg);
				}
			}
		});
	}
	// 清空列表
	empty(id) {
		myRequest({
			method: "DELETE",
			path: "/lawyer/efficiency/my_case/task/" + id + "/empty_column",
			auth: true,
			callback: function(response) {
				//处理返回结果
				if (response.data.code === 0) {
					message.success("清空列表成功");
				} else {
					message.error(response.data.msg);
				}
			}
		});
	}
	// tag标签
	handleClose = removedTag => {
		const tags = this.state.tags.filter(tag => tag !== removedTag);
		console.log(tags);
		this.setState({ tags });
	};

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
					that.setState({ 
						inputVisible: true,
					 },() => that.input.focus());
					 
				} else {
					message.error(response.data.msg);
				}
			}
		});
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
		this.gettaskList(); // 任务列表
	}
	// 新增任务
	taskClick(id) {
		let that = this;
		myRequest({
			method: "post",
			path: "/lawyer/efficiency/my_case/task/"+id+"/task",
			auth: true,
			data: {
				title: that.state.titleInput
			},
			callback: function(response) {
				if (response.data.code === 0) {
					message.success("添加任务成功");
				} else {
					message.error(response.data.msg);
				}
			}
		});
	}

	//改变名称编辑状态
	taskSelect(id) {
		this.setState(
			{
				editName: this.state.editName === id ? 0 : id
			},
			() => {
				this.rename.focus();
			}
		);
	}
	//更新用户信息
	updateTask(e, column, id) {
		let data = {},
			that = this;
		const value = e.target.value;
		//判断修改的是哪个字段
		switch (column) {
			case "name":
				data.name = value;
				break;
			default:
				return false;
		}
		myRequest({
			method: "POST",
			path: "/lawyer/efficiency/my_case/task/" + id + "/column",
			auth: true,
			data,
			callback: function(response) {
				console.log(response);
				//处理返回结果
				if (response.data.code === 0) {
					if (column === "name") {
						that.setState({
							editName: 0
						});
					}
				} else {
					message.error(response.data.msg);
				}
			}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { tags, inputVisible, inputValue, titleInput, editName } = this.state;
		return (
			<Fragment>
				<div className="particulars1">
					<div className="addTsak">
						<span
							style={{
								fontSize: "14px",
								color: "#393E46",
								lineHeight: "40px",
								marginLeft: "40px"
							}}
						>
							拥有的主要任务
						</span>
						<Button
							size="small"
							style={{
								backgroundColor: "#2E3341",
								float: "right",
								margin: "8px 20px"
							}}
							onClick={() => this.props.changePopupBox([{ type: "add_task", addTask: { id: this.props.caseId } }])}
							type="primary"
						>
							<Icon type="plus" />
							新增任务列表
						</Button>
					</div>
					<div style={{ marginTop: "20px" }}>
						{/* 主任务 */}
						{this.state.taskList.map((item, index) => (
							<Fragment>
								<div
									key={item.id}
									style={{
										float: "left",
										marginRight: (index + 1) % 3 === 0 ? 0 : 47
									}}
								>
									{/* 任务标题 */}
									<Card
										hoverable
										style={{ width: 280, borderRadius: "4px", height: 37 }}
									>
										{/* <Form.Item> */}
										{editName === item.id ? (
											getFieldDecorator("name", {
												initialValue: item.name
											})(
												<Input
													size="small"
													ref={refs => (this.rename = refs)}
													className="w200"
													style={{
														height: "25px",
														position: "absolute",
														top: "6px"
													}}
													placeholder="请输入您的名称"
													onBlur={e => this.updateTask(e, "name", item.id)}
												/>
											)
										) : (
											<p className="mytitle">{item.name}</p>
										)}
										<Popover
											placement="bottom"
											content={
												<div style={{ cursor: "pointer" }}>
													<p onClick={() => this.taskSelect(item.id)}>重命名</p>
													<p onClick={() => this.empty(item.id)}>清空列表</p>
													<p onClick={() => this.delClick(item.id)}>删除列表</p>
												</div>
											}
											trigger="focus"
										>
											<button className="selectssss">
												<Icon className="operation" type="dash" />
											</button>
										</Popover>
										<div style={{ clear: "both" }}></div>
									</Card>
									<div style={{ clear: "both" }}></div>
									{/* 主任务 */}
									{item.tasks.map(itemChild => (
										<Card
											key={itemChild.id}
											onClick={() =>
												this.props.changePopupBox([
													{ type: "task_detail", task: { id: itemChild.id } }
												])
											}
											style={{
												width: 280,
												borderRadius: "4px",
												marginTop: "13px"
											}}
											hoverable
										>
											<div>
												<span className="myyouzx">
													{itemChild.executor.name}
												</span>
												<Avatar
													style={{
														width: "20px",
														height: "20px",
														marginTop: "-7px"
													}}
													src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
												/>
												<Button
													size="small"
													style={{
														height: 24,
														marginLeft: 87
													}}
													type="primary"
												>
													{itemChild.status_plan}
												</Button>
											</div>
											<div className="contersuou">
												<p style={{ fontSize: "14px", color: "#333333" }}>
													{itemChild.title}
												</p>
											</div>
											<div className="cut_offTime">
												截止时间：
												{moment(itemChild.end).format("YYYY年-MM月-DD日")}
											</div>
											<div className="tabnum">
												<span
													style={{
														fontSize: "14px",
														color: "#333333",
														marginLeft: 22,
														marginTop: 11
													}}
												>
													1/3
												</span>
												<Icon
													style={{
														fontSize: "14px",
														color: "#333333",
														marginLeft: 13,
														marginTop: 12
													}}
													type="unordered-list"
												/>
											</div>
										</Card>
									))}
									<div style={{ clear: "both" }}></div>
									{/* 新建任务 */}
									<div className="imaginary">
										{this.state.showTaskID ? (
											<div>
												<Icon
													onClick={() => this.handClick(item.id)}
													style={{
														lineHeight: "50px",
														fontSize: "17px",
														color: "#333333",
														marginLeft: "68px"
													}}
													type="plus"
												/>
												{/* <span style={{ marginLeft: "10px", color: "#333333" }}>
													新增任务
												</span> */}
												{this.state.showTaskID === item.id ? (
													<span
														style={{ marginLeft: "10px", color: "#333333" }}
													>
														收起任务
													</span>
												) : (
													<span
														style={{ marginLeft: "10px", color: "#333333" }}
													>
														新增任务
													</span>
												)}
											</div>
										) : (
											<div>
												<Icon
													onClick={() => this.handClick(item.id)}
													style={{
														lineHeight: "50px",
														fontSize: "17px",
														color: "#333333",
														marginLeft: "68px"
													}}
													type="plus"
												/>

												{this.state.showTaskID === item.id ? (
													<span
														style={{ marginLeft: "10px", color: "#333333" }}
													>
														收起任务
													</span>
												) : (
													<span
														style={{ marginLeft: "10px", color: "#333333" }}
													>
														新增任务
													</span>
												)}
											</div>
										)}
									</div>
									{this.state.showTaskID === item.id ? (
										<div style={{ marginTop: "15px" }}>
											<Input.TextArea
												placeholder="请输入任务标题"
												rows={1}
												value={titleInput}
												onChange={e => this.taskInput(e)}
												style={{ resize: "none" }}
											/>
											{/* 添加tag标签 */}
											<div style={{ marginTop: "15px" }}>
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
											{/* 确认子任务title提交 */}
											<Button
												size="small"
												onClick={() => this.taskClick(item.id)}
												style={{
													backgroundColor: "#2e3341",
													width: "80px",
													color: "#fff",
													margin: "15px 0px 20px 90px"
												}}
											>
												确认
											</Button>
										</div>
									) : null}
								</div>
							</Fragment>
						))}
					</div>
				</div>
			</Fragment>
		);
	}
	handClick(id) {
		this.setState({
			showTaskID: this.state.showTaskID === id ? 0 : id
		});
	}
	// 添加子任务输入
	taskInput(e) {
		this.setState({
			titleInput: e.target.value
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
export default connect(null, mapDispath)(Form.create()(Index));
