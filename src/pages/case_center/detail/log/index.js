import React, { Component, Fragment } from 'react';
import './index.css';
import { Avatar } from 'antd';
//案件操作日志
class Index extends Component {

  render() {
    return (
      <Fragment>
        <div className="particularss">
          <div className="invite_member">
            <Avatar style={{ marginLeft: "80px",marginTop:"-20px" }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <span style={{ lineHeight: "80px", marginLeft: "7px",color:"#000",fontSize:"16px" }}>庄律师</span>
            <span style={{ lineHeight: "80px", marginLeft: "40px",fontSize:"16px" }}>邀请了新的成员加入</span>
            <span style={{ lineHeight: "80px",float:"right",fontSize:"14px",color:"#B3B3B3" }}> 10:00</span>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Index;