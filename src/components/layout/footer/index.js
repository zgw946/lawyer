import React, { Component, Fragment } from "react";
import "./index.css";
import { BackTop } from "antd";
//工作界面底部
class Index extends Component {
	render() {
		return (
			<Fragment>
				<div className="myfooter">
					<BackTop />
					<p className="fosters">粤ICP备19021120号-1</p>
				</div>
			</Fragment>
		);
	}
}

export default Index;
