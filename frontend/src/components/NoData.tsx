import { CheckCircleOutlined, CoffeeOutlined, NodeIndexOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Result, Space } from 'antd';
import React from 'react';



export const NoData: React.FC<{
  icon?: string,
  message?: string,
  extra?: React.FC
}> = ({ message, extra, icon }) => {


  return (
    <Result
      icon={icon === 'ok' ? <CheckCircleOutlined /> : <NodeIndexOutlined />}
      title={message || 'Здесь пока ничего нет'}
      extra={extra}
    />
  )
}
