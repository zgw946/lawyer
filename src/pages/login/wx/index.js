import React, {Component, Fragment} from "react";
import "./index.css"
import {Icon} from "antd";
import {Link} from "react-router-dom";

//微信登录页面
class Index extends Component {

  render() {
    return (
      <Fragment>
        <div>
          <Link to="/login/normal">
            <Icon type="left"/>
          </Link>
        </div>

        <h4 className="wxdelu">微信登录</h4>
        {/* 个人二维码 */}
        <img
          className="orwm"
          src={require("../../../statics/images/icon/ewm.png")}
          alt=""
        />
        <p className="p_wxdl">请使用微信扫</p>
        <p style={{marginTop: "-10px"}} className="p_wxdl">码登录</p>
        <p style={{marginTop: "-10px"}} className="p_wxdl">“仁法网”</p>

      </Fragment>
    );
  }
}

export default Index;
