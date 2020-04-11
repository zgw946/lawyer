import React, { PureComponent } from 'react';
import './index.css';
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";
import {Form, Input, Button, Cascader, Modal, message} from 'antd';
import {myRequest} from "../../../../function";
import {withRouter} from "react-router-dom";

//新增案件
class Index extends PureComponent {

  state={
    allType:[],//所有案件类型
  };

  //提交表单
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

      if (!err) {
        const that=this,data={};

        data.name = values.name;
        data.litigant = values.litigant;
        data.type = values.type[values.type.length-1];
        data.describe = values.describe;

        myRequest({
          method: "post",
          path: "/lawyer/efficiency/my_case/index",
          auth: true,
          data,
          callback: function(response) {
            //处理返回结果
            if (response.data.code !== 0) {
              message.error(response.data.msg);
            } else {
              //返回成功提示并跳转到相应的详情页面
              message.success("添加成功",1);
              that.props.changePopupBox([{ type: that.props.popupType }]);
            }
          }
        });
      }
    });
  };

  //获取所有案件类型
  getAllType(){

    //如果全部类型为空则需要从服务器拉取数据
    if(this.state.allType.length <= 0){
      const that=this;
      myRequest({
        method: "get",
        path: "/common/type",
        callback: function(response) {
          //处理返回结果
          if (response.data.code === 0) {

            that.setState({
              allType:response.data.data,
            })
          }
        }
      });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        width={650}
        destroyOnClose={true}
        footer={null}
        onCancel={() => this.props.changePopupBox([{ type: this.props.popupType }])}
        visible={true}>
        <p className="adds">新增</p>
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 19 }} onSubmit={this.handleSubmit}>
          <Form.Item label="案件名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入案件名称' }],
            })(<Input placeholder="请输入案件名称" />)}
          </Form.Item>
          <Form.Item label="当事人">
            {getFieldDecorator('litigant', {
              rules: [{ required: true, message: '请输入当事人' }],
            })(<Input placeholder="请输入当事人" />)}
          </Form.Item>
          <Form.Item label="案件类型">
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '请选择案件类型' }],
            })(
              <Cascader
                options={this.state.allType}
                fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                changeOnSelect
                placeholder="请选择案件类型"
                onFocus={() => this.getAllType()}
              />
            )}
          </Form.Item>
          <Form.Item label="案件描述">
            {getFieldDecorator('describe', {})(
              <Input.TextArea rows={7} placeholder="请输入案情描述" />
            )}
          </Form.Item>
          <div style={{textAlign:"center"}}>
            <Button htmlType="submit" size="small" style={{ backgroundColor: "#2e3341", color: "#FFF", borderRadius: "4px",width:"80px",marginLeft:'15px'}}>提交</Button>
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

Index = connect(null,mapDispath)(Index);
Index = Form.create()(Index);
Index = withRouter(Index);

export default Index;