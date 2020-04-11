import React, { PureComponent } from 'react';
import './index.css';
import { Modal } from "antd";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";
import { Icon,Button } from 'antd';
//公开咨询详情
class Index extends PureComponent {

  render() {
    return (
      <Modal
      style={{marginTop:"145px"}}
        width={450}
        destroyOnClose={true}
        footer={null}
        onCancel={() => this.props.changePopupBox([{ type: this.props.popupType }])}
        visible={true}
      >
        <div className="savefiles">
          <p className="savewx">移动到</p>
          <span className="transverses"></span>
          <div className="savaSelect">
          <Icon className="arrows" type="caret-right" />
          <Icon className="folders" type="folder" theme="filled" />
          <span className="savazx">证件1</span>
          <Icon className="arrows2" type="caret-right" />
          <Icon className="folders2" type="folder" theme="filled" />
          <span className="savazx2">存放文件</span>
          <Icon className="folders3" type="folder" theme="filled" />
          <span className="savazx3">最终文件</span>
          <Icon className="arrows4" type="caret-right" />
          <Icon className="folders4" type="folder" theme="filled" />
          <span className="savazx4">证件2</span>
          </div>
          <div style={{marginTop:"25px"}}>
          <Icon className="addIcon" type="plus" />
          <span style={{marginLeft:"10px"}}>新建文件夹</span>
          <Button style={{backgroundColor:"#2e3341",color:"#FFF",borderRadius:"4px",width:"100px",height:"30px",float:"right",marginTop:"-6px"}}>确认</Button>
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