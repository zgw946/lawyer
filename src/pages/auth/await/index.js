import React, {Component, Fragment} from "react";
import "./index.css";
import { Link } from "react-router-dom";
import {Button, message} from "antd";
import {myRequest} from "../../../function";
class Index extends Component {

	state={
		status : 0,//认证状态
		reason :"",//不通过原因
	};

  //前往认证
  getStatus() {
    let that = this;

    // 判断是几种状态 （0[未认证],1[待审核],2[认证通过],3[认证不通过]）
    myRequest({
      method: "get",
      path: "/common/lawyer/identification/is_identity",
      auth: true,
      callback: function(response) {
        //处理返回结果
        if (response.data.code !== 0) {
          message.error(response.data.msg);
        } else {
          const status = response.data.data.status;

          switch (status) {
            case 0: //1[未认证]
              that.props.history.push("/login/pre_identity");
              break;
            case 2: //2[认证通过]
              that.props.history.push("/home");
              break;
            default://未认证
              that.setState({
								status : response.data.data.status,
								reason : response.data.data.reason
              });
              break;
          }
        }
      }
    });
  }

  //初始化组件
  componentDidMount(){
  	this.getStatus();
	}

	render() {
		return (
      <div className="authentications2">
				{
					this.state.status === 1 ? (
						<Fragment>
              <div style={{ textAlign: "center", marginTop: "90px" }}>
                <img
                  src={require("../../../statics/images/各类图片/renzhengzhong.png")}
                  alt=""
                />
              </div>
              <p className="my_awaits">你的信息正在认证，请耐心等待</p>
              <div style={{ textAlign: "center" }}>
                <Link to="/">
                  <Button
                    style={{
                      backgroundColor: "#2e3341",
                      color: "#FFF",
                      marginTop: "40px",
                      width: "440px",
                      borderRadius: "8px"
                    }}
                  >
                    返回仁法网
                  </Button>
                </Link>
              </div>
						</Fragment>
					) : (
						<Fragment>
              <div className="authentications2">
                <div style={{ textAlign: "center", marginTop: "90px" }}>
                  <img
                    src={require("../../../statics/images/各类图片/shibai.png")}
                    alt=""
                  />
                </div>
              </div>
              <p className="awaits">
                你的信息认证没有通过，如需进入仁法网则需要重新认证
              </p>
              <p className="awaits">
                不通过原因：<span className="c-ff4949">{this.state.reason}</span>
              </p>
              <div style={{ textAlign: "center" }}>
                <Link to={"/auth/reidentity"}>
                  <Button
                    style={{
                      backgroundColor: "#2e3341",
                      color: "#FFF",
                      marginTop: "40px",
                      width: "440px",
                      borderRadius: "8px"
                    }}
                  >
                    重新认证
                  </Button>
                </Link>
              </div>
						</Fragment>
					)
				}

      </div>
		);
	}
}
export default Index;
