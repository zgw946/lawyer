import React, { Component, Fragment } from "react";
import "./index.css";
import { Button, Icon, Input, Checkbox } from "antd";
import { changePopupBox } from "../../../components/layout/popup/actionCreators";
import connect from "react-redux/lib/connect/connect";
import { Link } from "react-router-dom";
//案件材料
const { Search } = Input;
class Index extends Component {
  render() {
    return (
      <Fragment>
        <div className="particular">
          {/* 左边内容 */}
          <div className="my_uploading">
            {/* 文件上传部分 */}
            <div className="myheerds">
              <div style={{ float: "left" }}>
                
                  <Button
                    style={{
                  
              
                      marginLeft: "20px",
                      marginTop: "14px"
                    }}
                  >
                    <Icon type="delete" /> 清空回收站
								</Button>
              
              </div>
              <div style={{ float: "right", marginRight: "20px", marginTop: "14px" }}>
                <Search
                  placeholder="搜索"
                  style={{ width: 260, borderRadius: "6px", marginRight: "10px" }}
                />
                <Link to="/sky_drive/index">
                  <Button style={{ backgroundColor: "#2e3341",color:"#fff" }}>
                   返回我的网盘中心
								</Button>
                </Link>

              </div>
            </div>
            {/* 文件操作 */}
            <div style={{ marginTop: "10px" }}>
              <span style={{ marginLeft: "22px", fontSize: "14px", color: "#333" }}>全部文件</span>
              <Icon style={{ float: 'right', marginRight: "10px", marginTop: "4px", fontWeight: "bold" }} type="unordered-list" />
            </div>
            {/* 文件名部分 */}
            <div style={{ marginTop: "10px" }}>
              <Checkbox style={{ marginLeft: "22px" }}></Checkbox>
              <span style={{ marginLeft: "8px", color: "#ccc" }}>文件名</span>
              <span style={{ marginLeft: "317px", color: "#ccc" }}>大小</span>
              <span style={{ marginLeft: "123px", color: "#ccc" }}>修改时间</span>
            </div>
            {/* 文件选择 */}
            <div className="file_certificate" onClick={() => this.props.changePopupBox([{ type: "move_file" }])}>
              <div style={{ marginTop: "10px", position: "relative", height: "40px" }} >
                <Checkbox style={{ marginLeft: "22px", marginTop: "9px" }}></Checkbox>
                <Icon type="folder" theme="filled" className="fileji" />
                <span style={{ marginLeft: "30px" }}>材料1</span>
                <span style={{ marginLeft: "304px" }}>0B</span>
                <span style={{ marginLeft: "133px" }}>2019年10月23&nbsp;15:12</span>
              </div>
            </div>
            <div className="file_certificate">
              <div style={{ marginTop: "10px", position: "relative", height: "40px" }} >
                <Checkbox style={{ marginLeft: "22px", marginTop: "9px" }}></Checkbox>
                <Icon type="file-word" className="fileji_docx" />
                {/* <Icon type="folder" theme="filled" className="fileji" /> */}
                <span style={{ marginLeft: "30px" }}>材料1</span>
                <span style={{ marginLeft: "304px" }}>12m</span>
                <span style={{ marginLeft: "122px" }}>2019年10月23&nbsp;15:12</span>
              </div>
            </div>
          </div>
          {/* 右边内容 */}
          <div className="my_xiangxis">
            <div className=" detailed">
              <p style={{ lineHeight: "60px", textAlign: "center", color: "#333" }}>详情信息</p>
            </div>
            {/* 中心内容 */}
            <div>
              <p style={{ lineHeight: "600px", textAlign: "center", color: "#333" }}>点击文件查看详细</p>
            </div>
          </div>
        </div>
  
      </Fragment>
    );
  }
}

// export default Index;
const mapDispath = dispath => {
  return {
    //改变弹出框状态
    changePopupBox(info) {
      dispath(changePopupBox(info));
    }
  };
};

export default connect(null, mapDispath)(Index);
