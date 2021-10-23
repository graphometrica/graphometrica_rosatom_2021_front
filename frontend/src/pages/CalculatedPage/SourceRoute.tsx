import { Button, Space, Steps, Tag } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';

const { Step } = Steps;
export const SourceRoute: React.FC<{ stationNames: string[] }> = ({ stationNames }) => {

  return (
    <div style={{ marginBottom: 32 }}>
      <h2>Исходный маршрут</h2>
      <p>{stationNames.join(', ')}</p>
    </div>
  )
}
