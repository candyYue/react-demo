import React, { useState } from 'react';
import  SiderBar  from "../../components/SiderBar";
import { Input, Select ,Table, Button, Space } from 'antd';

import {deepCopy} from "../../utils/helper/assist";
const { Option } = Select;

function ApiTest() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [paramsList, setParamsList] = useState([
     {
        key: 'id',
        value: '',
        required:true
      },
      {
        key: 'page',
        value: '',
        required:false,
      },
      {
        key: 'limit',
        value: '',
        required:true
      },
  ]);
  const handlerAdd = () => {
  }

  const handlerDel = (index) => {
    const list = deepCopy(paramsList)
    list.splice(index,1)

    setParamsList(list)
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
                <Input style={{ width: '600px' }} defaultValue="" />
            </Input.Group>
        </div>
        
        <div className='request-content'>
            <p>请求参数</p>
            <ul>
                {  paramsList.map((param,index) => (
                  <div key={index} className={param.required?'request-required-param':''}>
                    <span>{param.key} = </span><Input placeholder={param.value} style={{ width: '300px' }} /> <Button size={'small'} onClick={() => handlerDel(index)}> DELETE </Button>
                  </div>
                )) }
            </ul>
            {/* <Button size={'small'} onClick={() => handlerAdd()}> ADD </Button> */}
            {/* <Table dataSource={paramsList} pagination={false}>
                <Column title="KEY" dataIndex="key" key="key" />
                <Column title="VALUE" dataIndex="value" key="value" />
                <Column title="Action" key="action" render={( text, record, index) => (
                    <Button type="text" size={'small'} onClick={() => handlerDel(text, record, index)}> DELETE </Button>
                )} />
            </Table> */}
        </div>

        <div className='request-result'>
        result
        </div>
      </div>
    </>
  );
}

export default ApiTest