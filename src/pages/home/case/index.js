import React, { Component, Fragment } from "react";
import "./index.css";
import { Icon, Button, Divider } from "antd";
class Index extends Component {
	state = {
		list: [
			{
				id: 1,
				content: "滥用职权,受贿严重违纪",
				party: "当事人:",
				name: "某某某",
				yearTime: "2019年10月23日"
			},
			{
				id: 2,
				content: "滥用职权,受贿严重违纪",
				party: "当事人:",
				name: "某某某",
				yearTime: "2019年10月23日"
			},
			{
				id: 3,
				content: "滥用职权,受贿严重违纪",
				party: "当事人:",
				name: "某某某",
				yearTime: "2019年10月23日"
			},
			{
				id: 4,
				content: "滥用职权,受贿严重违纪",
				party: "当事人:",
				name: "某某某",
				yearTime: "2019年10月23日"
			},
			{
				id: 5,
				content: "滥用职权,受贿严重违纪",
				party: "当事人:",
				name: "某某某",
				yearTime: "2019年10月23日"
			}
		]
	};
	render() {
		return (
			<Fragment>
				{/* 标题名称,更多案件 */}
				<div className="case_title">
					<h3
						style={{
							float: "left",
							fontSize: "18px",
							color: "#333",
							fontWeight: "bold"
						}}
					>
						我的案件
					</h3>
					<span style={{ float: "right" }}>
						更多案件&nbsp;
						<Icon type="right" />
					</span>
				</div>
				<div style={{ clear: "both" }}></div>
				{/* 内容部分 */}
				{this.state.list.map(item => (
					<div key={item.id} style={{ marginTop: "10px" }}>
						<p
							style={{
								fontSize: "16px",
								color: "#333"
							}}
						>
							{item.content}
						</p>
						<Button size="small" type="primary">
							一审
						</Button>
						<span style={{ color: "#333", marginLeft: "27px" }}>
							{item.party}
						</span>
						<span style={{ color: "#333", marginLeft: "2px" }}>
							{item.name}
						</span>
						<span style={{ color: "#ccc", float: "right" }}>
							{item.yearTime}
						</span>
						<Divider />
					</div>
				))}
			</Fragment>
		);
	}
}
export default Index;
