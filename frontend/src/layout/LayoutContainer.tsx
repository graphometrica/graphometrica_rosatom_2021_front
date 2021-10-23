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
import { useCommonState } from 'src/store';

import { HeaderContainer } from './HeaderContainer';
import { SideBar } from './SideBar';

// import { Col, Container, Row } from 'react-grid-system';

const { Header, Content, Footer, Sider } = Layout;



export const LayoutContainer: React.FC = (props) => {

  return (

    <Layout>
      <SideBar />
      <Layout>


        <HeaderContainer />

        <Content className="app-content">
          <div
            style={{
              marginTop: 64,
              padding: 0,
              minHeight: 'calc(100vh - 85px)'
            }}>
            {props.children}
          </div>
        </Content>

        {/* <Footer style={{ textAlign: 'center' }}>Graphometrica © 2021</Footer> */}
      </Layout>
    </Layout >
  )
}
