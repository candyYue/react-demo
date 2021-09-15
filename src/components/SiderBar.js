import React, { useState } from 'react';
import { Link ,useHistory } from "react-router-dom";
import { Menu } from 'antd';
import routeConfig from "@/utils/config/apitestconfig";
const { SubMenu } = Menu;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

function SiderBar() {
  let history = useHistory();

  
  const handleClick = (url) => {
    
  };
  return (
    <div className='sider-bar'>
        <Menu mode="inline" style={{ width: 256 }}>
          {routeConfig.map((route)=>(
            <SubMenu  title={route.title} key={route.key}  icon={route.icon} >
              {route.MenuItem.map((item)=>(
                <Menu.Item key={item.key} onClick={()=>handleClick(item.url)}>
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