import React, { Component, Fragment } from "react";
import "./index.css";
import { changePopupBox } from "../../../components/layout/popup/actionCreators";
import connect from "react-redux/es/connect/connect";
import { Icon, Card, Progress, Button } from "antd";

class Index extends Component {
	state = {
		percent: 0, // 进度条
		disabledBtn: false,
		// show: -1, //当前显示的描述框
		data: [
			{
				id: 1,
				content: "欢迎光临本寒舍啊哈哈哈哈啊哈哈哈"
			},
			{
				id: 2,
				content: "欢迎光临本寒舍啊哈哈哈哈啊哈哈哈"
			},
			{
				id: 3,
				content: "欢迎光临本寒舍啊哈哈哈哈啊哈哈哈"
			},
			{
				id: 4,
				content: "欢迎光临本寒舍啊哈哈哈哈啊哈哈哈"
			},
			{
				id: 5,
				content: "欢迎光临本寒舍啊哈哈哈哈啊哈哈哈"
			}
		]
	};
	render() {
		return (
			<div>
				{/* 标题 */}
				<div>
					<span style={{ color: "#333", fontWeight: "bold", fontSize: "16px" }}>
						便签
					</span>
					<span
						style={{ float: "right", color: "#666" }}
						onClick={() => this.props.changePopupBox([{ type: "memos" }])}
					>
						添加
						<Icon type="plus" />
					</span>
					{this.state.data.map((item, index) => (
						<Fragment key={item.id}>
							<div
								// style={{display:"flex"}}
								key={item.id}
								// onMouseEnter={() => this.showBox(index)}
								// onMouseLeave={() => this.HideBox()}
							>
								<Card
									hoverable
									className="memo_card"
									style={{ marginRight: (index + 1) % 5 === 0 ? 0 : 30 }}
								>
									<p style={{ fontSize: "14px", color: "#333",marginBottom:"5px" }}>
										{item.content}
									</p>
									<div style={{ float: "right" ,position:"absolute",bottom:"10px",right:"10px"}}>
										<Icon type="delete" theme="twoTone" />
									</div>
								</Card>
							</div>
						</Fragment>
					))}
				</div>
				<div style={{ clear: "both" }}></div>
				{/* 进度切换部分 */}
				<div style={{ marginTop: "20px" }}>
					<Progress percent={this.state.percent} style={{ width: "500px" }} />
					{/* <ButtonGroup> */}
					<Button
						style={{
							backgroundColor: "#e9ecf2",
							marginLeft: "20px",
							borderRadius: "15px",
							color: "#999"
						}}
						onClick={this.decline}
						icon="left"
					/>
					<Button
						type="primary"
						style={{ marginLeft: "15px", borderRadius: "15px", color: "#fff" }}
						onClick={this.increase}
						icon="right"
					/>

					{/* </ButtonGroup> */}
				</div>
			</div>
		);
	}
	// 进度条
	increase = () => {
		let percent = this.state.percent + 10;
		if (percent > 100) {
			percent = 100;
		}
		this.setState({ percent });
	};

	decline = () => {
		let percent = this.state.percent - 10;
		if (percent < 0) {
			percent = 0;
		}
		this.setState({ percent });
	};
	// //显示隐藏的文字框
	// showBox(index) {
	// 	this.setState(() => ({
	// 		show: index
	// 	}));
	// }

	// //隐藏的文字框
	// HideBox() {
	// 	this.setState(() => ({
	// 		show: -1
	// 	}));
	// }
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
