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
import { HashRouter as Router, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';
import { menuSelected, useSelectedSideMenu } from 'src/store';

const { Sider } = Layout;





export const SideBar = () => {

  const history = useHistory()
  const location = useLocation();

  const selectedSideMenu = useSelectedSideMenu();

  React.useEffect(() => {


    if (location.pathname === '/') {
      menuSelected('create')
    } else if (location.pathname === '/queue') {
      menuSelected('queue')
    } else if (location.pathname === '/calculated') {
      menuSelected('calculated')
    }
  }, [location])

  const selectWithKey = (e: any) => history.push("/" + (e.key === "create" ? "" : e.key))

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
        fontSize: 24
      }}>
        Graphometrica
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedSideMenu]}

        defaultOpenKeys={['rootMenu']}
        style={{ height: '100%' }}
      >
        <SubMenu key="rootMenu" icon={<NodeIndexOutlined />} title="Маршрут">
          <Menu.Item onClick={selectWithKey}
            icon={<PlusOutlined />} key="create">Создать</Menu.Item >
          <Menu.Item onClick={selectWithKey} icon={<UnorderedListOutlined />} key="queue">В очереди</Menu.Item>
          <Menu.Item onClick={selectWithKey} icon={<CarryOutOutlined />} key="calculated">Посчитано</Menu.Item>
        </SubMenu>

      </Menu>
    </Sider>
  )
}
