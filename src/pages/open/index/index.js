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
	Form,
	message
} from "antd";
import { MyIcon } from "../../../statics/IconFont";
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
	getOpen() {
		const that = this,
			params = {};
		//筛选类型
		if (that.props.form.getFieldValue("type") !== 0) {
			params.type = that.props.form.getFieldValue("type");
		}
		myRequest({
			method: "get",
			path: "/lawyer/consultation/open",
			params,
			auth: true,
			callback: function(response) {
				console.log(response);
				if (response.data.code === 0) {
					that.setState({
						openList: response.data.data
					});
				}
			}
		});
	}
	//提交筛选表单
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.getOpen();
			}
		});
	};
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
		this.getOpen(); // 法律广场列表
		this.getRegion(); // 地区
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Fragment>
				<BackTop />
				<div className="law_square">
					{/* 搜索选择部分 */}
					<div className="search_select">
						{/* 全部类型 */}
						<Form onSubmit={this.handleSubmit}>
							<Form.Item style={{ float: "left" }}>
								{getFieldDecorator(
									"type",
									{}
								)(
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
								)}
							</Form.Item>
							{/* 全部地区 */}
							<Cascader
								fieldNames={{
									value: "id",
									label: "name",
									children: "children"
								}}
								options={this.state.region}
								placeholder="请选择地区"
								style={{
									width: 200,
									margin: "10px 20px 10px 20px"
								}}
							/>
							<span className="wire_input"></span>
							<input placeholder="输入搜索内容" className="search_Input" />
							<Icon type="search" style={{ marginLeft: "40px" }} />
						</Form>
					</div>
					<div style={{ clear: "both" }}></div>
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
												{item.content}
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
										{/* 类型，地区 */}
										<div style={{ clear: "both" }}></div>
										<div>
											<span style={{ color: "#B3B3B3" }}>类型:</span>
											<span style={{ color: "#666", marginLeft: "7px" }}>
												{item.type}
											</span>
											<span style={{ color: "#B3B3B3", marginLeft: "40px" }}>
												地区:
											</span>
											<span style={{ color: "#666", marginLeft: "7px" }}>
												{item.area}
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
													{this.state.answerShowId === item.id
														? "取消回复"
														: "写回答"}
												</Button>
											) : (
												<Button
													type="primary"
													ghost
													size="small"
													onClick={() => this.handClick(item.id)}
												>
													{/* {this.state.answerShowId === item.id ?(0):(<MyIcon type="iconweibiaoti1-copy" />)} */}

													{this.state.answerShowId === item.id
														? "取消回复"
														: "写回答"}
												</Button>
											)}
											<span style={{ color: "#B3B3B3", marginLeft: "40px" }}>
												目前有{item.reply_num}个回答
											</span>
											<span style={{ color: "#B3B3B3", marginLeft: "40px" }}>
												{moment().diff(moment(item.created), "day") > 5
													? moment(item.created).format("YYYY年-MM月-DD日")
													: moment(item.created).fromNow()}
											</span>
											<span style={{ color: "#B3B3B3", float: "right" }}>
												{item.publisher.name}
											</span>
										</div>
										{/* 回答 */}
										{this.state.answerShowId === item.id ? (
											<Fragment>
												<Form>
													<div style={{ margin: "0px 0px 15px 0px" }}>
														<Input.TextArea
															onChange={e => this.inputReply(e)}
															value={this.state.reply}
															placeholder="请输入你的内容"
															rows={3}
															style={{
																resize: "none",
																width: "740px",
																float: "left"
															}}
														/>
														<Button
															onClick={() => this.handIssue(item.id)}
															size="small"
															style={{
																backgroundColor: "#2E3341",
																border: "#2E3341",
																color: "#fff",
																width: "80px",
																float: "left",
																margin: "25px 0px 0px 20px"
															}}
														>
															发布
														</Button>
														<div style={{ clear: "both" }}></div>
													</div>
												</Form>
												<div style={{ clear: "both" }}></div>
											</Fragment>
										) : null}
										<Divider
											style={{ marginBottom: "10px", marginTop: "3px" }}
										/>
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
			reply: e.target.value,
			
		});
	}
	// 回复回答
	handIssue(id) {
		// let that = this;
		myRequest({
			method: "post",
			path: "/lawyer/consultation/open/"+id+"/reply",
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
//添加数据仓库
Index = connect(null, mapDispath)(Index);
//添加表单
Index = Form.create()(Index);

export default Index;
