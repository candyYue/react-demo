import React from 'react';
import { Input ,Button,message} from 'antd';
import { request , api} from "../service";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            name:'',
            password:''
        }
    }
    LoginAction(){
        if(this.state.name===''||this.state.password===''){
            message.error('输入不能为空');
        }else{
            request(api.loginIn,{
                username: this.state.name,
                password: this.state.password
            }).then(res=>{
                if(res.status===0&&this.state.name==='Emicnet'&&this.state.password==='9153FD2BDEA340A8B7D4254E26935597'){
                    window.localStorage.setItem("login_auth",'9153FD2BDEA340A8B7D4254E26935597');
                    this.props.history.push('/admin/companymanage' )
                }else{
                    message.error(res.info);
                }
            })
        }
    }
    nameChange(e){
        this.setState({name: e.target.value});
    }
    passwordChange(e){
        this.setState({password: e.target.value});
    }
    render() {
        return (
            <div className="login-page">
                <div className="login-box">
                    <p>WELCOME</p>
                    <div>账号：<Input placeholder="name" size="large" value={this.state.name} onChange={this.nameChange.bind(this)}/></div>
                    <div>密码：<Input placeholder="password" size="large" value={this.state.password} onChange={this.passwordChange.bind(this)}/></div>
                    <Button type="primary" onClick={this.LoginAction.bind(this)}>登录</Button>
                </div>
            </div>
        );
    }
}


export default Login;