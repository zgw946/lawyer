import React, { Component, Fragment } from 'react';
import './index.css';
import { Icon, Card, Avatar, Button } from 'antd';
// const { Meta } = Card;
//我的关注
class Index extends Component {
  state = {
    data: [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
      {
        id: 4
      },
      {
        id: 5
      },
      {
        id: 6
      },
      {
        id: 7
      },
      {
        id: 8
      },
      {
        id: 9
      },
    ]
  }
  render() {

    return (
      <Fragment>
        <div className="fans">
          {/* 搜索 */}
          <div className="serach_fans">
            <span style={{ lineHeight: "50px", marginLeft: "20px", fontSize: "16px", color: "#333" }}>我的关注</span>
            {/* <span style={{ lineHeight: "50px", marginLeft: "20px", fontSize: "16px", color: "#333" }}>关注</span> */}
            <input
              placeholder="请输入搜索内容"
              style={{
                padding: "5px 0", borderLeftWidth: "0px", borderTopWidth: "0px", borderRightWidth: "0px",
                borderBottomColor: "1px #ccc", outline: "none", marginLeft: "640px"
              }}>
            </input>
            <Icon type="search" />
          </div>
          {/* 关注部分 */}
          {this.state.data.map((item, index) => (
            <div key={item.id}>
              <Card
                className="my_continuous "
                hoverable
                style={{
                  width: 300, marginTop: "15px", borderRadius: "8px",
                  marginRight: (index + 1) % 3 === 0 ? 0 : 17
                }}
              >
                <Icon type="ellipsis" style={{ float: "right", fontSize: "16px", fontWeight: "bold" }} /><br></br>
                {/* 头像 */}
                <div style={{ textAlign: "center" }}>
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </div>
                {/* 用户信息 */}
                <div style={{ marginTop: "6px",marginBottom:"10px" }}>
                  <span style={{ fontSize: "14px", color: "#333", fontWeight: "bold", marginLeft: "113px" }}>用户名</span><br></br>
                  <span style={{ marginLeft: "97px", color: "#B3B3B3" }}>深圳</span>
                  <span style={{ marginLeft: "7px", color: "#B3B3B3" }}>|</span>
                  <span style={{ marginLeft: "7px", color: "#B3B3B3" }}>律师</span><br></br>
                  <span className=" face"></span>
                  <p style={{ marginTop: "20px", color: "#333", fontSize: "12px", fontWeight: "bold", marginLeft: "64px" }}>专长：婚姻、刑事、劳动</p>
                  <Button style={{ width: "90px", backgroundColor: "#f5f5f5", marginLeft: "87px" }}>已关注</Button>
                </div>
              </Card>
            </div>
          ))}
          <div className="clact"></div>
          <div className="mores">
            <p style={{ color: "#333", fontSize: "12px", lineHeight: "35px" }}>——&nbsp;没有更多了&nbsp;——</p>
          </div>
        
        </div>

      </Fragment>
    );
  }
}

export default Index;