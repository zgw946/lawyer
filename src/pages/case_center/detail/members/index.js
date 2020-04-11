import React, { Component, Fragment } from "react";
import "./index.css";
import { changePopupBox } from "../../../../components/layout/popup/actionCreators";
import connect from "react-redux/lib/connect/connect";
import { Icon, Avatar, Card, message, Modal } from "antd";
import { myRequest } from "../../../../function";
import moment from "moment";

//案件成员
class Index extends Component {
	state = {
		list: [], //成员列表
	};

	//获取成员列表
	getMembers() {
		const that = this,
			id = this.props.caseId;
		myRequest({
			method: "get",
			path: "/lawyer/efficiency/my_case/member/" + id,
			auth: true,
			callback: function(response) {
				//处理返回结果
				if (response.data.code !== 0) {
					message.error(response.data.msg);
				} else {
					that.setState({
						list: response.data.data
					});
				}
			}
		});
  }


	//移除成员
	removeMembers(id) {
		Modal.confirm({
			title: "移除成员",
			content: "你确定要移除该成员吗？",
			onOk: () => {
				const that = this;
				//提交请求
				myRequest({
					method: "delete",
					path: "/lawyer/efficiency/my_case/member/" + id,
					auth: true,
					callback: function(response) {
						//处理返回结果
						if (response.data.code !== 0) {
							message.error(response.data.msg);
						} else {
							message.success("移除成功", 1);
							that.getMembers();
						}
					}
				});
			}
		});
	}
	//初始化组件
	componentDidMount() {
		this.getMembers();
	}
	render() {
		return (
			<Fragment>
				<div className="particulars3">
					<p style={{ fontSize: "14px", lineHeight: "40px", color: "#333" }}>
						目前已经有个 <span style={{ color: "#79a8ff" }}>6</span>成员
					</p>
					{this.state.list.map((item, index) => (
						<div key={item.id}>
							<Card
								className="mycards"
								hoverable
								style={{
									width: 300,
									marginBottom: 30,
									marginRight: (index + 1) % 3 === 0 ? 0 : 17
								}}
							>
								{/* 头像 */}
								<div style={{ float: "left" }}>
									<Avatar
										src={item.head_img}
										shape="square"
										size="large"
										icon="user"
									/>
								</div>
								{/* 律师信息 */}
								<div style={{ float: "left", marginLeft: "15px" }}>
									<span style={{ fontSize: "16px", color: "#393E46" }}>
										{item.name}
									</span>
									<br />
									<span style={{ fontSize: "12px", color: "#B3B3B3" }}>
										{item.location}
									</span>
									<span
										style={{
											fontSize: "12px",
											color: "#B3B3B3",
											marginLeft: "8px"
										}}
									>
										|
									</span>
									<span
										style={{
											fontSize: "12px",
											color: "#B3B3B3",
											marginLeft: "8px"
										}}
									>
										{item.type}
									</span>
								</div>
								{/* 删除按钮 */}
								<div style={{ float: "right" }}>
									<Icon
										onClick={() => this.removeMembers(item.id)}
										className="deletets"
										type="delete"
									/>
								</div>
								<div style={{ clear: "both" }}></div>
								{/* 专门介绍 */}
								<div style={{ marginTop: "15px" }}>
									<div>
										<Icon type="bank" style={{ color: "#4586FF" }} />
										<span style={{ marginLeft: "8px", color: "#333" }}>
											事务所:
										</span>
										<span style={{ marginLeft: "5px", color: "#666666" }}>
											{item.office}
										</span>
									</div>
									<div style={{ marginTop: "10px" }}>
										<Icon type="trophy" style={{ color: "#4586FF" }} />
										<span style={{ marginLeft: "8px", color: "#333" }}>
											专长:
										</span>
										<span style={{ marginLeft: "20px", color: "#666666" }}>
											{item.expertise}
										</span>
									</div>
								</div>
								<div style={{ clear: "both" }}></div>
								<div style={{ marginTop: 30, marginBottom: "7px" }}>
									<span
										style={{
											color: "#CCCCCC",
											fontSize: "12px",
											float: "left"
										}}
									>
										进入时间：{moment(item.join_time).format("YYYY年MM月DD日")}
									</span>
									<span
										onClick={() =>this.props.changePopupBox([{ type: "case_jurisdiction", extra: this.props.caseId }])}
										style={{
											float: "right",
											color: "#4586FF",
											fontSize: "12px"
										}}
									>
										权限
									</span>
									<div style={{ clear: "both" }}></div>
								</div>
							</Card>
						</div>
					))}
					<div className="addmember">
						<div className="addmemberAdd">
							<Icon
								onClick={() =>
									this.props.changePopupBox([
										{ type: "mymember", extra: this.props.caseId }
									])
								}
								className="add_name"
								type="plus-circle"
								theme="filled"
							/>
							<span className="add_yuan">添加成员</span>
						</div>
					</div>
				</div>
				<div style={{ clear: "both" }}></div>
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
