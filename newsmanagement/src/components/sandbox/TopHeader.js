import React ,{useState}from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { Layout, Dropdown ,Menu, Avatar} from 'antd';

const {Header} = Layout;

const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              超级管理员
            </a>
          ),
        },    
        {
          key: '2',
          danger: true,
          label: '退出登录',
        },
      ]}
    />
  );


export default function TopHeader() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Header
        className="site-layout-background"
        style={{padding: '0 16px'}}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
        })}
        <div style={{"float":'right'}}>
            <span>欢迎admin回来</span>
            <Dropdown overlay={menu}>
                <Avatar size="small" icon={<UserOutlined />} />
            </Dropdown>
        </div>
    </Header>
    )
}
