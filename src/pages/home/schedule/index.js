import React, { Component, Fragment } from "react";
import "./index.css";
import { Icon } from "antd";
class Index extends Component {
	state = {
		list: [
			{
				id: 1,
				time: "14:00-14:50",
				content: "预约了庄先生在法仁律师事务所见面",
				site: "法仁律师事务所"
			},
			{
				id: 2,
				time: "14:00-14:50",
				content: "预约了庄先生在法仁律师事务所见面",
				site: "法仁律师事务所"
			},
			{
				id: 3,
				time: "14:00-14:50",
				content: "预约了庄先生在法仁律师事务所见面",
				site: "法仁律师事务所"
			}
		]
	};
	render() {
		return (
			<Fragment>
				{/* 标题 */}
				<div>
					<span style={{ color: "#333", fontWeight: "bold", fontSize: "16px" }}>
						日程
					</span>
					<span style={{ color: "#999", fontSize: "14px", float: "right" }}>
						更多&nbsp;
						<Icon type="right" />
					</span>
					<p style={{ fontSize: "18px", color: "#5691FF", marginTop: "10px" }}>
						2019.12.25(今天)
					</p>
					{/* 日程详细 */}
				</div>
				{this.state.list.map(item => (
					<div key={item.id} style={{marginTop:"20px"}}>
						<p className="law_point"></p>
						<p style={{ marginLeft: "19px", marginTop: "-6px", float: "left" }}>
							{item.time}
						</p>
						<div style={{ clear: "both" }}></div>
						<div className="border_content">
							<p style={{fontSize:"16px",color:"#333"}}>{item.content}</p>
							<p style={{fontSize:"14px",color:"#666"}}><Icon type="environment" />&nbsp;&nbsp;{item.site}</p>
						</div>
            <div style={{ clear: "both" }}></div>
					</div>
				))}
			</Fragment>
		);
	}
}
export default Index;
