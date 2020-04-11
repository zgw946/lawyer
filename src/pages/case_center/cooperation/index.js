import React, { Component, Fragment } from "react";
import { changePopupBox } from "../../../components/layout/popup/actionCreators";
import connect from "react-redux/lib/connect/connect";
import "./index.css";
import {
	Select,
	Button,
	Icon,
	Card,
	Avatar,
	Pagination,
	Radio,
	Input,
	Cascader,
	message,
	Form
} from "antd";
import moment from "moment";
import { myRequest } from "../../../function";
//协同广场
class Index extends Component {
	state = {
		list: [], // 协同列表
		page: 1, //当前页码
		pageSize: 10, //每页显示数量
		region: "", // 地区
		total: 0 //数据总数
	};
	//获取我的协同列表
	getMyCase() {
		const that = this,
			params = {};
		params.belong = 1;
		params.page = that.state.page;
		params.page_size = that.state.pageSize;
		//筛选类型
		if (that.props.form.getFieldValue("type") !== 0) {
			params.type = that.props.form.getFieldValue("type");
		}

		const form = that.props.form; //表单
		//按地区筛选
		const region = form.getFieldValue("region");
		if (region) {
			//省份
			if (region[0]) {
				params.province = region[0];
			}
			//城市
			if (region[1]) {
				params.city = region[1];
			}
		}
		myRequest({
			method: "get",
			path: "/lawyer/efficiency/coordination",
			auth: true,
			params,
			callback: function(response) {
				//处理返回结果
				if (response.data.code === 0) {
					that.setState({
						list: response.data.data.list,
						page: parseInt(response.data.data.page, 10),
						pageSize: parseInt(response.data.data.page_size, 10),
						total: parseInt(response.data.data.total_count, 10)
					});
				} else {
					message.error(response.data.msg);
				}
			}
		});
	}
	//提交筛选表单
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.getMyCase();
			}
		});
	};
	//修改页码
	changePage(page, pageSize) {
		this.setState(
			{
				page,
				pageSize
			},
			() => this.getMyCase()
		);
	}

	//修改显示数量
	changePageSize(current, size) {
		this.setState(
			{
				page: current,
				pageSize: size
			},
			() => this.getMyCase()
		);
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
	// 接单
	orderClick(id) {
		let that = this;
		myRequest({
			method: "post",
			auth: true,
			path: "/lawyer/efficiency/coordination/" + id + "/grab",
			callback: function(response) {
				if (response.data.code === 0) {
					message.success("接单成功");
				} else {
					message.error(response.data.msg);
				}
			}
		});
	}
	componentDidMount() {
		this.getMyCase(); // 协同列表
		this.getRegion(); // 地区
	}
	// 初次不会执行变化后更新
	componentDidUpdate(props) {
		if (props.showBox !== this.props.showBox) {
			this.getMyCase();
		}
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Fragment>
				<div
					style={{
						width: 935,
						height: "100%",
						float: "right",
						marginLeft: 20,
						marginTop: 40
					}}
				>
					<Form onSubmit={this.handleSubmit}>
						{/* 内容搜索部分 */}
						<div
							style={{
								backgroundColor: "#fff",
								height: "70px",
								position: "relative",
								borderRadius: "4px"
							}}
						>
							<span className="m_type">类型：</span>
							<Form.Item>
								{getFieldDecorator(
									"type",
									{}
								)(
									<Select
										showSearch
										className="type_select"
										style={{ width: 240 }}
										placeholder="所有类型"
									>
										<Select.Option key={0}>异地查档</Select.Option>
										<Select.Option key={1}>案件代理</Select.Option>
										<Select.Option key={2}>其他事项</Select.Option>
									</Select>
								)}
							</Form.Item>
							<span className="m_type3">发布地区：</span>
							{getFieldDecorator("region")(
								<Cascader
									fieldNames={{
										value: "id",
										label: "name",
										children: "children"
									}}
									options={this.state.region}
									placeholder="请选择地区"
									style={{ width: 240 }}
									className="type_select3"
								/>
							)}
							<Button
								onClick={() =>
									this.props.changePopupBox([{ type: "public_cooperation" }])
								}
								size="small"
								style={{
									backgroundColor: "#2e3341",
									color: "#fff",
									float: "right",
									marginRight: "22px"
								}}
							>
								发布协同
							</Button>
						</div>
					</Form>
					<div className="cooperation_screen">
						<Radio.Group defaultValue="a" buttonStyle="solid" size="small">
							<Radio.Button value="a">
								时间
								<Icon type="swap" />
							</Radio.Button>
							<Radio.Button value="b">
								价格
								<Icon type="swap" />
							</Radio.Button>
						</Radio.Group>
						<Input
							size="small"
							style={{ width: 60, marginLeft: "20px" }}
							placeholder="￥"
						/>
						<span>&nbsp;~&nbsp;</span>
						<Input size="small" style={{ width: 60 }} placeholder="￥" />
						<Radio.Group
							defaultValue="a"
							buttonStyle="solid"
							size="small"
							style={{ float: "right" }}
						>
							<Radio.Button value="a">
								<Icon type="left" />
							</Radio.Button>
							<Radio.Button value="b">
								<Icon type="right" />
							</Radio.Button>
						</Radio.Group>
					</div>

					{this.state.list.map((item, index) => (
						<div key={item.id}>
							<Card
								hoverable
								style={{ width: "935px", marginTop: "20px", marginBottom: 20 }}
							>
								<div style={{ float: "left", marginLeft: "8px" }}>
									<span>类型:</span>
									<span style={{ marginLeft: "10px", color: "#333" }}>
										{item.type_plan}
									</span>
								</div>
								<div style={{ marginLeft: "5px" }}>
									<span className="cut_off6">
										截止时间：{moment(item.deadline).format("YYYY-MM-DD")}
									</span>
									<div style={{ clear: "both" }}></div>
									{(() => {
										switch (item.type) {
											case 1: // 异地查档
												return (
													<Fragment>
														<span
															style={{
																float: "right",
																color: "#77a3ff"
															}}
														>
															{item.file_search.price}&nbsp;元
														</span>
														<div className=" information">
															<span className=" informations">
																{item.file_search.content}
															</span>
														</div>
													</Fragment>
												);
											case 2: // 案件代理
												return (
													<Fragment>
														<span
															style={{
																float: "right",
																color: "#77a3ff"
															}}
														>
															{item.case_agent.price}&nbsp;元
														</span>
														<div className=" information">
															<span className=" informations">
																{item.case_agent.content}
															</span>
														</div>
													</Fragment>
												);
											case 3: // 其他事项
												return (
													<Fragment>
														<span
															style={{
																float: "right",
																color: "#77a3ff"
															}}
														>
															{item.others.price}&nbsp;元
														</span>
														<div className=" information">
															<span className=" informations">
																{item.others.content}
															</span>
														</div>
													</Fragment>
												);
											default:
												break;
										}
									})()}
								</div>
								<div style={{ clear: "both" }}></div>
								<div className="user_centre">
									<Avatar
										style={{
											height: "30px",
											width: "30px",
											marginLeft: "13px",
											marginTop: "-13px"
										}}
										src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
									/>
									<span
										style={{
											marginLeft: "4px",
											lineHeight: "50px",
											fontSize: "14px",
											color: "#333333"
										}}
									>
										{item.publisher.name}
									</span>
									<span
										style={{
											marginLeft: "20px",
											lineHeight: "50px",
											fontSize: "12px",
											color: "#ccc"
										}}
									>
										{moment().diff(moment(item.created), "day") > 5
											? moment(item.created).format("YYYY-MM-DD")
											: moment(item.created).fromNow()}
									</span>
									<Button
										onClick={() => this.orderClick(item.id)}
										size="small"
										className="btn_order"
										style={{
											backgroundColor: "#2e3341",
											color: "#fff",
											marginTop: "13px",
											marginRight: "15px"
										}}
									>
										接单
									</Button>
								</div>
							</Card>
							<div style={{ clear: "both" }}></div>
						</div>
					))}
					<div className="paginations">
						{/* 分页 */}
						<Pagination
							total={this.state.total}
							pageSize={this.state.pageSize}
							current={this.state.page}
							onChange={(page, pageSize) => this.changePage(page, pageSize)}
							onShowSizeChange={(current, size) =>
								this.changePageSize(current, size)
							}
							showSizeChanger
							showQuickJumper
							style={{ float: "right" }}
						/>
					</div>
				</div>
				<div style={{ clear: "both" }}></div>
			</Fragment>
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
		}
	};
};

//添加表单
Index = Form.create()(Index);
//添加数据仓库
Index = connect(mapState, mapDispath)(Index);

export default Index;
