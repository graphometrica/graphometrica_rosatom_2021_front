import { NodeIndexOutlined } from '@ant-design/icons';
import { Button, Space, Steps, Tag } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';
import { IStation } from 'src/store';

const { Step } = Steps;
export const SourceRoute: React.FC<{ stations: IStation[] }> = ({ stations }) => {
  if (!stations?.length) return null;
  return (
    <div style={{ marginBottom: 16 }}>
      <h2>Исходный маршрут &nbsp;<NodeIndexOutlined /></h2>
      <p>
        {stations.map((i, index) => {
          return (
            <span style={{ fontWeight: 700, color: '#' + i.line.color, paddingRight: 6 }} key={i.id}>
              м.&nbsp;{i.name}
              {index < stations.length - 1 ? ', ' : ''}</span>
          )
        })}</p>

    </div>
  )
}
