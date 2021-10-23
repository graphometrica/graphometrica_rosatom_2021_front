import { CheckCircleFilled, FireFilled, LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';





export const ComputerBusyStatus: React.FC<{
  isBusy: boolean
}> = ({ isBusy }) => {

  let cln = 'nobg'
  if (isBusy === true) {
    cln = 'rdbg'
  } else if (isBusy === false) {
    cln = 'grgb'
    //bg = { background: '#389e0d' }
  }
  let icon = null;
  if (isBusy === true) {
    icon = <span>занят <FireFilled /></span>
  } else if (isBusy === false) {
    icon = <span>свободен <CheckCircleFilled /></span>
  } else if (isBusy === null) {
    icon = <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />} />
  }


  return (
    <div
      className={"busy-indicator " + cln}
      style={{
        float: 'right',
        textAlign: 'center',

      }}>
      {icon}
    </div>
  )
}
