import React, { Component, Fragment } from "react";
import "./index.css";
import {
  Icon,
  Card,
  Avatar,
  Button,
  Upload,
  message,
  Input,
  BackTop
} from "antd";
const { TextArea } = Input;
//律圈首页
// 文件上传
const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text"
  },
  onChange(info) {
    if (info.file.status !== "uploading") {

    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};
class Index extends Component {
  render() {
    return (
      <Fragment>
        <BackTop />
        <div className="lvshi_conten">
          <div className="all_attention">
            <span
              style={{
                lineHeight: "50px",
                marginLeft: "20px",
                fontSize: "16px",
                color: "#4586FF"
              }}
            >
              全部
						</span>
            <span
              style={{
                lineHeight: "50px",
                marginLeft: "20px",
                fontSize: "16px",
                color: "#333"
              }}
            >
              关注
						</span>
            <input
              placeholder="请输入搜索内容"
              style={{
                padding: "5px 0",
                borderLeftWidth: "0px",
                borderTopWidth: "0px",
                borderRightWidth: "0px",
                borderBottomColor: "1px #ccc",
                outline: "none",
                marginLeft: "635px"
              }}
            ></input>
            <Icon type="search" />
          </div>
          <div>
            <Card
              hoverable
              style={{ width: "935px", marginTop: "20px", borderRadius: "8px" }}
            >
              <div>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <span
                  style={{ marginLeft: "8px", fontSize: "14", color: "333" }}
                >
                  用户名
								</span>
                <br></br>
                <span
                  style={{
                    marginLeft: "37px",
                    position: "absolute",
                    top: "35px",
                    fontSize: "12",
                    color: "#ccc"
                  }}
                >
                  广东深圳
								</span>
                <Button
                  style={{ float: "right", marginTop: "-16px" }}
                  size="small"
                  icon="plus"
                >
                  关注
								</Button>
              </div>
              <div className="paragraph">
                <p style={{ color: "#616161", fontSize: "14px" }}>
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
                {/* <Icon type="down" /> */}
                <img
                  style={{ marginTop: "-3px", marginLeft: "5px", color: "#ccc" }}
                  src={require('../../../statics/images/个人中心/xiangxia.png')} alt="" />
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
                <span
                  style={{ marginLeft: "8px", fontSize: "14", color: "333" }}
                >
                  用户名
								</span>
                <br></br>
                <span
                  style={{
                    marginLeft: "37px",
                    position: "absolute",
                    top: "35px",
                    fontSize: "12",
                    color: "#ccc"
                  }}
                >
                  广东深圳
								</span>
                <Button
                  style={{
                    float: "right",
                    marginTop: "-16px",
                    backgroundColor: "#fcfcfc"
                  }}
                  size="small"
                >
                  已关注
								</Button>
              </div>
              <div className="paragraph">
                <p style={{ color: "#616161", fontSize: "14px" }}>
                  我公公骑车下班的途中，然后因为东西忘记拿掉头回公司拿东
									西的途中遇到人家堆碳在马路边撞到石炭我应该向堆碳在马路边的那一家要求怎么样的赔偿？
									还有啊我公公的希望得到一个亿的....
								</p>
                <Icon style={{ fontSize: "40px" }} type="picture" />
                <Icon
                  style={{ fontSize: "40px", margin: "0 10px" }}
                  type="picture"
                />
                <Icon style={{ fontSize: "40px" }} type="picture" />
              </div>
              <div className="examine">
                <span style={{ lineHeight: "52px", marginLeft: "18px" }}>
                  12小时发布
								</span>
                <span style={{ lineHeight: "52px", marginLeft: "288px" }}>
                  查看详细
								</span>
                <img
                  style={{ marginTop: "-3px", marginLeft: "5px", color: "#ccc" }}
                  src={require('../../../statics/images/个人中心/xiangxia.png')} alt="" />
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
          {/* 详情 */}
          <div className="xinagqing">
            {/* 展开帖子第一级主体内容 */}
            <div>
              <div>
                <Avatar src="https:zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                <span
                  style={{ marginLeft: "8px", fontSize: "14", color: "333" }}
                >
                  用户名
								</span>
                <br></br>
                <span
                  style={{ marginLeft: "37px", fontSize: "12", color: "#ccc" }}
                >
                  广东深圳
								</span>
                <Button
                  style={{ float: "right", marginTop: "-16px" }}
                  size="small"
                >
                  已关注
								</Button>
              </div>
              <div className="paragraph">
                <p style={{ color: "#616161", fontSize: "14px" }}>
                  我公公骑车下班的途中，然后因为东西忘记拿掉头回公司拿东
									西的途中遇到人家堆碳在马路边撞到石炭我应该向堆碳在马路边的那一家要求怎么样的赔偿？
									还有啊我公公的希望得到一个亿的....
								</p>
              </div>
              <div>
                <Upload {...props}>
                  <Button style={{ marginLeft: "37px" }} size="small">
                    <Icon type="upload" /> 附件
									</Button>
                </Upload>
              </div>
              <div className="revert">
                <span style={{ marginLeft: "736px", color: "#B3B3B3" }}>
                  2019-6-12&nbsp;16:40
								</span>
                <span style={{ color: "#4586FF", float: "right", marginRight: "20px" }}>回复</span>
              </div>
            </div>
            {/* 查看详细二级部分 */}
            <div>
              {/* 主帖子一 */}
              <div className="advocatetiezi">
                <div>
                  <Avatar src="https:zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  <span
                    style={{ marginLeft: "8px", fontSize: "14", color: "333" }}
                  >
                    用户名
								</span>
                  <br></br>
                  <span
                    style={{ marginLeft: "37px", fontSize: "12", color: "#ccc" }}
                  >
                    广东深圳
								</span>
                </div>
                <div className="paragraph">
                  <p style={{ color: "#616161", fontSize: "14px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean euismod bibendum laoreet. Proin gravida dolor sit amet
                    lacus accumsan et viverra justo commodo. Proin sodales....
								</p>
                </div>
                <span style={{ marginLeft: "773px", color: "#B3B3B3", }}>6-12&nbsp;16:40</span>
                <span style={{ color: "#4586FF", marginLeft: "20px" }}>收起回复</span>
              </div>
              {/*  */}
              <div style={{ backgroundColor: "#f2f6ff", height: "540px", padding: "10px", borderRadius: "5px" }}>
                {/* 帖子1 */}
                <div className="tiezi1">
                  <div>
                    <Avatar src="https:zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <span style={{ marginLeft: "8px", fontSize: "14", color: "333" }}>用户名</span><br></br>
                    <span style={{ marginLeft: "37px", fontSize: "12", color: "#ccc" }}>广东深圳</span>
                  </div>
                  <div className="paragraph">
                    <p style={{ color: '#616161', fontSize: "14px" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                      Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales..
                    </p>
                  </div>
                  <span style={{ marginLeft: "773px", color: "#B3B3B3", }}>6-12&nbsp;16:40</span>
                  <span style={{ color: "#4586FF", marginLeft: "20px" }}>回复</span>
                </div>
                {/* 帖子2 */}
                <div className="tiezi2">
                  <div>
                    <Avatar src="https:zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <span style={{ marginLeft: "8px", fontSize: "14", color: "333" }}>用户名</span><br></br>
                    <span style={{ marginLeft: "37px", fontSize: "12", color: "#ccc" }}>广东深圳</span>
                  </div>
                  <div className="paragraph">
                    <p style={{ color: '#616161', fontSize: "14px" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                      Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales..
                    </p>
                  </div>
                  <span style={{ marginLeft: "773px", color: "#B3B3B3", }}>6-12&nbsp;16:40</span>
                  <span style={{ color: "#4586FF", marginLeft: "20px" }}>回复</span>
                </div>
                {/* 输入内容回复部分 */}
                <div style={{ backgroundColor: "#f2f6ff", position: "relative" }}>
                  <Button style={{ float: "right" }} size="small" >我也来一句</Button>
                  <TextArea style={{ marginTop: "15px", resize: "none", borderRadius: "8px", border: "none" }} rows={4} />
                  <Icon style={{ position: "absolute", top: "110px", left: "770px" }} type="meh" />
                  <Button size="small" 
                  style={{ float: "right", backgroundColor: "#2e3341", color: "#fff", marginTop: "-29px",marginRight: "27px" }}>回复</Button>
                </div>
              </div>
              {/* 帖子3 */}
              <div className="tiezi3">
                <div>
                  <div>
                    <Avatar src="https:zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <span style={{ marginLeft: "8px", fontSize: "14", color: "333" }}>用户名</span><br></br>
                    <span style={{ marginLeft: "37px", fontSize: "12", color: "#ccc" }}>广东深圳</span>
                  </div>
                  <div className="paragraph">
                    <p style={{ color: '#616161', fontSize: "14px" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                      Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales..
                    </p>
                  </div>
                  <div className="revert">
                    <span style={{ marginLeft: "793px", color: "#B3B3B3", }}>6-12&nbsp;16:40</span>
                    <span style={{ color: "#4586FF", marginLeft: "20px" }}>回复</span>
                  </div>
                </div>
                {/* 输入内容回复部分 */}
                <div className="huifu" style={{ position: "relative", marginTop: "55px" }}>
                  <TextArea placeholder='输入你的观点' style={{ marginTop: "15px", resize: "none", borderRadius: "8px", border: "none" }} rows={4} />
                  <Button size="small"
                   style={{ float: "right", backgroundColor: "#2e3341", color: "#fff", marginTop: "9px", marginRight: "27px" }} >提交</Button>
                  <Icon style={{ position: "absolute", top: "119px", left: "38px" }} type="meh" />
                  <Icon style={{ position: "absolute", top: "119px", left: "78px" }} type="picture" />
                  <Icon style={{ position: "absolute", top: "119px", left: "118px" }} type="file-text" />
                </div>
                <Button style={{ backgroundColor: "#2e3341", color: "#fff", width: "200px", marginTop: "20px", marginLeft: "317px" }}  >更多内容</Button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Index;
