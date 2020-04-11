import React, { Component, Fragment } from "react";
import "./index.css";
import { changePopupBox } from "../../../../components/layout/popup/actionCreators";
import connect from "react-redux/lib/connect/connect";
import { Icon, Button, Checkbox, Avatar, message } from "antd";
import { myRequest } from "../../../../function";
import moment from "moment";
//案件成员
class Index extends Component {
	state = {
		list: [], //日程列表
		page: 1, //当前页码
		pageSize: 10, //每页显示数量
		total: 0 //数据总数
	};

	//获取日程列表
	getSchedule() {
		const that = this,
			params = {},
			id = this.props.caseId;

		params.page = that.state.page;
		params.page_size = that.state.pageSize;

		myRequest({
			method: "get",
			path: "/lawyer/efficiency/my_case/schedule/" + id,
			auth: true,
			params,
			callback: function(response) {
				console.log(response);

				//处理返回结果
				if (response.data.code !== 0) {
					message.error(response.data.msg);
				} else {
					const data = response.data.data;
					that.setState({
						list: data.list,
						page: parseInt(data.page, 10),
						pageSize: parseInt(data.page_size, 10),
						total: parseInt(data.total_count, 10)
					});
				}
			}
		});
	}
	// 删除日程
	deletes(id) {
		// const that = this;
		myRequest({
			method: "DELETE",
			path: "/lawyer/efficiency/my_case/schedule/" + id,
			auth: true,
			callback: function(response) {
				console.log(response);
				//处理返回结果
				if (response.data.code === 0) {
					message.success("删除日程成功");
					// 更新页面
					this.getSchedule();
				} else {
					message.error(response.data.msg);
				}
			}
		});
	}

	//初始化组件
	componentDidMount() {
		this.getSchedule();
	}

	render() {
		return (
			<Fragment>
				<div className="particulars5">
        
					<div className="addTsaks">
						<span
							style={{
								fontSize: "14px",
								color: "#393E46",
								lineHeight: "40px",
								marginLeft: "40px"
							}}
						>
							目前已有一个日程
						</span>
						<Button
							size="small"
							style={{
								backgroundColor: "#2E3341",
								float: "right",
								margin: "8px 20px"
							}}
							onClick={() =>
								this.props.changePopupBox([{ type: "add_schedule" }])
							}
							type="primary"
						>
							<Icon type="plus" />
							添加
						</Button>
					</div>
					<div className="work">
						{this.state.list.map(item => (
							<div key={item.id} className="mydexi">
								{/* 上半部 */}
								<div>
									<div style={{ float: "left" }}>
										<Icon
											style={{ marginLeft: "33px" }}
											type="calendar"
											theme="twoTone"
										/>
										<span style={{ marginLeft: "10px", fontWeight: "bold" }}>
											{moment(item.begin).format("YYYY-MM-DD")}
										</span>
										<Checkbox style={{ marginLeft: "100px" }}></Checkbox>
										<Icon
											style={{ marginLeft: "15px" }}
											type="dashboard"
											theme="twoTone"
										/>
										<span style={{ marginLeft: "15px" }}>
											{item.is_all_day
												? "全天"
												: moment(item.begin).format("HH:mm") +
												  "-" +
												  moment(item.end).format("HH:mm")}
										</span>
									</div>
									<div
										style={{
											float: "left",
											position: "absolute",
											left: "445px"
										}}
									>
										<Icon type="environment" theme="twoTone" />
										<span style={{ marginLeft: "5px" }}>{item.location}</span>
									</div>
									<div style={{ float: "right", marginRight: "60px" }}>
										<Icon
											type="form"
											style={{ marginRight: "20px", width: "15px" }}
										/>
										<Icon type="delete" onClick={() => this.deletes(item.id)} />
									</div>
								</div>
								<div style={{ clear: "both" }}></div>
								{/* 下 */}
								<div
									style={{
										marginTop: "10px",
										marginLeft: "3px"
									}}
								>
									<Avatar
										style={{
											marginLeft: "27px",
											width: "24px",
											height: "24px",
											marginTop: "-3px",
											float: "left"
										}}
										src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
									/>
									{item.participant.map(itemChildren => (
										<span style={{ marginLeft: "10px", float: "left" }}>
											{itemChildren.name}
										</span>
									))}

									<div style={{ position: "absolute", left: "292px" }}>
										<span style={{ color: "#666666" }}>上班</span>
										<span style={{ color: "#666666", marginLeft: "131px" }}>
											{item.title}
										</span>
									</div>
									<div style={{ clear: "both" }}></div>
								</div>
							</div>
						))}
					</div>
					<Button
						size="small"
						className="shows"
						style={{
							backgroundColor: "#EDEDED",
							margin: "8px 20px",
							width: "200px"
						}}
					>
						显示更多日程
					</Button>
				</div>
        
			</Fragment>
		);
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
