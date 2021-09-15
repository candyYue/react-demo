import React, { useState } from 'react';
import  SiderBar  from "../../components/SiderBar";
import { Input, Select ,Table, Button, Space } from 'antd';
import { DeleteOutlined} from '@ant-design/icons';
import {deepCopy} from "../../utils/helper/assist";

import {getHotVideo} from '@/request/action'

const { Option } = Select;

function ApiTest() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [requestUrl, setRequestUrl] = useState('http://apis.juhe.cn/juheapi/fapig/douyin/billboard')
  const [paramsList, setParamsList] = useState([
     {
        key: 'id',
        value: '',
        required:false
      },
      {
        key: 'key',
        value: '259f32a384e02f36cf4e83d0745993f1',
        required:true
      },
      {
        key: 'type',
        value: 'hot_video',
        required:false
      },
      {
        key: 'page',
        value: '',
        required:false,
      },
      {
        key: 'limit',
        value: '',
        required:false
      },
  ]);
  const handlerAdd = () => {
  }

  const handlerDel = (index) => {
    const list = deepCopy(paramsList)
    list.splice(index,1)

    setParamsList(list)
  }
  const handlerRequest = async ()=>{
    getHotVideo({
        key:'259f32a384e02f36cf4e83d0745993f1',
        type:'hot_video'
      }).then(res=>{
        console.log(res)
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
                <Input style={{ width: '600px' }} defaultValue={requestUrl} />
                <Button onClick={handlerRequest}> 发送 </Button>
            </Input.Group>
        </div>
        
        <div className='request-content'>
            <p>请求参数</p>
            <ul>
                {  paramsList.map((param,index) => (
                  <li key={index} className={param.required?'request-required-param request-item':'request-item'}>
                    <span className='request-key'>{param.key}</span>
                    <Input placeholder={param.value} style={{ width: '300px',marginRight:'10px'}} />
                    <DeleteOutlined onClick={() => handlerDel(index)}/>
                  </li>
                )) }
            </ul>
            {/* <Button size={'small'} onClick={() => handlerAdd()}> ADD </Button> */}
        </div>

        <div className='request-result'>
        result
        </div>
      </div>
    </>
  );
}

export default ApiTest