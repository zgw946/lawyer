import React, { PureComponent } from 'react';
import './index.css';
import { Modal } from "antd";
import { changePopupBox } from "../actionCreators";
import connect from "react-redux/es/connect/connect";
import { Icon, Input, Upload, message, Button } from 'antd';
const { TextArea } = Input;
// 上传图片
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
// 上传文件
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {

    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
//发表律文
class Index extends PureComponent {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  render() {
    const uploadButton = (
      <div style={{}}>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">点击添加图片</div>
      </div>
    );
    const uploadButton2 = (
      <div style={{}}>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">点击添加视频</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Modal
        width={550}
        destroyOnClose={true}
        footer={null}
        onCancel={() => this.props.changePopupBox([{ type: this.props.popupType }])}
        visible={true}
      >
        <h2 style={{ color: "#333", fontSize: "16px", fontWeight: "bold", textAlign: "center" }}>发表律文</h2>
        <div>
          <span style={{ color: "#333", fontWeight: "bold" }}>内容:</span>
          <Icon type="meh" style={{ float: "right" }} />
          <TextArea placeholder="输入你想要的内容" rows={4} style={{ resize: "none", marginTop: "10px" }} />
        </div>
        <div style={{ marginTop: "10px" }}>
          <span style={{ color: "#333", fontWeight: "bold" }}>图片:</span><br></br>
          {/* <Icon style={{ fontSize: "50px" }} type="picture" /> */}
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
          <span style={{ color: "#333", fontWeight: "bold" }}>视频:</span><br></br>
          {/* <Icon style={{ fontSize: "50px" }} type="picture" /> */}
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton2}
          </Upload>
          <span>文件：</span>
          <Upload {...props}>
            <Button>
              <Icon type="upload" />
            </Button>
          </Upload>
          <Button size="small" style={{backgroundColor:"#2e3341",color:"#fff",width:"60px",marginTop:"20px",marginLeft:"240px"}}>提交</Button>
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