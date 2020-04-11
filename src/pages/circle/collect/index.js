import React, { Component, Fragment } from 'react';
import './index.css';
import { Icon, Card, Avatar, Button } from 'antd';
// import { Link } from "react-router-dom";
// import { Player } from 'video-react';
// const { TextArea } = Input;


//律圈首页
class Index extends Component {

  render() {

    return (
      <Fragment>
        <div className="lvshi_conten3">
          <div className="all_attention">
            <span style={{ lineHeight: "50px", marginLeft: "20px", fontSize: "16px", color: "#333" }}>我的收藏</span>
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
          <div>
            <Card
              hoverable
              style={{ width: "935px", marginTop: "20px", borderRadius: "8px" }}
            >
              <div>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <span style={{ marginLeft: "8px", fontSize: "14", color: "333" }}>用户名</span><br></br>
                <span style={{ marginLeft: "37px", position: "absolute", top: "35px", fontSize: "12", color: "#ccc" }}>广东深圳</span>
                <span style={{ position: "absolute", top: "33px", left: "790px" }}>更新状态:</span>
                <Button style={{ position: "absolute", top: "25px", left: "121px", backgroundColor: "#4586ff", color: "#FFF", fontSize: "12px" }} size="small">贴主</Button>
                <Button style={{ float: "right", marginTop: "-16px", color: "#679cff" }} size="small">已更新</Button>

              </div>
              <div className="paragraph">
                <p style={{ color: '#616161', fontSize: "14px" }}>
                  我公公骑车下班的途中，然后因为东西忘记拿掉头回公司拿东
                  西的途中遇到人家堆碳在马路边撞到石炭我应该向堆碳在马路边的那一家要求怎么样的赔偿？
                  还有啊我公公的希望得到一个亿的....
                </p>
              </div>
              <div className="examine">
                <span style={{ lineHeight: "52px", marginLeft: "18px" }}>
                  12小时发布
								</span>
                <span style={{ lineHeight: "52px", marginLeft: "288px" }}>
                  查看详细
								</span>
                <div style={{ float: "right" }}>
                  <Icon
                    style={{ marginRight: "10px", lineHeight: "52px" }}
                    type="star"
                    theme="twoTone"
                  />
                  <span style={{ marginRight: "20px", lineHeight: "52px" }}>
                    收藏
									</span>
                  <Icon
                    style={{ marginRight: "10px", lineHeight: "52px" }}
                    type="message"
                    theme="twoTone"
                  />
                  <span style={{ marginRight: "20px", lineHeight: "52px" }}>
                    666
									</span>
                  <Icon
                    style={{ marginRight: "10px", lineHeight: "52px" }}
                    type="heart"
                    theme="twoTone"
                  />
                  <span style={{ marginRight: "15px" }}>223</span>
                </div>
              </div>
            </Card>
            <Card
              hoverable
              style={{ width: "935px", marginTop: "20px", borderRadius: "8px" }}
            >
              <div>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <span style={{ marginLeft: "8px", fontSize: "14", color: "333" }}>用户名</span><br></br>
                <span style={{ marginLeft: "37px", position: "absolute", top: "35px", fontSize: "12", color: "#ccc" }}>广东深圳</span>
                <span style={{ position: "absolute", top: "33px", left: "790px" }}>更新状态:</span>
                <Button style={{ position: "absolute", top: "25px", left: "121px", backgroundColor: "#4586ff", color: "#FFF", fontSize: "12px" }} size="small">贴主</Button>
                <Button style={{ float: "right", marginTop: "-16px" }} size="small">无更新</Button>
              </div>
              <div className="paragraph">
                <p style={{ color: '#616161', fontSize: "14px" }}>
                  我公公骑车下班的途中，然后因为东西忘记拿掉头回公司拿东
                  西的途中遇到人家堆碳在马路边撞到石炭我应该向堆碳在马路边的那一家要求怎么样的赔偿？
                  还有啊我公公的希望得到一个亿的....
                </p>
                <Icon style={{ fontSize: "40px" }} type="picture" />
                <Icon style={{ fontSize: "40px", margin: "0 10px" }} type="picture" />
                <Icon style={{ fontSize: "40px" }} type="picture" />
              </div>
              <div className="examine">
                <span style={{ lineHeight: "52px", marginLeft: "18px" }}>
                  12小时发布
								</span>
                <span style={{ lineHeight: "52px", marginLeft: "288px" }}>
                  查看详细
								</span>
                <div style={{ float: "right" }}>
                  <Icon
                    style={{ marginRight: "10px", lineHeight: "52px" }}
                    type="star"
                    theme="twoTone"
                  />
                  <span style={{ marginRight: "20px", lineHeight: "52px" }}>
                    收藏
									</span>
                  <Icon
                    style={{ marginRight: "10px", lineHeight: "52px" }}
                    type="message"
                    theme="twoTone"
                  />
                  <span style={{ marginRight: "20px", lineHeight: "52px" }}>
                    666
									</span>
                  <Icon
                    style={{ marginRight: "10px", lineHeight: "52px" }}
                    type="heart"
                    theme="twoTone"
                  />
                  <span style={{ marginRight: "15px" }}>223</span>
                </div>
              </div>
              {/* <div>
                <Player
                  style={{ paddingTop: "20%" }}
                  playsInline
                  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                  style={{width:"200px"}}
                />
              </div> */}
            </Card>
            <Card
              hoverable
              style={{ width: "935px", marginTop: "20px", borderRadius: "8px" }}
            >
              <div>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <span style={{ marginLeft: "8px", fontSize: "14", color: "333" }}>用户名</span><br></br>
                <span style={{ marginLeft: "37px", position: "absolute", top: "35px", fontSize: "12", color: "#ccc" }}>广东深圳</span>
                <span style={{ position: "absolute", top: "33px", left: "790px" }}>更新状态:</span>
                <Button style={{ position: "absolute", top: "25px", left: "121px", backgroundColor: "#4586ff", color: "#FFF", fontSize: "12px" }} size="small">贴主</Button>
                <Button style={{ float: "right", marginTop: "-16px" }} size="small">无更新</Button>
              </div>
              <div className="paragraph1">
                <p style={{ color: '#616161', fontSize: "14px" }}>
                  我公公骑车下班的途中，然后因为东西忘记拿掉头回公司拿东
                  西的途中遇到人家堆碳在马路边撞到石炭我应该向堆碳在马路边的那一家要求怎么样的赔偿？
                  还有啊我公公的希望得到一个亿的....
                </p>
                <img
                  style={{ width: "400px", height: "240px" }}
                  src={require("../../../statics/images/各类图片/shiping.png")}alt="" />
              </div>
              <div className="examine">
                <span style={{ lineHeight: "52px", marginLeft: "18px" }}>
                  12小时发布
								</span>
                <span style={{ lineHeight: "52px", marginLeft: "288px" }}>
                  查看详细
								</span>
                <div style={{ float: "right" }}>
                  <Icon
                    style={{ marginRight: "10px", lineHeight: "52px" }}
                    type="star"
                    theme="twoTone"
                  />
                  <span style={{ marginRight: "20px", lineHeight: "52px" }}>
                    收藏
									</span>
                  <Icon
                    style={{ marginRight: "10px", lineHeight: "52px" }}
                    type="message"
                    theme="twoTone"
                  />
                  <span style={{ marginRight: "20px", lineHeight: "52px" }}>
                    666
									</span>
                  <Icon
                    style={{ marginRight: "10px", lineHeight: "52px" }}
                    type="heart"
                    theme="twoTone"
                  />
                  <span style={{ marginRight: "15px" }}>223</span>
                </div>
              </div>
            </Card>
          </div>

        </div>

      </Fragment>
    );
  }
}

export default Index;