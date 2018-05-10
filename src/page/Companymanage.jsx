import React from 'react';
import { Table,Input} from 'antd';
import {Link } from 'react-router-dom';
import Rightcontent from "../components/Rightcontent"
import { request , api} from "../service";


class Companymanage extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
            // age:"",
            selectedRowKeys:[],
            columns : [{
                title: '企业ID',
                dataIndex: 'id',
                key: 'id',
            },{
                title: '企业名称',
                dataIndex: 'ename',
                key: 'ename',
                // render: text => <a>{text}</a>,
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
            }, {
                title: 'Action',
                key: 'action',
                render: (text,record,index)=>(  
                    <span>
                        <a title="详情" onClick={this.setDetail.bind(this,text,index)}>详情</a>  
                        &nbsp;
                        <Link to={`/admin/calllist/${text.id}`}>任务列表</Link>
                    </span>  
                )
            }],
            data : []
        };
    }
    setDetail(text,index){
        request(api.epProfiles,{
            ep_id:  text.id
        }).then(res=>{
            if(res.status===0&&res.data){
                this.setState({RightcontentProps:{
                    ep_id:text.id,
                    storage_ks3_access_key:res.data.storage_ks3_access_key,
                    storage_ks3_bucket:res.data.storage_ks3_bucket,
                    storage_ks3_endpoint:res.data.storage_ks3_endpoint,
                    storage_ks3_secret_key:res.data.storage_ks3_secret_key
                }}) 
            }else{
                this.setState({RightcontentProps:{
                    ep_id:text.id
                }})
            }
        })
    }
    // onDelete(text,index){  
        // console.log(text)   
        // console.log(index)  
    //     const data = [...this.state.data];  
    //     data.splice(index, 1);//index为获取的索引，后面的 1 是删除几行  
    //     this.setState({ data });  
    // }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    componentWillMount(){
        // this.setState({id:this.props.match.params.id})
        request(api.getCompanyList).then(res=>{
            if(res.status===0){
                res.data.map(v=>{
                    return v.key=v.id
                })
                this.setState({data:res.data})
            }else{
                // message.error(res.info);
            }
        })
    }
    
    render() {
        const Search = Input.Search;
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };
        return (
            <div className="content-contain">
                <div className="left-table">
                    <h3>企业列表：</h3>
                    <Search placeholder="input search text" onSearch={value => console.log(value)} style={{width:"300px",marginBottom:"20px"}}/>
                    <Table 
                    onRow={(record,index) => {
                        return {
                        onClick: () => {
                            // this.setState({id: index});
                            },       // 点击行
                        };
                    }}
                    rowSelection={rowSelection} 
                    columns={this.state.columns} dataSource={this.state.data} />
                    
                </div>
                <div className="right-contain">
                    <Rightcontent {...this.state.RightcontentProps}/>
                </div>
            </div>
            
        );
    }
}

export default Companymanage;