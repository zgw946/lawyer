import React, { Component, Fragment } from "react";
import "./index.css";
import { Icon, Avatar, Button, Collapse, Upload, message, Input } from "antd";
// import { Link } from "react-router-dom";
// import { Player } from 'video-react';
const { TextArea } = Input;
const { Panel } = Collapse;

//律圈首页
// 第一级折叠面板
const contents = (
  <div>
    <div
      style={{
        backgroundColor: "#f2f6ff",
        // height: "380px",
        padding: "10px",
        borderRadius: "5px"
      }}
    >
      <div>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <span style={{ marginLeft: "8px", fontSize: "14", color: "333" }}>
          用户名
				</span>
        <br></br>
        <span style={{ marginLeft: "37px", fontSize: "12", color: "#ccc" }}>
          广东深圳
				</span>
      </div>
      <div className="paragraph">
        <p style={{ color: "#616161", fontSize: "14px" }}>
          我公公骑车下班的途中，然后因为东西忘记拿掉头回公司拿东
					西的途中遇到人家堆碳在马路边撞到石炭我应该向堆碳在马路边的那一家要求怎么样的赔偿？
					还有啊我公公的希望得到一个亿的....
				</p>
      </div>
      <div className="revert">
        <span style={{ marginLeft: "740px", color: "#B3B3B3" }}>
          2019-6-12&nbsp;16:40
				</span>
        <span style={{ color: "#4586FF", float: "right" }}>回复</span>
      </div>
      <div>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <span style={{ marginLeft: "8px", fontSize: "14", color: "333" }}>
          用户名
				</span>
        <br></br>
        <span style={{ marginLeft: "37px", fontSize: "12", color: "#ccc" }}>
          广东深圳
				</span>
      </div>
      <div className="paragraph">
        <p style={{ color: "#616161", fontSize: "14px" }}>
          我公公骑车下班的途中，然后因为东西忘记拿掉头回公司拿东
					西的途中遇到人家堆碳在马路边撞到石炭我应该向堆碳在马路边的那一家要求怎么样的赔偿？
					还有啊我公公的希望得到一个亿的....
				</p>
      </div>
      <div className="revert">
        <span style={{ marginLeft: "740px", color: "#B3B3B3" }}>
          2019-6-12&nbsp;16:40
				</span>
        <span style={{ color: "#4586FF", float: "right" }}>回复</span>
      </div>
      {/* 输入内容回复部分 */}
      <div style={{ position: "relative" }}>
        <Button style={{ float: "right" }} size="small">
          我也来一句
				</Button>
        <TextArea
          style={{ marginTop: "15px", resize: "none", borderRadius: "8px" }}
          rows={4}
        />
        <Icon
          style={{ position: "absolute", top: "173px", left: "770px" }}
          type="meh"
        />
        <Button
          size="small"
          style={{
            float: "right",
            backgroundColor: "#2e3341",
            color: "#fff",
            marginTop: "-29px",
            marginRight: "27px"
          }}
   
        >
          回复
				</Button>
      </div>
    </div>
  </div>
);
const genExtra2 = () => (
  <div>
    <span>今天 16：40</span>
  </div>
);
const customPanelStyle = {
  background: "#fff",
  borderRadius: 4,
  border: 0
};
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
  state = {
    data: [
      {
        id: 1
      },
      {
        id: 2
      }
    ]
  };
  render() {
    return (
      <Fragment>
        <div className="lvshi_conten">
          {/* 头部搜索部分 */}
          <div className="all_attention">
            <span
              style={{
                lineHeight: "50px",
                marginLeft: "20px",
                fontSize: "16px",
                color: "#333"
              }}
            >
              律师圈
						</span>
            <span style={{ color: "#42a5f5", marginLeft: "12px" }}>></span>
            <span
              style={{
                lineHeight: "50px",
                marginLeft: "15px",
                fontSize: "14px",
                color: "#333"
              }}
            >
              律文详情
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
                marginLeft: "590px"
              }}
            ></input>
            <Icon type="search" />
          </div>
          {/* 律文详情最大的盒子 */}
          <div
            style={{
              width: "935px",
              height: "100%",
              marginTop: "20px",
              borderRadius: "8px",
              backgroundColor: "#ffff",
              padding: "15px"
            }}
          >
            {/* 一个帖子 最外层只作为暂时包裹 */}
            <div>
              <div>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
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
                <span style={{ marginLeft: "750px", color: "#B3B3B3" }}>
                  2019-6-12&nbsp;16:40
								</span>
                <span style={{ color: "#4586FF", float: "right" }}>回复</span>
              </div>
              {/* 折叠版部分 */}
              {/* 循环 */}
              {this.state.data.map(item => (
                <div className="dddsd" key={item.id}>
                  <div>
                    <Avatar src="https:zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <span
                      style={{
                        marginLeft: "8px",
                        fontSize: "14",
                        color: "333"
                      }}
                    >
                      用户名
										</span>
                    <br></br>
                    <span
                      style={{
                        marginLeft: "37px",
                        fontSize: "12",
                        color: "#ccc"
                      }}
                    >
                      广东深圳
										</span>
                  </div>
                  <div className="paragraph">
                    <p style={{ color: "#616161", fontSize: "14px" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Aenean euismod bibendum laoreet. Proin gravida dolor sit
											amet lacus accumsan et viverra justo commodo. Proin
											sodales..
										</p>
                  </div>
                  <div className="examine">
                    <Collapse bordered={false} accordion>
                      <Panel
                        header="查看回复"
                        style={customPanelStyle}
                        extra={genExtra2()}
                        key="2"
                      >
                        {contents}
                      </Panel>
                    </Collapse>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 发表留言部分 */}
          <div className="leave">
            <TextArea
              placeholder="输入你的观点"
              style={{ resize: "none", borderRadius: "8px" }}
              rows={4}
            />
            <div style={{ marginTop: "15px" }}>
              <Icon style={{ fontSize: "16px" }} type="meh" />
              <Icon style={{ fontSize: "16px", marginLeft: "10px" }} type="picture" />
              <Icon style={{ fontSize: "16px", marginLeft: "10px" }} type="file-text" />
              <Button size="small" style={{ float: "right", color: "#fff", backgroundColor: "#2e3341", width: "70px" }}>提交</Button>
            </div>
          </div>
         
        </div>

      </Fragment>
    );
  }
}

export default Index;
