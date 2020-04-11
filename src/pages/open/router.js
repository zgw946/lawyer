import React, { Component, Fragment } from "react";
import "./router.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "../../components/common/loading";
import { Link } from "react-router-dom";
import { MyIcon } from "../../statics/IconFont";
import { Menu, Badge } from "antd";
//引入组件
const Index = Loadable({
	loader: () => import("./index"),
	loading: Loading
}); //法律广场
const Mine = Loadable({
	loader: () => import("./mine"),
	loading: Loading
}); //我回复的咨询

class CircleRouter extends Component {
	state = {
		mode: "inline",
		theme: "light",
		selected: "index"
	};
	render() {
		return (
			<Fragment>
				{/* <!-- 变换部分 --> */}
				<div className="laws">
					{/* 菜单栏 */}
					<div className="menus_open">
						<div
							style={{
								width: 240,
								height: "100%",
								float: "left",
								marginTop: "20px"
							}}
						>
							<Menu
								defaultSelectedKeys={["index"]}
								selectedKeys={[this.state.selected]}
								mode="inline"
								theme="light"
								onSelect={nav => this.changeNav(nav)}
							>
								<Menu.Item key="index">
									<Link style={{ color: "#333333" }} to="/open/index">
										<MyIcon
											type="iconqizhi-copy"
											style={{ fontSize: "16px" }}
										/>
										法律广场
									</Link>
								</Menu.Item>
								<Menu.Item key="mine">
									<Link style={{ color: "#333333" }} to="/open/mine">
										<MyIcon
											type="iconwenjian-copy"
											style={{ fontSize: "16px" }}
										/>
										我的回复
										<Badge
											count={10}
											style={{ fontSize: "12px", margin: "-4px 0px 0px 81px" }}
										/>
									</Link>
								</Menu.Item>
							</Menu>
						</div>
						<Switch>
							<Route path="/open/index" component={Index} />
							<Route path="/open/mine" component={Mine} />
							<Redirect exact from="/open/index" to="/open/index" />
						</Switch>
					</div>
          <div style={{clear:"both"}}></div>
				</div>
        <div style={{clear:"both"}}></div>
			</Fragment>
		);
	}
	changeNav(nav) {
		this.setState({
			selected: nav.key
		});
	}

	componentDidMount() {
		let pathName = this.props.location.pathname;
		let params = pathName.split("/");
		this.setState({
			selected: params[2] ? params[2]:"index"
		});
	}
}

export default CircleRouter;
