import {
  CalculatorOutlined,
  CarryOutOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  FieldBinaryOutlined,
  FileAddOutlined,
  FireOutlined,
  HourglassOutlined,
  MenuUnfoldOutlined,
  NodeIndexOutlined,
  PlusOutlined,
  SlidersOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Badge, Layout, Menu } from 'antd';
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
        boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
        marginTop: 64
      }}
    >
      <div style={{
        position: 'fixed',
        top: 0,
        height: 64,
        width: 200,
        color: '#fff',
        padding: 16,
        fontSize: 24,
        background: 'rgba(24, 144, 255, 1)',
        margin: 0,
        zIndex: 2
      }}>
        Graphometrica
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedSideMenu]}

        defaultOpenKeys={['rootMenu']}
        style={{ height: '100%' }}
      >

        <SubMenu key="rootMenu" title="Маршрут">

          <Menu.Item onClick={selectWithKey}
            icon={<FileAddOutlined />} key="create">
            Создать</Menu.Item >
          <Menu.Item onClick={selectWithKey} icon={<HourglassOutlined />} key="queue">
            <Badge size="small" count={1} offset={[15, 15]} color="blue">В очереди</Badge>
          </Menu.Item>
          <Menu.Item onClick={selectWithKey} icon={<CalculatorOutlined />} key="calculated">
            <Badge size="small" count={1} offset={[15, 15]} color="blue">Посчитано</Badge></Menu.Item>
        </SubMenu>

      </Menu>
    </Sider>
  )
}
