import React, { PureComponent } from "react";
import "./index.css";
import { Modal } from "antd";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";

//发布协同
class Index extends PureComponent {
	render() {
		return (
			<Modal
				width={600}
				destroyOnClose={true}
				footer={null}
				onCancel={() =>
					this.props.changePopupBox([{ type: this.props.popupType }])
				}
				visible={true}
			>
				<div>
					<p className="Issued">发布协同</p>
					<img
						onClick={() =>
							this.props.changePopupBox([{ type: "investigations" }])
						}
						style={{ cursor: "pointer" }}
						src={require("../../../../statics/images/办案中心/ydcl.png")}
						alt=""
					/>
					<img
						onClick={() => this.props.changePopupBox([{ type: "entrust" }])}
						style={{ marginLeft: "38px", cursor: "pointer" }}
						src={require("../../../../statics/images/办案中心/axjt.png")}
						alt=""
					/>
					<img
						onClick={() => this.props.changePopupBox([{ type: "rest" }])}
						style={{ marginLeft: "33px", cursor: "pointer" }}
						src={require("../../../../statics/images/办案中心/qtsx.png")}
						alt=""
					/>
					<div style={{ margin: "30px" }}>
						<span
							style={{ fontSize: "16px", color: "#393E46", marginLeft: "10px" }}
						>
							异地查档
						</span>
						<span
							style={{
								fontSize: "16px",
								color: "#393E46",
								marginLeft: "135px"
							}}
						>
							案件委托
						</span>
						<span
							style={{
								fontSize: "16px",
								color: "#393E46",
								marginLeft: "136px"
							}}
						>
							其他事项
						</span>
					</div>
				</div>
			</Modal>
		);
	}
}

// const mapDispath = (dispath) => {
//   return {
//     //改变弹出框状态
//     changePopupBox(info) {
//       dispath(changePopupBox(info));
//     }
//   };
// };

// //数据仓库
// Index = connect(null, mapDispath)(Index);

// export default Index;

const mapDispath = dispath => {
	return {
		//改变弹出框状态
		changePopupBox(info) {
			dispath(changePopupBox(info));
		}
	};
};

export default connect(null, mapDispath)(Index);
