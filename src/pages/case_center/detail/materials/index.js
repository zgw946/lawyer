import React, { Component, Fragment } from "react";
import "./index.css";
import {
	Upload,
	message,
	Button,
	Icon,
	Input,
	Breadcrumb,
	Modal,
	Avatar,
	Empty
} from "antd";

import { computationType, getFileSize, myRequest } from "../../../../function";
import moment from "moment";
//案件材料
const props = {
	name: "file",
	headers: {
		authorization: "authorization-text"
	},
	showUploadList: false,
	onChange(info) {
		if (info.file.status !== "uploading") {
		}
		if (info.file.status === "done") {
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === "error") {
			message.success(`${info.file.name} 上传成功`);
		}
	}
};

class Index extends Component {
	// 标签
	state = {
		list: [], //文件列表
		breadcrumb: [
			{
				id: 0,
				name: "全部文件"
			}
		], //文件导航
		file: null, //文件详情
		showAdd: false //是否展示添加文件夹窗口
	};

	//获取父级获取文件列表
	getMyFile(parentId) {
		const that = this,
			id = 1;
		myRequest({
			method: "get",
			path: "/lawyer/efficiency/my_case/material/" + id,
			auth: true,
			params: {
				folder_id: parentId
			},
			callback: function(response) {
				//处理返回结果
				if (response.data.code !== 0) {
					message.error(response.data.msg);
				} else {
					that.setState({ list: response.data.data });
				}
			}
		});
	}

	//定位文件夹位置
	locationFile(index) {
		let breadcrumb = this.state.breadcrumb; //当前导航
		const current = breadcrumb[index];

		this.getMyFile(current.id);

		breadcrumb = breadcrumb.slice(0, index + 1);
		this.setState({ breadcrumb });
	}

	//打开文件夹
	openFolder(index) {
		const file = this.state.list[index];
		this.getMyFile(file.id);

		let breadcrumb = this.state.breadcrumb; //当前导航
		breadcrumb.push({
			id: file.id,
			name: file.name
		});

		this.setState({ breadcrumb });
	}

	//展示文件详情
	showFile(index) {
		const file = this.state.list[index];

		this.setState({ file });
	}

	//删除文件或文件夹
	deleteFile(id) {
		Modal.confirm({
			title: "删除文件",
			content: "你确定要删除该文件吗？",
			onOk: () => {
				const that = this;
				//提交请求
				myRequest({
					method: "delete",
					path: "/lawyer/efficiency/my_case/material/" + id,
					auth: true,
					callback: function(response) {
						//处理返回结果
						if (response.data.code !== 0) {
							message.error(response.data.msg, 2);
						} else {
							message.success("删除成功", 1);

							//重新刷新当前文件夹
							const current =
								that.state.breadcrumb[that.state.breadcrumb.length - 1];
							that.getMyFile(current.id);
						}
					}
				});
			}
		});
	}

	//新增文件夹
	addFolder() {
		this.setState({ showAdd: true }, () => {
			this.contentInput.focus();
		});
	}

	//执行新增文件夹
	actAddFolder() {
		this.setState({ showAdd: false });
	}

	//初始化组件
	componentDidMount() {
		this.getMyFile(0); //获取最顶级文件
	}

