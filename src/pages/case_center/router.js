import React, { Component, Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "../../components/common/loading";
import "./router.css";
import { Menu } from "antd";
import { Link } from "react-router-dom";

//引入组件
const Index = Loadable({
	loader: () => import("./index"),
	loading: Loading
}); //我的案件
const CaseBin = Loadable({
	loader: () => import("./bin"),
	loading: Loading
}); //案件回收站
const CaseDetail = Loadable({
	loader: () => import("./detail"),
	loading: Loading
}); //案件详情
const Cooperation = Loadable({
	loader: () => import("./cooperation"),
	loading: Loading
}); //协同广场
const CooperationPublic = Loadable({
	loader: () => import("./public"),
	loading: Loading
}); //我发布的协同
const CooperationHandle = Loadable({
	loader: () => import("./handle"),
	loading: Loading
}); //我接到的协同
const Pigeonhole = Loadable({
	loader: () => import("./pigeonhole"),
	loading: Loading
}); //案件归档

class UserRouter extends Component {
	state = {
		mode: "inline",
		theme: "light",
		selected: "index"
	};
	render() {
		return (
			<Fragment>
				<div className="bjs">
					<div className="mycase">
						{/* 菜单栏 */}
						<div
							className="menus"
							style={{ width: 240, height: "100%", float: "left" }}
						>
							<div className="aj_mcase">
								<img
									className="aj"
									src={require("../../statics/images/icon/xt.png")}
									alt=""
								/>
								<p className="wjs">案件/协同</p>
							</div>
							<Menu
								defaultSelectedKeys={["index"]}
								selectedKeys={[this.state.selected]}
								mode="inline"
								theme="light"
								onSelect={nav => this.changeNav(nav)}
							>
								<Menu.Item key="index">
									<Link style={{ color: "#333333" }} to="/case_center/index">
										我的案件
									</Link>
								</Menu.Item>
                <Menu.Item key="pigeonhole">
                  <Link
                    style={{ color: "#333333" }}
                    to="/case_center/pigeonhole"
                  >
                    归档案件
                  </Link>
                </Menu.Item>
								<Menu.Item key="bin">
									<Link style={{ color: "#333333" }} to="/case_center/bin">
										回收站
									</Link>
								</Menu.Item>
								<Menu.Item key="cooperation">
									<Link
										style={{ color: "#333333" }}
										to="/case_center/cooperation"
									>
										协同广场
									</Link>
								</Menu.Item>
								<Menu.Item key="public">
									<Link style={{ color: "#333333" }} to="/case_center/public">
										我的协同
									</Link>
								</Menu.Item>
								<Menu.Item key="handle">
									<Link style={{ color: "#333333" }} to="/case_center/handle">
										协同案子
									</Link>
								</Menu.Item>
							</Menu>
						</div>

						<Switch>
							{/* <!-- 案件 、协同--> */}
							<Route exact path="/case_center/index" component={Index} />
							<Redirect	exact	from="/case_center/index" to="/case_center/index"/>
							<Route path="/case_center/bin" component={CaseBin} />
							<Route path="/case_center/cooperation" component={Cooperation} />
							<Route path="/case_center/public" component={CooperationPublic} />
							<Route path="/case_center/handle" component={CooperationHandle} />
							<Route path="/case_center/pigeonhole" component={Pigeonhole} />
							<Route path="/case_center/detail/:id" component={CaseDetail} />
						</Switch>
						<div className="clear"></div>
					</div>
					<div className="clear"></div>
				</div>
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
			selected: params[2] === "detail" ? "index" : params[2]
		});
	}
}
export default UserRouter;
