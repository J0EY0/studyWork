import React,{useState,useEffect} from 'react';
import {Layout,Menu} from 'antd';
import {NavLink} from 'react-router-dom'

import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    AppstoreOutlined, 
    MailOutlined, 
    SettingOutlined,
  } from '@ant-design/icons';

import './index.css';
import axios from 'axios';

const {Sider} =Layout;

const getItem=({title, key, icon, children, type}) =>{
    return {
      key,
      icon,
      children,
      label:<NavLink to={key}>{title}</NavLink>,
      type,
    };
  }


export default function SideMenu() {

    const[menu,setMenu] =useState([])

    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/rights?_embed=children").then(res=>{
            console.log(res.data)
            setMenu(res.data)
        })
    },[])
    const [collapsed] = useState(false);

    const renderMenu = (menuList)=>{
        return menuList.map(item => {
            if(item.children){
                item.children=renderMenu(item.children)
            }
            return getItem(item) 
        })
    }
     
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" >全球新闻发布管理系统</div>
            <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={renderMenu(menu)}
            />
        </Sider>
    )
}
