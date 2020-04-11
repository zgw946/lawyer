import React, { PureComponent } from "react";
import "./index.css";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";
import { Button, Form, message, Modal, Tree } from "antd";
import { myRequest } from "../../../../function";
const { TreeNode } = Tree;
//修改成员权限
class Index extends PureComponent {
	state = {
		jurisdiction: [], //所有权限列表
		checkedKeys: [] //当前选中的节点
	};
	//获取所有成员权限列表
	getJurisdiction() {
		const that = this;
		myRequest({
			method: "get",
			path: "/lawyer/efficiency/my_case/member/jurisdiction",
			auth: true,
			callback: function(response) {
				//处理返回结果
				if (response.data.code === 0) {
					that.setState(
						{
							jurisdiction: response.data.data
						},
						() => {
							that.permission();
						}
					);
				} else {
					message.error(response.data.msg);
				}
			}
		});
	}
	// 获取成员的权限
	permission() {
		let that = this;
		myRequest({
			method: "get",
			path:
				"/lawyer/efficiency/my_case/member/jurisdiction/" + this.props.caseId,
			auth: true,
			callback: function(response) {
				console.log(response.data.data);
				//处理返回结果
				if (response.data.code === 0) {
					that.setState({
						checkedKeys: response.data.data
					});
				} else {
					message.error(response.data.msg);
				}
			}
		});
	}
	modification() {
		let that = this;
		myRequest({
			method: "put",
			path:
				"/lawyer/efficiency/my_case/member/jurisdiction/" + this.props.caseId,
			auth: true,
			data: {
				authority: JSON.stringify(that.state.checkedKeys)
			},
			callback: function(response) {
				//处理返回结果
				if (response.data.code === 0) {
					message.success("权限设置成功");
					that.props.changePopupBox([{ type: "case_jurisdiction" }]);
				} else {
					message.error(response.data.msg);
				}
			}
		});
	}
	// 点击复选框触发
	onCheck = checkedKeys => {
		this.setState({ checkedKeys });
	};
	// 点击树节点触发
	onSelect = (checkedKeys, info) => {
		console.log("onSelect", info);
		this.setState({ checkedKeys });
	};
	//初始化组件
	componentDidMount() {
		this.getJurisdiction(); //获取所有成员权限列表
	}
	render() {
		// const { getFieldDecorator } = this.props.form;

		return (
			<Modal
				style={{ marginTop: "70px" }}
				width={300}
				destroyOnClose={true}
				footer={null}
				onCancel={() =>
					this.props.changePopupBox([{ type: this.props.popupType }])
				}
				visible={true}
			>
				<Form onSubmit={this.handleSubmit}>
					<div>
						<h3 className="invitename">成员权限</h3>
					</div>
					<Tree
						onCheck={this.onCheck}
						checkedKeys={this.state.checkedKeys}
						onSelect={this.onSelect}
						style={{ marginLeft: 50 }}
						checkable
					>
						{this.state.jurisdiction.map(item => (
							<TreeNode title={item.name} key={item.key}>
								{item.authority.map(itemChildren => (
									<TreeNode key={itemChildren.key} title={itemChildren.name} />
								))}
							</TreeNode>
						))}
					</Tree>

					<div style={{ clear: "both" }}></div>
					<div className="amounts">
						<Button
							onClick={() => this.modification()}
							size="small"
							// htmlType="submit"
							style={{
								backgroundColor: "#2e3341",
								color: "#FFF",
								marginRight: "5px"
							}}
						>
							确认
						</Button>
						<Button
							size="small"
							onClick={() =>
								this.props.changePopupBox([{ type: "case_jurisdiction" }])
							}
							style={{
								backgroundColor: "#666",
								color: "#FFF",
								marginLeft: "5px"
							}}
						>
							取消
						</Button>
					</div>
				</Form>
			</Modal>
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

//数据仓库
Index = connect(null, mapDispath)(Index);

//添加表单
Index = Form.create()(Index);

export default Index;
