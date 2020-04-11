import React, { PureComponent } from "react";
import "./index.css";
import { Modal, message } from "antd";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";
import { Form, Input, Button } from "antd";
import { myRequest } from "../../../../function";
class Index extends PureComponent {
	state = {};
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Modal
				width={400}
				destroyOnClose={true}
				footer={null}
				onCancel={() =>
					this.props.changePopupBox([{ type: this.props.popupType }])
				}
				visible={true}
			>
				<h2 style={{ fontWeight: "bold", textAlign: "center" }}>新建任务</h2>
				<Form
					labelCol={{ span: 7 }}
					wrapperCol={{ span: 15 }}
					onSubmit={this.handleSubmit}
				>
					<Form.Item label="任务标题">
						{getFieldDecorator("taskName", {
							rules: [{ required: true, message: "请输入任务标题" }]
						})(
							<Input
								placeholder="请输入任务标题"
								style={{ marginTop: "4px" }}
							/>
						)}
					</Form.Item>
					<Button
						onClick={() => this.props.changePopupBox([{ type: "add_task" }])}
						style={{
							backgroundColor: "#fff",
							color: "#ccc",
							height: "26px",
							marginLeft: "105px"
						}}
					>
						取消
					</Button>
					<Button
						htmlType="submit"
						style={{
							backgroundColor: "#2e3341",
							color: "#fff",
							height: "26px",
							marginLeft: "10px"
						}}
					>
						确认
					</Button>
				</Form>
			</Modal>
		);
	}
	// 新建任务列
	//提交筛选表单
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let that = this;
				myRequest({
					method: "POST",
					path:
						"/lawyer/efficiency/my_case/task/" +
						that.props.lawyerId +
						"/column",
					data: {
						name: values.taskName
					},
					auth: true,
					callback: function(response) {
						console.log(response);
						//处理返回结果
						if (response.data.code === 0) {
							message.success("新建列表成功");
							//关闭弹框
							that.props.changePopupBox([{ type: "add_task" }]);
						} else {
							message.error(response.data.msg);
						}
					}
				});
			}
		});
	};
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
