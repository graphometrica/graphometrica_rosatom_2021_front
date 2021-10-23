import { LoadingOutlined } from '@ant-design/icons';
import { Affix, Button, Space, Spin } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';
import { getRoutesFx, useLines, useStations } from 'src/store';

import { SelectByTransfer } from './SelectByTransfer';


export const SelectStationsPage = () => {
  const lines = useLines();
  const stations = useStations();



  return (
    <div>
      {(!lines.length || !stations.length) && (
        <>
          <div style={{ marginTop: 128 }}>Подождите, загружаю данные &nbsp; <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#753a88' }} spin />} /> </div>
        </>
      )}

      {!!lines.length && !!stations.length && (
        <SelectByTransfer />

      )}


    </div>
  )
}
