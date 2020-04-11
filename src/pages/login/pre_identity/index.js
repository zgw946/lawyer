import React, { Component, Fragment } from "react";
import "./index.css";
import { Button} from "antd";
import {Link} from "react-router-dom";

//认证前置页面
class Index extends Component {

	render() {
		return (
			<Fragment>
				<p className="sfrz">进入身份认证</p>
				{/* 内容说明 */}
				<div style={{ marginTop: "90px" }}>
					<p className="explains">
						为了保证所有咨询用户的法律知识的准确性以及法律权威性
					</p>
					<p
						style={{
							textAlign: "center",
							fontSize: "14px",
							color: "#666666"
						}}
					>
						用户只有完成所有的信息认证后才可以进入网站
					</p>
				</div>
        <Link to={"/auth/identity"}>
          <Button
            style={{ borderRadius: "8px" }}
            className="btn_authentications"
            type="primary"
          >
            前往认证
          </Button>
        </Link>

			</Fragment>
		);
	}
}

export default Index;
