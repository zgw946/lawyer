import React, { PureComponent } from 'react';
import './index.css';
import { Modal } from "antd";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";
import { Checkbox, Icon, Popover, Button, Form, Input, Tag, Tooltip } from 'antd';
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
//移动或复制文件
class Index extends PureComponent {
  state = {
    tags: ['Tag 2'],
    inputVisible: false,
    inputValue: '',
    visible: false,
  };

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);

    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => (this.input = input);
  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <Modal
        style={{ marginTop: 180 }}
        width={400}
        destroyOnClose={true}
        footer={null}
        onCancel={() => this.props.changePopupBox([{ type: this.props.popupType }])}
        visible={true}
      >
        
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
      
          <Form.Item label="执行者">
            <div className="actives">
              <div className="addstaff">
                <Popover placement="bottomLeft" content={content} title="添加成员" trigger="focus">
                  <button className="xiala"><Icon type="plus" style={{ fontSize: "18px", marginTop: "15px", marginLeft: 26 }} /></button>
                </Popover>
                <p className="stasadds">新建人员</p>
              </div>
            </div>

          </Form.Item>
          <Form.Item label="子任务内容">
            <TextArea placeholder="请输入子任务内容" style={{ resize: "none" }} rows={2} />
          </Form.Item>

          <Form.Item label="标签">
            <div style={{marginTop:"8px"}}>
              {tags.map((tag, index) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag key={tag} closable={index !== 1} onClose={() => this.handleClose(tag)}>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tag} key={tag}>
                    {tagElem}
                  </Tooltip>
                ) : (
                    tagElem
                  );
              })}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag onClick={this.showInput} style={{ background: '#fff' }}><Icon type="plus" />添加标签</Tag>)}
            </div>
          </Form.Item>
        </Form>
        <Button style={{backgroundColor:"#fff",color:"#ccc",height:"26px",marginLeft:"95px"}} >取消</Button>
        <Button style={{backgroundColor:"#2e3341",color:"#fff",height:"26px",marginLeft:"10px"}} >确认</Button>
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

export default connect(null, mapDispath)(Form.create()(Index));