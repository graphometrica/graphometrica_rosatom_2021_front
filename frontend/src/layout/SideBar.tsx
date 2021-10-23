import {
  CarryOutOutlined,
  FireOutlined,
  MenuUnfoldOutlined,
  NodeIndexOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React from 'react';

const { Header, Content, Footer, Sider } = Layout;



export const SideBar = () => {


  return (
    <Sider
      theme='light'
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{
        boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"
      }}
    >
      <div style={{
        height: 32,
        margin: 16,
        padding: 0,
        // background: '#ccc',

        fontSize: 24
      }}>
        Graphometrica
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%' }}
      >
        <SubMenu key="sub1" icon={<NodeIndexOutlined />} title="Маршрут">
          <Menu.Item icon={<PlusOutlined />} key="1">Создать</Menu.Item >
          <Menu.Item icon={<UnorderedListOutlined />} key="2">В очереди</Menu.Item>
          <Menu.Item icon={<CarryOutOutlined />} key="3">Посчитано</Menu.Item>
        </SubMenu>

      </Menu>
    </Sider>
  )
}
