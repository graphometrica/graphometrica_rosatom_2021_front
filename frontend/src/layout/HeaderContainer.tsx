import {
  CarryOutOutlined,
  CheckCircleFilled,
  FireOutlined,
  MenuUnfoldOutlined,
  NodeIndexOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Col, Layout, Menu, Row } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React from 'react';
import { useCommonState, useSelectedSideMenu } from 'src/store';

import { ComputerBusyStatus } from './ComputerBusyStatus';

const { Header, Content, Footer, Sider } = Layout;



export const HeaderContainer = () => {

  const {
    isComputerBusy
  } = useCommonState()

  const selectedSideMenu = useSelectedSideMenu();

  let title = '';

  if (selectedSideMenu === 'create') {
    title = 'Выберите станции'
  } else if (selectedSideMenu === 'queue') {
    title = 'Маршруты в очереди'
  } else if (selectedSideMenu === 'calculated') {
    title = 'Посчитанные маршруты'
  }

  return (
    <Header
      className="nav-header-container"
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        color: '#fff',
        background: 'rgb(117, 58, 136)',
        margin: 0,
        paddingRight: 0
      }} >

      <Row className="nav-header-bar">
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <h3 className='nav-header-title' style={{ color: '#fff' }}>{title}</h3>
        </Col>

        <Col xs={12} sm={12} md={12} lg={12} xl={12}
          style={{
            paddingRight: 0,
            height: '64px',
          }} >

          <ComputerBusyStatus isBusy={isComputerBusy} />

        </Col>
      </Row>
    </Header>
  )
}
