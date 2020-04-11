import React, { PureComponent } from "react";
import "./index.css";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";
import { Cascader, Icon, Input, Button, Menu, Dropdown, Modal } from "antd";
const { TextArea } = Input;
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const options = [
      {
        value: "zhejiang",
        label: "Zhejiang",
        children: [
          {
            value: "hangzhou",
            label: "Hangzhou",
            children: [
              {
                value: "xihu",
                label: "West Lake"
              }
            ]
          }
        ]
      },
      {
        value: "jiangsu",
        label: "Jiangsu",
        children: [
          {
            value: "nanjing",
            label: "Nanjing",
            children: [
              {
                value: "zhonghuamen",
                label: "Zhong Hua Men"
              }
            ]
          }
        ]
      }
    ];
    const menu = (
      <Menu>
        <Menu.Item>sss</Menu.Item>
      </Menu>
    );
    return (
      <Modal
        width={700}
        destroyOnClose={true}
        footer={null}
        onCancel={() =>
          this.props.changePopupBox([{ type: this.props.popupType }])
        }
        visible={true}
      >
        <h3 style={{ textAlign: "center", fontWeight: "bold" }}>发布资讯</h3>
        <div>
          <Input placeholder="输入你的标题" />
        </div>
        <div>
          <div className="myimportss" style={{ marginTop: "20px" }}>
            <Icon type="meh" className="Icontou" />
            <img src={require("../../../../statics/images/发布资讯/icon_jc.png")} className="jcs" alt="" />
            <img src={require("../../../../statics/images/发布资讯/icon_xhx.png")} className="xhxs" alt="" />
            <img src={require("../../../../statics/images/发布资讯/icon_zdq.png")} className="zdqs" alt="" />
            <img src={require("../../../../statics/images/发布资讯/icon_jz.png")} className="jzs" alt="" />
            <img src={require("../../../../statics/images/发布资讯/icon_ydq.png")} className="ydqs" alt="" />
            <img src={require("../../../../statics/images/发布资讯/icon_cs1.png")} className="cs1" alt="" />
            <img src={require("../../../../statics/images/发布资讯/icon_cs2.png")} className="cs2" alt="" />
            <img src={require("../../../../statics/images/发布资讯/icon_kd.png")} className="kds" alt="" />
            <Dropdown overlay={menu} placement="bottomCenter">
              <Button className="butoDropdown" style={{ width: 74, height: 22 }}>
                14px
                <Icon type="down" />
              </Button>
            </Dropdown>
          </div>
          <TextArea rows={10} className="TextArease" placeholder="表达此刻的想法" />
          <Icon style={{ marginTop: 20 }} type="file-text" />
          <Cascader
            style={{ marginTop: 20, marginLeft: 10 }}
            options={options}
            placeholder="案件/类型"
          />
          <Button  style={{ marginLeft: 392,position:"absolute",top:"377px",left:"236px" }} size="small" type="primary">
            发送
					</Button>
        </div>
      </Modal>
    );
  }
}

const mapDispath = dispath => {
  return {
    //改变弹出框状态
    changePopupBox(info) {
      dispath(changePopupBox(info));
    }
  };
};

//数据仓库
Index = connect(
  null,
  mapDispath
)(Index);

export default Index;
