import React, { PureComponent } from "react";
import "./index.css";
import { Modal } from "antd";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";
import { Button, Input } from "antd";
const { TextArea } = Input;
//公开咨询详情
class Index extends PureComponent {
	render() {
		return (
			<Modal
				title="添加便签"
				style={{ marginTop: "145px" }}
				width={450}
				destroyOnClose={true}
				footer={null}
				onCancel={() =>
					this.props.changePopupBox([{ type: this.props.popupType }])
				}
				visible={true}
			>
				<div>
					<TextArea
						placeholder="请输入便签内容..."
						rows={6}
						style={{ resize: "none", border: "none" }}
					/>
				</div>
				<div style={{ float: "right", marginTop: "15px" }}>
					<Button
						onClick={() => this.handClick()}
						style={{
							width: "70px",
							height: "30px",
							borderRadius: "8px",
							backgroundColor: "#CED1D6",
							color: "#fff",
							marginRight: 15
						}}
					>
						取消
					</Button>
					<Button
						style={{
							width: "70px",
							height: "30px",
							borderRadius: "8px",
							backgroundColor: "#2e3341",
							color: "#fff"
						}}
					>
						确认
					</Button>
				</div>
				<div style={{ clear: "both" }}></div>
			</Modal>
		);
	}
	handClick() {
		this.setState(this.props.changePopupBox([{ type: "memos" }]));
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

export default Index;
