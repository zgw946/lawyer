import React, { Component, Fragment } from "react";
import "./index.css";
import Loadable from "react-loadable";
import Loading from "../../components/common/loading";
import { Link } from "react-router-dom";

const Footer = Loadable({
	loader: () => import("../../components/layout/footer"),
	loading: Loading
}); //底部

//首页
class Index extends Component {
	state = {
		minHeight: 0 //中间内容部分的最小高度
	};

	render() {
		return (
			<Fragment>
				<div className="login_headers">
					<div className="header_containers">
						<div className="headers_left lf">
							{/* login图片 */}
							<Link to="/">
								<div className="logins_imgs">
									<img
										width="100%"
										height="100%"
										src={require("../../statics/images/logo/web_logo2.png")}
										alt=""
									/>
								</div>
							</Link>
						</div>
						<div className="headers_rights rf">
							<div className="rf">
								<Link to="/login/normal" className=" btn_click">
									登录/注册
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="homeIndex" style={{ minHeight: this.state.minHeight }}>
					首页
				</div>
				<Footer />
			</Fragment>
		);
	}

	//初始化组件
	componentDidMount() {
		this.setState({
			minHeight: document.body.clientHeight - 100
		});
	}
}

export default Index;
