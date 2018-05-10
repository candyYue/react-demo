import React from 'react';
import { Table,Button,Icon} from 'antd';
import { Link } from 'react-router-dom';
// import Voice from '../components/Voice.jsx';
// import PropTypes from 'prop-types';
import { request , api} from "../service";



class CallList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          
          visible:false,
          pagination:false,
          ep_id:null,
          columns: [{
            title: '任务ID',
            dataIndex: 'id',
            key: 'id',
          }, {
            title: '任务名称',
            dataIndex: 't_name',
            key: 't_name',
          },  {
            title: '当前状态',
            key: 'state',
            render:(text,index)=>{
              if(text.state==='1'){
                return <div style={{ color: '#42b983' }}>排队</div>
              }
              if(text.state==='2'){
                return <div style={{ color: '#3E8AFA' }}>处理中</div>
              }
              if(text.state==='3'){
                return <div style={{ color: '#f40' }}>处理完毕</div>
              }
              if(text.state==='4'){
                return <div style={{ color: '#f40' }}>暂停处理</div>
              }
            }
          }, {
            title: '操作',
            key: 'action',
            render: (text,index) => (
              <span>
                <a onClick={this.chooseTask.bind(this,text,index)}>查看详情</a>
              </span>
            ),
          }],
          data :[],
          item:[{name:"质检项",keyword:"您好"}],
          calldata:[],
          callcolumns:[{
            title: '话单ID',
            dataIndex: 'call_id',
            key: 'call_id',
          },{
            title: '录音质检状态',
            key: 'status',
            render:(text,index)=>{
              if(text.status==='0'){
                return <span>正常</span>
              }
              if(text.state==='1'){
                return <span>无录音文件</span>
              }
              if(text.state==='2'){
                return <span>下载录音失败</span>
              }
            }
          },{
            title: '录音文本',
            dataIndex: 'call_text',
            key: 'call_text',
            render:(text,index)=>{
              if(text.call_text){
                return <span>text.call_tex</span>
              }else{
                return <span>无</span>
              }
            }
          }]
        }
        
    }
    componentWillMount(){
        this.setState({ep_id:this.props.match.params.id})  
        
    }
    componentDidMount(){
      request(api.getTaskList,{ep_id:this.state.ep_id}).then(res=>{
          if(res.status===0&&res.data){
            res.data.map(v=>{
                return v.key=v.id
            })
            this.setState({data:res.data})
          }
      })
      
    }
    chooseTask (text,index){
      request(api.taskDetail,{
        ep_id:this.state.ep_id,
        task_id:text.id}).then(res=>{
        if(res.status===0){
          this.setState({item:res.data.items})
        }
      });
      request(api.taskRecord,{
        ep_id:this.state.ep_id,
        task_id:text.id}).then(res=>{
        if(res.status===0){
            res.data.map(v=>{
              return v.key=v.id
            })
            this.setState({calldata:res.data})
          }
      })
    }
    render() {
        return (
            <div className="call-list">
              <div className="left-table">
                <Link to="/admin/companymanage"> <Icon type="rollback" /> 返回</Link>

                <br/>
                <br/>
                <br/>

                <h3>任务列表：</h3>
                <Table dataSource={this.state.data} columns={this.state.columns} pagination={this.state.pagination} />
                <Button type="primary" icon="download" size='large' className="download">下载话单列表</Button>
              </div>
              <div className="right-contain">
                <div>
                  <h3>质检项列表：</h3>
                  <br/>
                  {/* <audio src={this.props.srcAddress} ref="audioRecord" controls></audio> */}
                  {/* <Voice  srcAddress={this.state.srcAddress}/> */}
                  <ul>
                  {
                    this.state.item.map((item,index) =>
                      <li  key={index}>
                        <p>{item.name}：<span>关键字：</span>{item.keyword}</p>
                      </li>
                    )
                  }
                  </ul>
                </div>
                <div>
                  <h3>话单列表：</h3>
                  <br/>
                  <Table dataSource={this.state.calldata} columns={this.state.callcolumns} pagination={this.state.pagination}/>
                </div>
              </div>
            </div>
        );
    }
}

export default CallList;