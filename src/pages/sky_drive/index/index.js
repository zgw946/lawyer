import React, { Component, Fragment } from "react";
import "./index.css";
import { Upload, message, Button, Icon, Input, Checkbox, Tag, Tooltip } from "antd";
import { changePopupBox } from "../../../components/layout/popup/actionCreators";
import connect from "react-redux/lib/connect/connect";
import { Link } from "react-router-dom";

//案件材料
const { Search } = Input;
const { TextArea } = Input;
const props = {
  name: "file",
  headers: {
    authorization: "authorization-text"
  },
  onChange(info) {
    if (info.file.status !== "uploading") {

    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};
class Index extends Component {
  // 标签
  state = {
    tags: ['标签1', '标签2'],
    inputVisible: false,
    inputValue: '',
    list: [
      {
        id: 1,
        name: "材料1",
        num: "0B",
        time: "2019年10月23&nbsp;15:12"
      }
    ]

  };
  // 新增文件夹
  handClick() {
    const { list } = this.state;
    list.push(<div key={list.item}>{list.length + 1}</div>)
    this.setState({
      list
    })
  }
  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
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
      <Fragment>
        <div className="particular">
          {/* 左边内容 */}
          <div className="my_uploading">
            {/* 文件上传部分 */}
            <div className="myheerds">
              <div style={{ float: "left" }}>
                <Upload {...props}>
                  <Button
                    style={{
                      backgroundColor: "#2E3341",
                      color: "#FFF",
                      marginLeft: "20px",
                      marginTop: "14px"
                    }}
                  >
                    <Icon type="upload" /> 上传文件
								</Button>
                </Upload>
              </div>
              <div style={{ float: "left" }}>

                <Button
                  onClick={() => this.handClick()}
                  style={{
                    marginLeft: "20px",
                    marginTop: "14px"
                  }}
                >
                  <Icon type="folder-add" /> 新增文件夹
								</Button>
              </div>
              <div style={{ float: "right", marginRight: "20px", marginTop: "14px" }}>
                <Search
                  placeholder="搜索"
                  style={{ width: 260, borderRadius: "6px", marginRight: "10px" }}
                />
                <Link to="/sky_drive/bin">
                  <Button style={{ backgroundColor: "#fcfcfc" }}>
                    <Icon type="delete" /> 回收站
								</Button>
                </Link>

              </div>
            </div>
            {/* 文件操作 */}
            <div style={{ marginTop: "10px" }}>
              <span style={{ marginLeft: "22px", fontSize: "14px", color: "#333" }}>全部文件</span>
              <Icon style={{ float: 'right', marginRight: "10px", marginTop: "4px", fontWeight: "bold" }} type="unordered-list" />
            </div>
            {/* 文件名部分 */}
            <div style={{ marginTop: "10px" }}>
              <Checkbox style={{ marginLeft: "22px" }}></Checkbox>
              <span style={{ marginLeft: "8px", color: "#ccc" }}>文件名</span>
              <span style={{ marginLeft: "317px", color: "#ccc" }}>大小</span>
              <span style={{ marginLeft: "123px", color: "#ccc" }}>修改时间</span>
            </div>
            {/* 文件选择 */}
            {
              this.state.list.map((item) => (
                <div key={item.id} className="file_certificate" onClick={() => this.props.changePopupBox([{ type: "move_file" }])}>
                  <div style={{ marginTop: "10px", position: "relative", height: "40px" }} >
                    <Checkbox style={{ marginLeft: "22px", marginTop: "9px" }}></Checkbox>
                    <Icon type="folder" theme="filled" className="fileji" />
                    <span style={{ marginLeft: "30px" }}>材料1</span>
                    <span style={{ marginLeft: "304px" }}>0B</span>
                    <span style={{ marginLeft: "133px" }}>2019年10月23&nbsp;15:12</span>
                  </div>
                </div>
              ))}
            <div className="file_certificate">
              <div style={{ marginTop: "10px", position: "relative", height: "40px" }} >
                <Checkbox style={{ marginLeft: "22px", marginTop: "9px" }}></Checkbox>
                <Icon type="file-word" className="fileji_docx" />
                {/* <Icon type="folder" theme="filled" className="fileji" /> */}
                <span style={{ marginLeft: "30px" }}>材料1</span>
                <span style={{ marginLeft: "304px" }}>0B</span>
                <span style={{ marginLeft: "133px" }}>2019年10月23&nbsp;15:12</span>
              </div>
            </div>
          </div>
          {/* 右边内容 */}
          <div className="my_xiangxis">
            <div className=" detailed">
              <p style={{ lineHeight: "60px", textAlign: "center", color: "#333" }}>详情信息</p>
            </div>
            {/* 文件详情 */}
            <div style={{ padding: "10px", position: "relative", height: "640px" }}>
              <Icon type="delete" style={{ float: 'right' }} /><br></br>
              <Icon type="file-word" className="fileji_docx2" /><br></br>
              <span style={{ fontSize: "12px", color: "#ccc", position: "absolute", top: "84px", left: "115px" }}>62.23k</span>
              <span style={{ fontSize: "12px", color: "#ccc", position: "absolute", top: "94px", left: "115px" }}>xxx.doc</span>
              {/* 下载按钮 */}
              <div style={{ marginTop: "90px", marginLeft: "46px" }}>
                <Button size="small" style={{ width: "76px", marginRight: "5px" }}>打开 </Button>
                <Button size="small" style={{ width: "76px", marginLeft: "5px" }}>下载 </Button>
              </div>
              {/* 标签 */}
              <div style={{ marginLeft: "10px", marginTop: "30px" }}>
                {tags.map((tag, index) => {
                  const isLongTag = tag.length > 20;
                  const tagElem = (
                    <Tag color="blue" key={tag} closable={index !== 3} onClose={() => this.handleClose(tag)}>
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
                  <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                    <Icon type="plus" />
                  </Tag>
                )}
              </div>
              {/* 输入 */}
              <TextArea placeholder="添加注释" style={{ resize: "none", width: "200px", marginTop: "30px", marginLeft: "10px", backgroundColor: "#f5f5f5" }} rows={2} />
              {/* 基本信息 */}
              <div style={{ marginLeft: "10px", marginTop: "20px" }}>
                <h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#333" }}>基本信息</h2>
                <span style={{ fontSize: "12px", color: "#333", float: "left" }}>文件大小:</span>
                <span style={{ fontSize: "12px", color: "#333", float: "right", marginRight: "35px" }}>62.2kb</span><br></br>
                <span style={{ fontSize: "12px", color: "#333", float: "left" }}>文件类型:</span>
                <span style={{ fontSize: "12px", color: "#333", float: "right", marginRight: "35px" }}>doc</span><br></br>
                <span style={{ fontSize: "12px", color: "#333", float: "left" }}>创建时间:</span>
                <span style={{ fontSize: "12px", color: "#333", float: "right", marginRight: "35px" }}>2019年8月29日16:54</span>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

// export default Index;
const mapDispath = dispath => {
  return {
    //改变弹出框状态
    changePopupBox(info) {
      dispath(changePopupBox(info));
    }
  };
};

export default connect(null, mapDispath)(Index);
