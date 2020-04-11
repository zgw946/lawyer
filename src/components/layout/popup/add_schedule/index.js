import React, { PureComponent } from 'react';
import './index.css';
import { Modal, Form, DatePicker, Checkbox, TimePicker, Input, Popover, Icon, Button } from "antd";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";
import moment from 'moment';
//新增日程
const { TextArea } = Input;
const content = (
  <div>
    <p><Checkbox>所有成员</Checkbox></p>
    <p><Checkbox>成员姓名</Checkbox></p>
    <p>
      <Icon style={{ color: "#4586FF" }} type="plus-circle" theme="twoTone" />
      <span style={{ color: "#4586FF", fontSize: "14px", marginLeft: "10px" }}>邀请成员</span>
    </p>
    <div className="member">
      <Button style={{ backgroundColor: "#2e3341", height: 30, width: 150, marginTop: "10px", color: "#fff" }} >确认</Button>
    </div>
  </div>
);
class Index extends PureComponent {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };
  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <Modal
        width={630}
        destroyOnClose={true}
        footer={null}
        onCancel={() => this.props.changePopupBox([{ type: this.props.popupType }])}
        visible={true}
      >
        <p className="establish">创建日程</p>
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 17 }}>
          <Form.Item label="选择时间">
            <div style={{ position: 'relative' }}>
              <DatePicker
                style={{ width: "165px" }}
                disabledDate={this.disabledStartDate}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                value={startValue}
                placeholder="2019/01/01"
                onChange={this.onStartChange}
                onOpenChange={this.handleStartOpenChange}
              />
              -
            <DatePicker
                style={{ width: "105px" }}
                disabledDate={this.disabledEndDate}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                value={endValue}
                placeholder="2020/01/01"
                onChange={this.onEndChange}
                open={endOpen}
                onOpenChange={this.handleEndOpenChange}
              />
              <Checkbox className="quantians">全天</Checkbox>
            </div>
          </Form.Item>
          <Form.Item label="详细时间" >
            <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} style={{ width: "86px" }} />：
            <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} style={{ width: "86px" }} /> -
            <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} style={{ width: "86px" }} />：
            <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} style={{ width: "86px" }} />
            <Checkbox className="quantian">同步日程</Checkbox>
          </Form.Item>
          <Form.Item label="任务详情" >
            <TextArea placeholder="请输入任务详情" style={{ resize: "none" }} rows={4} />
          </Form.Item>
          <Form.Item label="任务详情" >
            <div className="actives">
              <div className="addstaff">
                <Popover placement="bottomLeft" content={content} title="添加成员" trigger="focus">
                  <button className="xiala5"><Icon type="plus" style={{ fontSize: "18px", marginTop: "9px", marginLeft: 26 }} /></button>
                </Popover>
                <p className="stasadd5">新建人员</p>
              </div>
            </div>
          </Form.Item>
          <Form.Item label="详细地点" >
            <Input placeholder="请输入详细地点" />
          </Form.Item>
        </Form>
        <Button style={{ backgroundColor: "#fff", color: "#ccc", height: "26px", marginLeft: "223px" }} >取消</Button>
        <Button style={{ backgroundColor: "#2e3341", color: "#fff", height: "26px", marginLeft: "10px" }} >确认</Button>
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