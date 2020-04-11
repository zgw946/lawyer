import React, { Component } from "react";
import "./index.css";
// import { Icon, Button, Divider } from "antd";
import Case from "./case"; //我的案件
import Assistant from "./assistant"; //我的助理
import Cloud from "./cloud"; //我的助理
import Memo from "./memo"; //便签
import Square from "./square"; //法律广场
import Schedule from "./schedule"; //日程
class Index extends Component {
	state = {
		list: [
			{
				id: 1,
				content: "滥用职权,受贿严重违纪",
				party: "当事人:",
				name: "某某某",
				yearTime: "2019年10月23日"
			}
		]
	};
	render() {
		return (
			<div className="law_home">
				{/* 上层背景 */}
				<div className="law_headerBjs">
					{/* 1200 内容 */}
					<div className="law_homesTop">
						{/* 上半部内容部分 */}
						{/* 我的案件 */}
						<div className="law_case">
							<Case />
						</div>
						{/* 我的助理 */}
						<div className="myAssistant">
							<Assistant />
						</div>
						{/* 我的云盘 */}
						<div className="my_cloud">
							<Cloud />
						</div>
					</div>
				</div>
				{/* 中间部分 */}
				<div className="moemo_centre">
					{/* 便签 */}
					<Memo />
				</div>
				{/* 底部 */}
				<div className="law_footerBjs">
					<div className="law_footer">
						{/* 法律广场 */}
						<div className="law_square">
							<Square />
						</div>
            {/* 日程 */}
            <div className="law_schedule">
              <Schedule />
            </div>
					</div>
					<div style={{ clear: "both" }}></div>
				</div>
			</div>
			// <div style={{ clear: "both" }}></div>
		);
	}
}
export default Index;
