import React from 'react';
import { Layout, Menu, Icon, Dropdown, Modal,message,Input} from 'antd';
import { request , api} from "../service";
import { Link } from 'react-router-dom';
import routes from '../route/index.js';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      value: 1,
      visible: false,
      loading: false
    };
  }
  componentWillMount(){
    if(!window.localStorage.getItem("login_auth")){
      this.props.history.push('/login' );
      return false
    }
  }
  handleMenuClick = (e) => {
    if (e.key === '1') {
      this.setState({
        visible: true,
      });
    }
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  } 
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  // upload
  handleChange = (info) => {
    function getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
  beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }
  // changeSelect(item){
  //   console.log(item)
  //   this.setState({defaultSelectedKeys:item.key})
  // }
  loginOut(){
    request(api.logout).then(res=>{
        if(res.status===0){
          this.props.history.push('/login' )
          window.localStorage.removeItem("login_auth")
        }else{
            message.error(res.info);
        }
    })
  }
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">
          <a href="javascript:;">修改信息</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a href="javascript:;" >其他操作</a>
        </Menu.Item>
        <Menu.Item key="3">
          <a href="javascript:;" onClick={this.loginOut.bind(this)}>退出登录</a>
        </Menu.Item>
      </Menu>
    );
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传头像</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="top" >菜单栏</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} >
            {/* <Menu.Item key="1">
              <Link to="/admin/companymanage">
                <Icon type="user" />
                <span>企业管理</span>
              </Link>
            </Menu.Item> */}
            <SubMenu key="sub1" title={<span><Icon type="user" /><span>企业管理</span></span>}>
            <Menu.Item key="1">
                <Link to="/admin/companymanage">
                  <Icon type="bars" />
                  <span>企业列表</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/admin/audio">
                  <Icon type="sound" />
                  <span>系统录音</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>系统管理</span></span>}>
            <Menu.Item key="3">
                <Link to="/admin/systemsetting">
                  <Icon type="setting" />
                  <span>系统设置</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/admin/systemlog">
                  <Icon type="file" />
                  <span>系统日志</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
              <Link to="/admin/otherpage">
                <Icon type="ellipsis" />
                <span>其他</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className='personal'>
              <div className='personal-photo'></div>
              <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
                <a className="ant-dropdown-link" href="javascript:;">
                  <span className='personal-text'>个人中心</span>
                  <Icon type="down" />
                </a>
              </Dropdown>
            </div>

          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              {routes}
          </Content>

        </Layout>
        <Modal
          title="修改信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText={"取消"}
        >
          
          {/* <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="//jsonplaceholder.typicode.com/posts/"
            beforeUpload={this.beforeUpload.bind(this)}
            onChange={this.handleChange.bind(this)}
          >
            {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
          </Upload> */}
          
          <p>账号：<Input placeholder="账号"  style={{ width: '400px'}}/></p>
          <p>密码：<Input placeholder="密码" style={{ width: '400px'}}/></p>
        </Modal>
      </Layout>
    );
  }
}

export default Home;