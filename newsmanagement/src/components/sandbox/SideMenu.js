import React,{useState,useEffect} from 'react';
import {Layout,Menu} from 'antd';
import {NavLink} from 'react-router-dom'

import './index.css';
import axios from 'axios';
import {AppstoreOutlined} from '@ant-design/icons'

const {Sider} =Layout;

const getItem=({title, key, icon, children, type}) =>{
    return {
      key,
      icon:iconList[key],
      children,
      label:<NavLink to={key} className="side">{title}</NavLink>,
      type,
    };
  }

 const checkPermission =(item)=>{
        return item?.pagepermisson
}

const iconList ={
    "/home":<AppstoreOutlined/>,
    "/user-manage-list":<AppstoreOutlined/>,
    "/right-manage/role/list":<AppstoreOutlined/>,
    "/right-manage/right/list":<AppstoreOutlined/>
}

const renderMenu = (menuList)=>{
    return menuList.map(item => {
        if(checkPermission(item)&& item?.children?.length>0){
            item.children=renderMenu(item.children);
        }else{
            item.children=null;
        }
        
        return checkPermission(item)&& getItem(item);
    })
}

export default function SideMenu() {
   

    const[menu,setMenu] =useState([]);
    const [collapsed] = useState(false);

    
    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/rights?_embed=children").then(res=>{
            setMenu(res.data);
        });
        
    },[])
    
    
    
    
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="outLine">
                <div className="logo" >全球新闻发布管理系统</div>
                <div className="content">
                <Menu
                    theme="dark"
                    mode="inline"
                    //defaultSelectedKeys={[location.pathname]}
                    //  defaultOpenKeys={['']}
                    items={renderMenu(menu)}
                />
                </div>
            </div>
        </Sider>
    )
}
