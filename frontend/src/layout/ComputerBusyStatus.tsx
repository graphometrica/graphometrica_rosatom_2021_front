import { CheckCircleFilled, FireFilled } from '@ant-design/icons';
import React from 'react';





export const ComputerBusyStatus: React.FC<{
  isBusy: boolean
}> = ({ isBusy }) => {

  const bg = isBusy ? '#f5222d' : '#389e0d'
  const icon = isBusy ? <span>занят <FireFilled /></span> : <span>свободен <CheckCircleFilled /></span>

  return (
    <div style={{
      float: 'right',
      width: '110px',
      background: bg,
      textAlign: 'center',
    }}>
      {icon}
    </div>
  )
}
