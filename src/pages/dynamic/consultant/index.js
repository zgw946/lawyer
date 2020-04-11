import React, { Component,Fragment } from "react";
import "./index.css";
import { Avatar, Button } from "antd";
import InputField from "../inputField";
class Index extends Component {
	render() {
		return (
			<Fragment>
				<div className="hangs">
					<p className="p_hangs">我的助理</p>
				</div>
				<div className="mycontent">
					<div className="my_counselor">
						{/* 我的回答 */}
						<div className="counselor_answers">
							<img
								src={require("../../../statics/images/聊天界面/jqr.png")}
								className="counselor_robot2"
								alt=""
							/>
							<div className="counselor_blerk2">
								<span style={{ color: "#333" }}>您好，请问我能为您做些什么？</span>
							</div>
						</div>
						<div style={{ clear: "both" }}></div>
						{/* 用户的第二条提问 */}
						<div style={{ clear: "both" }}></div>
						<div className="counselor_consults">
							<Avatar
								shape="square"
								icon="user"
								style={{ float: "right", marginRight: "15px" }}
							/>
							<div className="userCounselor">
								<span>我想查看案件</span>
							</div>
						</div>
						<div style={{ clear: "both" }}></div>
						{/* 我的第二个回复 */}
						<div className="counselor_answers">
							<img
								src={require("../../../statics/images/聊天界面/jqr.png")}
								className="counselor_robot"
								alt=""
							/>
							<div className="mymaster">
								<p style={{ color: "#333" }}>
									主人，您收到了新的咨询!是否接待该客户？
								</p>
								<Button
									size="small"
									style={{
										backgroundColor: "#fcfcfc",
										color: "#b7b7b7",
										width: "120px",
										marginLeft: "5px"
									}}
								>
									拒绝
								</Button>
								<Button
									size="small"
									style={{
										backgroundColor: "#393e46",
										color: "#fff",
										width: "120px",
										marginLeft: "20px"
									}}
								>
									同意
								</Button>
							</div>
						</div>
						<div style={{ clear: "both" }}></div>
					</div>
				</div>
				<div>
					<InputField />
				</div>
			</Fragment>
		);
	}
}

export default Index;
