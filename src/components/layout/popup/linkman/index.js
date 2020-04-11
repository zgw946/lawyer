import React, { PureComponent } from 'react';
import './index.css';
import { Modal } from "antd";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";
import { Form, Input, Button } from 'antd';

//新增案件
class Index extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        width={650}
        destroyOnClose={true}
        footer={null}
        onCancel={() => this.props.changePopupBox([{ type: this.props.popupType }])}
        visible={true}>
        <p className="adds">联系人信息</p>
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 19 }}
        //  onSubmit={this.handleSubmit}
        >
          <Form.Item label="联系人姓名:">
            {getFieldDecorator('note', {
              rules: [{ required: true, message: 'Please input your note!' }],
            })(<Input placeholder="请输入联系人的姓名" />)}
          </Form.Item>
          <Form.Item label="联系人电话:">
            {getFieldDecorator('site', {
              rules: [{ required: true, message: 'Please input your note!' }],
            })(<Input placeholder="请输入联系人的电话" />)}
          </Form.Item>


        </Form>
        <div style={{ textAlign: "center" }}>
          <Button size="small" style={{ color: "#ccc", borderRadius: "4px", width: "80px", marginRight: "15px" }}>上一步</Button>
          <Button size="small" style={{ backgroundColor: "#2e3341", color: "#FFF", borderRadius: "4px", width: "80px", marginLeft: '15px' }}>完成</Button>
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
export default connect(null, mapDispath)(Form.create()(Index));