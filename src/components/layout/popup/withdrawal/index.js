import React, { PureComponent } from 'react';
import './index.css';
import { Form, Input, Modal, Button } from "antd";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";

//提现
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
        <h2 style={{ fontSize: "16px", fontWeight: "bold", color: "#333", textAlign: 'center' }}>提现</h2>
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
          <Form.Item label="提现金额" style={{ color: "#333" }}>
            <Input style={{marginTop:"5px" }}/>
          </Form.Item>
          <Form.Item label="支付密码" style={{ color: "#333" }}>
            <Input placeholder="请输入6位数支付密码" style={{ width: "200px",marginTop:"5px" }} />
          </Form.Item>
          <div style={{textAlign:'center'}}>
            <Button style={{ backgroundColor: "#fcfcfc", color: "#ccc",marginRight:"5px" }}>取消</Button>
            <Button style={{ backgroundColor: "#333333", color: "#fff",marginLeft:"5px" }}>提现</Button>
          </div>
        </Form>
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
export default connect(null, mapDispath)(Form.create()(Index));