	render() {
		const { file } = this.state;
		return (
			<Fragment>
				<div className="particulars">
					{/* 左边内容 */}
					<div className="my_uploadings">
						{/* 文件上传部分 */}
						<div className="myheerds">
							<div style={{ float: "left" }}>
								<Upload {...props}>
									<Button
										style={{
											backgroundColor: "#2E3341",
											color: "#FFF",
											marginLeft: "20px",
											marginTop: "14px"
										}}
									>
										<Icon type="upload" /> 上传文件
									</Button>
								</Upload>
							</div>
							<div style={{ float: "left" }}>
								<Button
									onClick={() => this.addFolder()}
									style={{
										marginLeft: "20px",
										marginTop: "14px"
									}}
								>
									<Icon type="folder-add" /> 新增文件夹
								</Button>
							</div>
							<div
								style={{
									float: "right",
									marginRight: "20px",
									marginTop: "14px"
								}}
							>
								<Input.Search
									placeholder="搜索你要查找的文件"
									style={{ width: 260, borderRadius: "6px" }}
								/>
							</div>
						</div>
						<div className="myview">
							<div style={{ float: "left" }}>
								<Breadcrumb
									style={{
										marginLeft: "20px",
										marginTop: "15px",
										color: "#333333"
									}}
									separator=">"
								>
									{this.state.breadcrumb.map((item, index) => (
										<Breadcrumb.Item key={item.id}>
											{index === this.state.breadcrumb.length - 1 ? (
												item.name
											) : (
												<a
													className="c-333"
													onClick={() => this.locationFile(index)}
												>
													{item.name}
												</a>
											)}
										</Breadcrumb.Item>
									))}
								</Breadcrumb>
							</div>
							<div
								style={{
									float: "right",
									marginRight: "20px",
									marginTop: "14px",
									cursor: "pointer"
								}}
							>
								{/*<Icon type="appstore" style={{ fontSize: "18px" }} />*/}
							</div>
						</div>
						<div className="show_file_box">
							{this.state.breadcrumb.length === 1 ? (
								<div
									onClick={() => {
										message.warn("功能尚未开放，敬请期待");
									}}
									style={{
										width: 100,
										height: 100,
										margin: "5px",
										position: "relative",
										float: "left"
									}}
								>
									<div className="file1">
										<Icon
											style={{ fontSize: 42, marginLeft: 29 }}
											type="message"
											theme="twoTone"
											className="filejia"
										/>
										<p className="tac">收藏记录</p>
									</div>
								</div>
							) : null}

							{/* 文件部分 */}
							{this.state.list.map((item, index) => (
								<div
									onClick={() => {
										if (item.type === 1) {
											this.openFolder(index);
										} else {
											this.showFile(index);
										}
									}}
									key={item.id}
									style={{
										width: 100,
										height: 100,
										margin: "5px",
										position: "relative",
										float: "left"
									}}
								>
									{/*<Checkbox className="checkbox1"/>*/}
									<div className="file1">
										{item.type === 1 ? (
											<Icon
												style={{ fontSize: 42, marginLeft: 29 }}
												type="folder"
												theme="filled"
												className="filejia"
											/>
										) : (
											<Fragment>
												{(() => {
													const fileItem = item.file;
													const fileType = fileItem.type.replace(".", "");
													const type = computationType(fileType); //计算类型
													let cover = ""; //封面
													switch (type) {
														case "image":
															cover = fileItem.url;

															break;
														case "word":
															cover = require("../../../../statics/images/word.png");

															break;
														case "text":
															cover = require("../../../../statics/images/text.png");

															break;
														case "excel":
															cover = require("../../../../statics/images/excel.png");

															break;
														case "ppt":
															cover = require("../../../../statics/images/ppt.png");

															break;
														case "pdf":
															cover = require("../../../../statics/images/pdf.png");

															break;
														case "packet":
															cover = require("../../../../statics/images/yasuobao.png");

															break;
														default:
															cover = require("../../../../statics/images/weizhiwenjian.png");

															break;
													}

													return (
														<Avatar
															style={{ marginLeft: 29 }}
															shape="square"
															size={42}
															className="filejia"
															src={cover}
														/>
													);
												})()}
											</Fragment>
										)}
										<p className="tac">{item.name}</p>
									</div>
								</div>
							))}
							{this.state.showAdd ? (
								<div
									style={{
										width: 100,
										height: 100,
										margin: "5px",
										position: "relative",
										float: "left"
									}}
								>
									<div className="file1">
										<Icon
											style={{ fontSize: 42, marginLeft: 29 }}
											type="folder"
											theme="filled"
											className="filejia"
										/>
										<Input
											ref={refs => (this.contentInput = refs)}
											size="small"
											onBlur={() => this.actAddFolder()}
										/>
									</div>
								</div>
							) : null}
						</div>
					</div>
					{/* 右边内容 */}
					<div className="my_xiangxis2">
						{file ? (
							<Fragment>
								<div className=" detailed">
									<p
										style={{
											lineHeight: "60px",
											textAlign: "center",
											color: "#333"
										}}
									>
										详情信息
									</p>
								</div>
								{/* 文件详情 */}
								<div
									style={{
										padding: "10px",
										position: "relative",
										height: "640px"
									}}
								>
									<Icon
										onClick={() => this.deleteFile(file.id)}
										type="delete"
										style={{ float: "right" }}
									/>
									<br></br>
									{(() => {
										const fileDetail = file.file;
										const fileType = fileDetail.type.replace(".", "");
										const type = computationType(fileType); //计算类型
										let cover = ""; //封面
										switch (type) {
											case "image":
												cover = fileDetail.url;

												break;
											case "word":
												cover = require("../../../../statics/images/word.png");

												break;
											case "text":
												cover = require("../../../../statics/images/text.png");

												break;
											case "excel":
												cover = require("../../../../statics/images/excel.png");

												break;
											case "ppt":
												cover = require("../../../../statics/images/ppt.png");

												break;
											case "pdf":
												cover = require("../../../../statics/images/pdf.png");

												break;
											case "packet":
												cover = require("../../../../statics/images/yasuobao.png");

												break;
											default:
												cover = require("../../../../statics/images/weizhiwenjian.png");

												break;
										}

										return (
											<Avatar
												style={{ marginLeft: 105 }}
												shape="square"
												size={42}
												className="filejia"
												src={cover}
											/>
										);
									})()}
									<br></br>
									<span
										style={{
											fontSize: "12px",
											color: "#ccc",
											position: "absolute",
											top: "94px",
											left: "115px"
										}}
									>
										{file.name}
									</span>
									{/* 下载按钮 */}
									<div style={{ marginTop: "90px", marginLeft: "46px" }}>
										<Button
											size="small"
											style={{ width: "76px", marginRight: "5px" }}
											onClick={() => {
												message.warn("功能暂未开放，敬请期待");
											}}
										>
											打开
										</Button>
										<Button
											size="small"
											style={{ width: "76px", marginLeft: "5px" }}
											onClick={() => {
												message.warn("功能暂未开放，敬请期待");
											}}
										>
											下载
										</Button>
									</div>

									<div style={{ marginLeft: "10px", marginTop: "20px" }}>
										<h2
											style={{
												fontSize: "12px",
												fontWeight: "bold",
												color: "#333"
											}}
										>
											基本信息
										</h2>
										<span
											style={{ fontSize: "12px", color: "#333", float: "left" }}
										>
											文件大小:
										</span>
										<span
											style={{
												fontSize: "12px",
												color: "#333",
												float: "right",
												marginRight: "35px"
											}}
										>
											{getFileSize(file.file.size)}
										</span>
										<br></br>
										<span
											style={{ fontSize: "12px", color: "#333", float: "left" }}
										>
											文件类型:
										</span>
										<span
											style={{
												fontSize: "12px",
												color: "#333",
												float: "right",
												marginRight: "35px"
											}}
										>
											{file.file.type}
										</span>
										<br></br>
										<span
											style={{ fontSize: "12px", color: "#333", float: "left" }}
										>
											创建时间:
										</span>
										<span
											style={{
												fontSize: "12px",
												color: "#333",
												float: "right",
												marginRight: "35px"
											}}
										>
											{moment(file.created).format("YYYY年MM月DD日 HH:mm")}
										</span>
									</div>
								</div>
							</Fragment>
						) : (
							<Empty description="暂无数据" />
						)}
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Index;
