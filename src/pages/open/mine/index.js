import React, { Component, Fragment } from "react";
import "./index.css";
import { changePopupBox } from "../../../components/layout/popup/actionCreators";
import connect from "react-redux/es/connect/connect";
// import { Link } from "react-router-dom";
import moment from "moment";
import { myRequest } from "../../../function";
import {
	Button,
	Select,
	Cascader,
	Icon,
	Tabs,
	Input,
	BackTop,
	Divider,
	Avatar,
	Tag,
	Form,
	message
} from "antd";
// import { MyIcon } from "../../../statics/IconFont";
const { TextArea } = Input;
const { TabPane } = Tabs;
class Index extends Component {
	state = {
		openList: [], // 法律广场列表
		answerShowId: 0,
		// select: 0, // 类型字段
		region: [], // 地区
		reply: "" // 回复内容值
	};

	// 获取广场列表
	getOpenReply() {
		const that = this;
		myRequest({
			method: "get",
			path: "/lawyer/consultation/open/reply",
			auth: true,
			callback: function(response) {
				if (response.data.code === 0) {
					that.setState({
						openList: response.data.data
					});
				}
			}
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
	componentDidMount() {
		this.getOpenReply(); // 法律广场列表
		this.getRegion(); // 地区
	}
	render() {
		return (
			<Fragment>
				<BackTop />
				<div className="law_square">
					{/* 搜索选择部分 */}
					<div className="search_select">
						{/* 全部类型 */}
						<Select
							showSearch
							style={{
								width: 200,
								margin: "10px 20px 10px 20px"
							}}
							placeholder="所有类型"
						>
							<Select.Option key={0}>婚姻家庭</Select.Option>
							<Select.Option key={1}>交通事故</Select.Option>
							<Select.Option key={2}>其他事项</Select.Option>
						</Select>
						{/* 全部地区 */}
						<Cascader
							fieldNames={{
								value: "id",
								label: "name",
								children: "children"
							}}
							options={this.state.region}
							placeholder="全部地区"
							style={{ width: 200, margin: "10px 20px 10px 20px" }}
						/>
						<span className="wire_input"></span>
						<input placeholder="输入搜索内容" className="search_Input" />
						<Icon type="search" style={{ marginLeft: "40px" }} />
					</div>
					{/* 内容部分 */}
					<div className="opne_content">
						<Tabs defaultActiveKey="1" style={{ border: "0" }}>
							<TabPane tab="推荐" key="1"></TabPane>
							<TabPane tab="最新" key="2"></TabPane>
							<TabPane tab="回复最少" key="3"></TabPane>
						</Tabs>
						{/* 内容 */}
						<div className="Tab_content">
							{this.state.openList.map(item => (
								<Fragment>
									<div key={item.id} className="Tabcontent">
										<div>
											<span
												style={{
													fontSize: "18px",
													color: "#333",
													float: "left"
												}}
											>
												{item.open.content}
											</span>
											<div style={{ clear: "both" }}></div>
											<Icon
												type="ellipsis"
												style={{
													float: "right",
													fontSize: "16px",
													color: "#333"
												}}
											/>
										</div>
										{/* 我的回复 */}
										<div className="myReplyShowss">
											<span style={{ color: "#B3B3B3" }}>我的回复:</span>
											<span className="myReplyShow" style={{ color: "#333" }}>
												{item.content}
											</span>
											{/* <span style={{ color: "#4586FF" }}>
												显示全部&nbsp;
												<Icon type="down" />
											</span> */}
										</div>
										{/* 类型，地区 */}
										<div style={{ marginTop: "7px" }}>
											<span style={{ color: "#B3B3B3" }}>类型:</span>
											<span style={{ color: "#666", marginLeft: "7px" }}>
												{item.open.type}
											</span>
											<span style={{ color: "#B3B3B3", marginLeft: "40px" }}>
												地区:
											</span>
											<span style={{ color: "#666", marginLeft: "7px" }}>
												{item.open.area}
											</span>
										</div>
										{/* 回答，消息 */}
										<div style={{ margin: "10px 0px 20px 0px" }}>
											{this.state.answerShowId ? (
												<Button
													type="primary"
													ghost
													size="small"
													onClick={() => this.handClick(item.id)}
												>
													{this.state.answerShowId === item.id ? "收起追问": "查看追问"}
												</Button>
											) : (
												<Button
													type="primary"
													ghost
													size="small"
													onClick={() => this.handClick(item.id)}
												>
													{this.state.answerShowId === item.id ? "收起追问": "查看追问"}
												</Button>
											)}

											<span style={{ color: "#B3B3B3", marginLeft: "63px" }}>
												{moment().diff(moment(item.created), "day") > 5
													? moment(item.created).format("YYYY年-MM月-DD日")
													: moment(item.created).fromNow()}
											</span>

											<span style={{ color: "#B3B3B3", float: "right" }}>
												{item.open.publisher.name}
											</span>
										</div>
										{/* 回答 */}
										{this.state.answerShowId === item.id ? (
											<Fragment>
												<div className="law_question">
													{/* 律师用户追问追答回复 */}
													{item.append.map((itemSublevel, index) => (
														<div key={itemSublevel.id}>
															{/* 追问的内容用户 */}
															<div className="question_content">
																<Avatar
																	shape="square"
																	size="small"
																	icon="user"
																	style={{ backgroundColor: "#87d068" }}
																/>
																<span
																	style={{
																		marginLeft: "10px",
																		marginTop: "3px"
																	}}
																>
																	{itemSublevel.type_plan}
																</span>

																<Tag
																	color={
																		itemSublevel.type === 1 ? "orange" : "green"
																	}
																	style={{ margin: "0px 0px 0px 15px" }}
																>
																	{itemSublevel.type === 1 ? "咨询者" : "律师"}
																</Tag>
																<span
																	style={{
																		float: "right",
																		color: "#ccc",
																		marginRight: "10px"
																	}}
																>
																	{moment().diff(
																		moment(itemSublevel.created),
																		"day"
																	) > 5
																		? moment(itemSublevel.created).format(
																				"YYYY年-MM月-DD日"
																		  )
																		: moment(itemSublevel.created).fromNow()}
																</span>
																<p style={{ margin: "8px 0px 10px 0px" }}>
																	{itemSublevel.content}
																</p>
																{itemSublevel.type === 1 ? (
																	<Divider
																		style={{ margin: "15px 0px 0px 0px " }}
																	/>
																) : null}
															</div>
														</div>
													))}
													<Divider style={{ margin: "15px 0px 0px 0px " }} />
													{/* 回复 */}
													<Input.TextArea
														onChange={e => this.inputReply(e)}
														value={this.state.reply}
														placeholder="请输入回复的内容"
														rows={1}
														style={{
															resize: "none",
															width: "740px",
															float: "left",
															marginLeft: "10px",
															marginTop: "20px"
														}}
													/>
													<Button
														onClick={() => this.handIssue(item.id)}
														size="small"
														type="primary"
														style={{
															color: "#fff",
															width: "80px",
															height: "30px",
															float: "left",
															margin: "20px 0px 0px 20px"
														}}
													>
														发布
													</Button>
													<div style={{ clear: "both" }}></div>
												</div>
												<div style={{ clear: "both" }}></div>
											</Fragment>
										) : null}
										<Divider style={{ marginBottom: "10px" }} />
									</div>
									<div style={{ clear: "both" }}></div>
								</Fragment>
							))}
						</div>
					</div>
					{/* 加载更多 */}
					<div className="law_load">
						<span style={{ lineHeight: "40px", textAlign: "center" }}>
							加载更多
						</span>
					</div>
					<BackTop />
				</div>
			</Fragment>
		);
	}
	handClick(id) {
		this.setState({
			answerShowId: this.state.answerShowId === id ? 0 : id
		});
	}
	inputReply(e) {
		this.setState({
			reply: e.target.value
		});
	}
	// 回复追问
	handIssue(id) {
		let that = this;
		myRequest({
			method: "post",
			path: "/lawyer/consultation/open/" + id + "/append",
			auth: true,
			data: {
				content: this.state.reply
			},
			callback: function(response) {
				if (response.data.code === 0) {
					message.success("发布成功");
				} else {
					message.error(response.data.msg);
				}
			}
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

export default connect(null, mapDispath)(Index);
