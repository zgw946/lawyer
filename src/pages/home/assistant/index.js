import React, { Component, Fragment } from "react";
import "./index.css";
import { Divider, Avatar, Badge, Icon } from "antd";
class Index extends Component {
  state = {
    list: [
      {
        id: 1,
        avatarImg: "",
        new_num: 2,
        assistant: "我的助理",
        yearTime: "15:00",
        content: "你好请问我能为你做些什么"
      },
      {
        id: 2,
        avatarImg: "",
        new_num: 0,
        assistant: "系统消息",
        yearTime: "15:00",
        content: "设置登录密码"
      },
      {
        id: 3,
        avatarImg: "",
        new_num: 0,
        assistant: "张先生",
        yearTime: "15:00",
        content: "你好,请问我能你为做些什么"
      }
    ]
  };
  render() {
    return (
      <Fragment>
        {this.state.list.map(item => (
          <div key={item.id} style={{ clear: "both" }}>
            {/* 头像 */}
            <div style={{ float: "left" }}>
              <Badge count={item.new_num}>
                <Avatar
                  shape="square"
                  icon="user"
                  src={item.avatarImg}
                // className="name_avatar"
                />
              </Badge>
            </div>
            {/* 我的内容信息 */}
            <div style={{ float: "left" }}>
              <p className="my_assistant">{item.assistant}</p>
              <p
                style={{
                  margin: "3px 0px 0px 20px",
                  fontSize: "12px",
                  color: "#999"
                }}
                className="more_content"
              >
                {item.content}
              </p>
              {/* 下划线 */}
            </div>

            {/* 时间 */}
            <p style={{ float: "right", margin: "-6px 0px 0px 0px" }}>
              {item.yearTime}
            </p>
            <div style={{ clear: "both" }}></div>
            <div style={{ margin: "8px 0px 10px 53px" }}>
              <Divider style={{ margin: "0px" }} />
            </div>
          </div>
        ))}
        <div style={{ clear: "both" }}></div>
        <div className="more_session">
          <p style={{ color: "#333" }}>更多会话&nbsp;<Icon type="right" /></p>
        </div>
      </Fragment>
    );
  }
}
export default Index;
