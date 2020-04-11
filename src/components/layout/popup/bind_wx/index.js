import React, { PureComponent } from 'react';
import './index.css';
import { Modal } from "antd";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";

//绑定微信
class Index extends PureComponent {

  render() {

    return (
      <Modal
        width={400}
        destroyOnClose={true}
        footer={null}
        onCancel={() => this.props.changePopupBox([{ type: this.props.popupType }])}
        visible={true}
      >
        <h2 style={{ fontSize: "16px", fontWeight: 'bold', textAlign: "center", color: "#333" }}>绑定微信</h2>
        <div style={{ textAlign: 'center' }}>
          <img src={require("../../../../statics/images/个人中心/wx.png")} alt="" />
          <p style={{marginTop:"15px"}}>请使用微信扫描二维码登录</p>
          <span>“仁法网律师”</span>
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