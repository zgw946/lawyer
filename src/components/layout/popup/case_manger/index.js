import React, { PureComponent } from 'react';
import './index.css';
import { Modal, Button } from "antd";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";

//案例管理
class Index extends PureComponent {

  render() {

    return (
      <Modal
        width={800}
        destroyOnClose={true}
        footer={null}
        onCancel={() => this.props.changePopupBox([{ type: this.props.popupType }])}
        visible={true}
      >
        <h2 style={{ fontSize: "16px", fontWeight: "bold", textAlign: 'center' }}>案件管理</h2>
        {/* 最外层的盒子 */}
        <div>
          {/* 网络检索数据 */}
          <img
            style={{ position: "absolute", left: "374px", top: "59px" }}
            src={require("../../../../statics/images/个人中心/gengxin.png")} alt="" />
          <div className="network">
            <span style={{ float: 'left', position: "absolute", top: "-27px", color: "#333" }}>网络检索数据</span>
            {/* 中间内容 */}
            <div style={{ marginTop: "5px" }}>
              <span className="lanses"></span>
              <h2 style={{ position: "absolute", top: "15px", left: "18px", color: '#669bfd' }}>民事二审</h2>
              <div className="matter" style={{ marginTop: "5px" }}>
                <span style={{ fontSize: "14px", color: "#333" }}> 广东法仁律师事务所与国家工商行政管理总局商标评审委员会二审行政判决书</span>
              </div>
              <div style={{ marginTop: "10px", marginBottom: "30px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                <span style={{ fontSize: "12px", color: "#333", marginLeft: "4px" }}>北京人民法院</span>
                <span style={{ fontSize: "12px", color: "#333", marginLeft: "26px" }}>(2019)最高法民终756号</span>
                <span style={{ fontSize: "12px", color: "#333", marginLeft: "26px" }}>2019-03-21</span>
              </div>
              {/* 文件 */}
              <img
                style={{ position: "absolute", left: "324px", top: "44px" }}
                src={require("../../../../statics/images/个人中心/tianjia.png")} alt="" />
            </div>
          </div>
          {/* 我的案例 */}
          <div className="my_networdlaw">
            <span style={{ float: 'left', position: "absolute", top: "-27px", color: "#333" }}>我的案例</span>
            {/* 中间内容 */}
            <div style={{ marginTop: "5px" }}>
              <span className="lanses"></span>
              <h2 style={{ position: "absolute", top: "15px", left: "18px", color: '#669bfd' }}>民事二审</h2>
              <div className="matter" style={{ marginTop: "5px" }}>
                <span style={{ fontSize: "14px", color: "#333" }}> 广东法仁律师事务所与国家工商行政管理总局商标评审委员会二审行政判决书</span>
              </div>
              <div style={{ marginTop: "10px", marginBottom: "30px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                <span style={{ fontSize: "12px", color: "#333", marginLeft: "4px" }}>北京人民法院</span>
                <span style={{ fontSize: "12px", color: "#333", marginLeft: "26px" }}>(2019)最高法民终756号</span>
                <span style={{ fontSize: "12px", color: "#333", marginLeft: "26px" }}>2019-03-21</span>
              </div>
              {/* 文件 */}
              <img
                style={{ position: "absolute", left: "324px", top: "44px" }}
                src={require("../../../../statics/images/个人中心/ajsc.jpg")} alt="" />
            </div>
          </div>
          <div style={{ clear: "both" }}></div>
          {/* 底部按钮 */}
          <div style={{ textAlign: 'center', marginTop: "15px" }}>
            <span style={{ color: "#ccc", fontSize: "14px" }}>—  数据来源中国判决文书网  —</span><br></br>
            <Button size="small" style={{ backgroundColor: "#ffff", color: "#eaeaea", width: "80px", marginRight: "8px", marginTop: "10px" }}>取消</Button>
            <Button size="small" style={{ backgroundColor: "#2e3341", color: "#fff", width: "80px", marginLeft: "8px", marginTop: "10px" }}>保存</Button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapDispath = (dispath) => {
  return {
    //改变弹出框状态
    changePopupBox(info) {
      dispath(changePopupBox(info));
    }
  };
};

//数据仓库
Index = connect(null, mapDispath)(Index);

export default Index;