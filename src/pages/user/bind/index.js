import React, { Component, Fragment } from "react";
import "./index.css";
import { changePopupBox } from "../../../components/layout/popup/actionCreators";
import connect from "react-redux/es/connect/connect";
import { Icon, Button,message } from "antd";
//绑定界面
class Index extends Component {
	render() {
		const { userInfo } = this.props; //用户信息
		return (
			<Fragment>
				{userInfo ? (
					<div className="bing">
						<div className="myMobile">
							<Icon
								type="mobile"
								style={{ fontSize: "28px", color: "#4586ff" }}
							/>
							<span style={{ marginLeft: "15px", color: "#333" }}>手机</span>
							<span style={{ color: "#333", marginLeft: "185px" }}>
								{userInfo.user.mobile}
							</span>
							{userInfo.user.mobile === userInfo.user.mobile ? (
								<Button
									size="small"
									onClick={() =>
										this.props.changePopupBox([{ type: "relieve_mobile" }])
									}
									style={{
										backgroundColor: "#fff",
										color: "#ccc",
										marginLeft: "270px"
									}}
								>
									解除绑定
								</Button>
							) : (
								<Button
									size="small"
									onClick={() =>
										this.props.changePopupBox([{ type: "bind_mobile" }])
									}
									style={{
										backgroundColor: "#fff",
										color: "#ccc",
										marginLeft: "270px"
									}}
								>
									立即绑定
								</Button>
							)}
						</div>
						<div className="my_Wechat">
							<Icon
								type="wechat"
								style={{ fontSize: "28px", color: "#00c800" }}
							/>
							<span style={{ marginLeft: "15px", color: "#333" }}>微信</span>
							<span style={{ color: "#333", marginLeft: "185px" }}>未绑定</span>
							<Button
								size="small"
                // onClick={() => this.props.changePopupBox([{ type: "bind_wx" }])}
                onClick={() => this.info()}
								style={{
									backgroundColor: "#2e3341",
									color: "#fff",
									marginLeft: "310px"
								}}
							>
								绑定
							</Button>
						</div>
					</div>
				) : null}
			</Fragment>
		);
  }
  	// 微信
	info() {
		message.info("此功能尚未开发");
	}
}
const mapState = state => {
	return {
		userInfo: state.getIn(["header", "userInfo"]) //用户信息
	};
};
const mapDispath = dispath => {
	return {
		//改变弹出框状态
		changePopupBox(info) {
			dispath(changePopupBox(info));
		}
	};
};
//数据仓库
export default connect(mapState, mapDispath)(Index);
