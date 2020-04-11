import React, {PureComponent} from 'react';
import './index.css';
import {Modal} from "antd";
import {changePopupBox} from "../actionCreators";
import connect from "react-redux/es/connect/connect";

//新增日程
class Index extends PureComponent {

  render() {

    return (
      <Modal
        width={700}
        destroyOnClose={true}
        footer={null}
        onCancel={() => this.props.changePopupBox([{type : this.props.popupType}])}
        visible={true}
      >
        新增日程
      </Modal>
    );
  }
}

const mapDispath = (dispath) => {
  return {
    //改变弹出框状态
    changePopupBox(info){
      dispath(changePopupBox(info));
    }
  };
};

//数据仓库
Index = connect(null,mapDispath)(Index);

export default Index;