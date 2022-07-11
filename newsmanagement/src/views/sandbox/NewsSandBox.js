import React from 'react';
import SideMenu from '../../components/sandbox/SideMenu';
import TopHeader from '../../components/sandbox/TopHeader';
import {Routes,Route} from 'react-router-dom';
import Home from './home/Home';
import UserList from './userManage/UserList';
import RoleList from './rightManage/RoleList';
import RightList from './rightManage/RightList';
import Redirect from '../../components/Redirect';
import NotFound from '../../components/NotFound';

import './NewsSandBox.css';

import {Layout} from 'antd';
const {Content} =Layout;

export default function NewsSandBox() {
    return (        
            <Layout>
                <SideMenu></SideMenu>
                <Layout className="site-layout">
                    <TopHeader></TopHeader>
                        <Content
                         className="site-layout-background"
                         style={{
                           margin: '24px 16px',
                           padding: 24,
                           minHeight: 280,
                           overflow:'auto'
                         }}>
                    <Routes>
                        <Route path = "/home" element={<Home/>}></Route>
                        <Route path = "/user-manage/list" element={<UserList/>}></Route>
                        <Route path = "/right-manage/role/list" element={<RoleList/>}></Route>
                        <Route path = "/right-manage/right/list" element={<RightList/>}></Route>

                        <Route path ="/" element={<Redirect to="/home"/>} index></Route>
                        <Route path="*" element={<NotFound/>}></Route> 

                    </Routes>
                </Content>
                </Layout>
            </Layout>
            
    )
}
