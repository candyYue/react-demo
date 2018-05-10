import React from 'react';
import { Table ,Input} from 'antd';
import { request , api} from "../service";
import Loading from '../components/Loading.jsx';

class Syetemlog extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource : [], 
            columns : [{
                title: '企业名称',
                dataIndex: 'epname',
                key: 'epname',
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
            }, {
                title: '账户',
                dataIndex: 'account',
                key: 'account',
            }, {
                title: '日志',
                dataIndex: 'message',
                key: 'message',
            }, {
                title: '操作地址',
                dataIndex: 'operator_url',
                key: 'operator_url',
            }],
            loading:false   
        }
        this.SearchLog=(ep_id="")=>{
            request(api.getlogList,{
                ep_id:ep_id
            }).then(res=>{
                if(res.status===0&&res.data){
                    res.data.map(v=>{
                        return v.key=v.id
                    })
                    this.setState({loading:false})
                    this.setState({dataSource:res.data})
                }else{
                    this.setState({loading:false})
                    this.setState({dataSource:[]})
                }
            })
        }
    }
    componentWillMount(){
        this.setState({loading:true})
        this.SearchLog()
    }
    
    Search(value){
        this.SearchLog(value)
    }
    render() {
        const Search = Input.Search;
        return (
            <div className="system-log">
                <Search placeholder="ep_id" onSearch={this.Search.bind(this)} style={{width:"300px",marginBottom:"20px"}}/>
                <br/>
                <div className="systemtable">
                    <Loading loading={this.state.loading}/>
                    <Table dataSource={this.state.dataSource} columns={this.state.columns} />
                </div>
            </div>
        );
    }
}


export default Syetemlog;