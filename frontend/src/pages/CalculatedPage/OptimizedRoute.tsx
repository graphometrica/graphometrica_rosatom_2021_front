import { Button, Space, Steps, Tag } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';

const { Step } = Steps;
export const OptimizedRoute: React.FC<{ stationNames: string[] }> = ({ stationNames }) => {

  return (
    <>
      <h2>Оптимальный маршрут</h2>
      <Steps direction="vertical" current={stationNames.length - 2}>
        {stationNames?.filter((i, index) => index < stationNames.length - 1)
          .map(i => <Step title={i} icon={<Tag style={{ borderRadius: 12 }}>м</Tag>} description="This is a description." />)}

      </Steps>
    </>
  )
}
