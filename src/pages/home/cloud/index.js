import React, { Component } from "react";
import { Icon, Progress } from "antd";
import { MyIcon } from "../../../statics/IconFont";
class Index extends Component {
	render() {
		return (
			<div>
				{/* 标题 */}
				<div>
					<span style={{ fontSize: "16px", color: "#333", fontWeight: "bold" }}>
						云盘
					</span>
					<span style={{ float: "right" }}>
						进入&nbsp;
						<Icon type="right" />
					</span>
				</div>
				{/* 容量图 */}
				<div style={{ marginTop: "30px" }}>
					{/* 右 */}
					<div style={{ float: "left" }}>
						<span>已用1.43MB/1GB</span>
						<br />
						<Progress
							percent={50}
							strokeWidth={12}
							showInfo={false}
							style={{ width: "180px", marginTop: "7px" }}
						/>
					</div>
					{/* 左 */}
					<div style={{ float: "right" }}>
						<MyIcon
							type="iconyun-copy"
							style={{ fontSize: "65px", marginTop: "-10px" }}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Index;
