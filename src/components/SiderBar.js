import React, { useContext, useEffect} from 'react';
import {context} from '@/App'

import { Link ,useHistory } from "react-router-dom";
import { Menu } from 'antd';
import routeConfig from "@/utils/config/apitestconfig";
const { SubMenu } = Menu;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

function SiderBar() {

  const {state,dispatch} = useContext(context)
  let history = useHistory();

  // useEffect(()=>{
  //   dispatch({type:'getCurrentApi',currentApi:routeConfig[0].MenuItem})
  // }, [])// eslint-disable-line
  const handleClick = (item) => {
    dispatch({type:'getCurrentApi',currentApi:item})
  };
  return (
    <div className='sider-bar'>
        <Menu mode="inline" style={{ width: 256 }}>
          {routeConfig.map((route)=>(
            <SubMenu  title={route.title} key={route.key}  icon={route.icon} >
              {route.MenuItem.map((item)=>(
                <Menu.Item key={item.key} onClick={()=>handleClick(item)}>
                  <Link to={`/apitest/${item.key}`}>{item.label}</Link>
                </Menu.Item>
              ))}
          </SubMenu>
          ))}
        </Menu>
    </div>
  );
}

export default SiderBar