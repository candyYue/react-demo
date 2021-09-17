import React, { useState, useContext, useEffect} from 'react';
import {context} from '@/App'
import  SiderBar  from "../../components/SiderBar";
import { Input, Select , Button } from 'antd';
import { DeleteOutlined} from '@ant-design/icons';
import {deepCopy} from "../../utils/helper/assist";
import ReactJson from 'react-json-view'

import * as requestAction from '@/request/action'

const { Option } = Select;

function ApiTest() {
  const {state} = useContext(context)
  // 声明一个新的叫做 “count” 的 state 变量
  const [defaultUrl, setDefaultUrl] = useState('');
  const [paramsList, setParamsList] = useState([]);
  const [jsonData, setJsonData] = useState('');
  useEffect(()=>{
    if(state.currentApi&&state.currentApi.defaultparams){
      setDefaultUrl(state.currentApi.url)
      setParamsList(state.currentApi.defaultparams)
    }else{
      setDefaultUrl('')
      setParamsList([])
    }
  }, [state])// eslint-disable-line


  const handlerAdd = () => {
  }

  const handlerDel = (index) => {
    const list = deepCopy(paramsList)
    list.splice(index,1)

    setParamsList(list)
  }
  const handlerRequest = async ()=>{
    let params = {}
    state.currentApi.defaultparams.map(v=>params[v.key]= v.value)
    requestAction[state.currentApi.apiname](params).then(res=>{
      setJsonData(res)
    })
  }
  return (
    <>
      <SiderBar></SiderBar>
      <div className='view-content'>
        <div className='request-header'>
            {/* <Input placeholder="请输入接口地址" style={{ width: '600px' }} /> */}

            <Input.Group compact>
                <Select defaultValue="GET">
                    <Option value="GET">GET</Option>
                    <Option value="POST">POST</Option>
                </Select>
                <Input style={{ width: '600px' }} value={defaultUrl} />
                <Button onClick={handlerRequest}> 发送 </Button>
            </Input.Group>
        </div>
        
        <div className='request-content'>
            <p>请求参数</p>
            <ul>
                {  paramsList.map((param,index) => (
                  <li key={index} className={param.required?'request-required-param request-item':'request-item'}>
                    <span className='request-key'>{param.key}</span>
                    <Input value={param.value} style={{ width: '300px',marginRight:'10px'}} />
                    <DeleteOutlined onClick={() => handlerDel(index)}/>
                  </li>
                )) }
            </ul>
            {/* <Button size={'small'} onClick={() => handlerAdd()}> ADD </Button> */}
        </div>

        <div className='request-result'>
          { jsonData? <ReactJson src={jsonData}/> : ''}
        </div>
      </div>
    </>
  );
}

export default ApiTest