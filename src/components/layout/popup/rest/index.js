import React, { PureComponent } from "react";
import "./index.css";
import { Modal } from "antd";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";
import { myRequest } from "../../../../function";
import { Form, Input, Button, Cascader, DatePicker, message } from "antd";
const { TextArea } = Input;
//新增案件
class Index extends PureComponent {
	state = {
		region: [] // 地区
	};
	//提交表单
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let that = this;
				//提交请求
				myRequest({
					method: "post",
					path: "/lawyer/efficiency/coordination/others",
					auth: true,
					data: {
						deadline: values.time,
						contact: values.linkman,
						tel: values.tel,
						city: values.regions[1], // 执业证城市ID
						content: values.content,
						price: parseFloat(values.price) //价格
					},
					callback: function(response) {
						//处理返回结果
						if (response.data.code === 0) {
							message.success("添加其他协同信息成功");
							that.props.changePopupBox([{ type: "rest" }]);
						} else {
							message.error(response.data.msg);
						}
					}
				});
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
		this.getRegion(); // 地区
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Modal
				width={650}
				destroyOnClose={true}
				footer={null}
				onCancel={() =>
					this.props.changePopupBox([{ type: this.props.popupType }])
				}
				visible={true}
			>
				<p className="adds">异地查档</p>
				<Form
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 19 }}
					onSubmit={this.handleSubmit}
				>
					<Form.Item label="截止时间">
						{getFieldDecorator("time", {
							rules: [{ required: true, message: "请输入截止时间" }]
						})(<DatePicker />)}
					</Form.Item>
					<Form.Item label="联系人">
						{getFieldDecorator("linkman", {
							rules: [{ required: true, message: "请输入联系人" }]
						})(<Input placeholder="请输入联系人" />)}
					</Form.Item>
					<Form.Item label="联系方式">
						{getFieldDecorator("tel", {
							rules: [{ required: true, message: "请输入联系方式" }]
						})(<Input placeholder="请输入联系方式" />)}
					</Form.Item>
				
					<Form.Item label="地区选择" style={{ marginBottom: "15px" }}>
						{getFieldDecorator("regions", {
							rules: [{ required: true, message: "请选择地区" }]
						})(
							<Cascader
								fieldNames={{
									value: "id",
									label: "name",
									children: "children"
								}}
								options={this.state.region}
								placeholder="请选择地区"
							/>
						)}
					</Form.Item>
					<Form.Item label="详细">
						{getFieldDecorator("content", {
							rules: [{ required: true, message: "请输入详细内容" }]
						})(
							<TextArea
								rows={2}
								placeholder="请输入详细内容"
								style={{ resize: "none" }}
							/>
						)}
					</Form.Item>
					<Form.Item label="价格">
						{getFieldDecorator("price", {
							rules: [{ required: true, message: "请输入价格内容" }]
						})(
							<TextArea
								rows={1}
								placeholder="请输入价格内容"
								style={{ resize: "none" }}
							/>
						)}
					</Form.Item>
					<div style={{ textAlign: "center" }}>
						<Button
							size="small"
							style={{
								color: "#ccc",
								borderRadius: "4px",
								width: "80px",
								marginRight: "15px"
							}}
						>
							取消
						</Button>
						<Button
							htmlType="submit"
							size="small"
							style={{
								backgroundColor: "#2e3341",
								color: "#FFF",
								borderRadius: "4px",
								width: "80px",
								marginLeft: "15px"
							}}
						>
							确定
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
export default connect(null, mapDispath)(Form.create()(Index));
