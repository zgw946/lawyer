import React, { PureComponent, Fragment } from "react";
import "./index.css";
import { Modal } from "antd";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";
import { Form, Button, Icon, Input } from "antd";
// import { Input, message, Tooltip } from "antd";
class Index extends PureComponent {
	state = {
		list: [
			{
				id: 1
			},
			{
				id: 2
			}
		],
		editTags: false,
		inputValue: ""
	};

	render() {
		// const { getFieldDecorator } = this.props.form;
		return (
			<Modal
				title="收藏对话"
				width={450}
				style={{ marginTop: "120px" }}
				destroyOnClose={true}
				footer={null}
				onCancel={() =>
					this.props.changePopupBox([{ type: this.props.popupType }])
				}
				visible={true}
			>
				{/* <h2 style={{ color: "#333", fontWeight: "bold" }}>收藏对话</h2> */}

				<div className="collect_dialogue">
					{/* 收藏记录 */}
					{this.state.list.map(item => (
						<Fragment>
							<div className="collect_record" key={item.id}>
								<Icon type="message" theme="twoTone" />
								<span style={{ margin: "0px 0px 0px 8px" }}>你好啊,张律师</span>
							</div>
						</Fragment>
					))}
					<div>
						{this.state.editName ? (
							<Input
								ref={refs => (this.rename = refs)}
								className="w200"
								onBlur={() => this.updateUserInfo()}
							/>
						) : null}
					</div>
				</div>

				<div style={{ marginTop: "10px" }}>
					<button onClick={() => this.handClick()} style={{ color: "#4586FF" }}>
						新建对话文件
					</button>
					<Button
						size="small"
						htmlType="submit"
						style={{
							backgroundColor: "#333",
							color: "#fff",
							width: "70px",
							marginLeft: "228px"
						}}
					>
						确定
					</Button>
				</div>

				<div style={{ float: "left" }}></div>
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
Index = connect(null, mapDispath)(Form.create()(Index));

export default Index;
