import {
  CheckCircleFilled,
  CheckCircleOutlined,
  FireFilled,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Col, Layout, Menu, PageHeader, Row, Typography } from 'antd';
import React from 'react';

import { SideBar } from './SideBar';

// import { Col, Container, Row } from 'react-grid-system';

const { Header, Content, Footer, Sider } = Layout;



export const LayoutContainer: React.FC = (props) => {

  return (
    <Layout>
      <SideBar />
      <Layout>


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
              <h3 style={{ color: '#fff' }}>Выберите станции метро</h3>

            </Col>

            <Col xs={12} sm={12} md={12} lg={12} xl={12}
              style={{
                paddingRight: 0,
                height: '64px',

              }} >


              <div style={{
                float: 'right',
                width: '110px',
                /* background: '#f5222d', --занят */
                background: '#389e0d',
                textAlign: 'center',
              }}>
                {/* занят <FireFilled /> */}
                свободен <CheckCircleFilled />
              </div>

            </Col>
          </Row>
        </Header>

        <Content className="app-content">
          <div
            style={{
              marginTop: 64,
              padding: 0,
              minHeight: 'calc(100vh - 135px)'
            }}>
            {props.children}
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>Graphometrica ©2021</Footer>
      </Layout>
    </Layout >
  )
}
