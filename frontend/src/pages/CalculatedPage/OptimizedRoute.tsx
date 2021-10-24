import { LikeOutlined } from '@ant-design/icons';
import { Button, Space, Steps, Tag } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';
import { MetroIcon } from 'src/components';
import { IStation } from 'src/store';

const { Step } = Steps;
export const OptimizedRoute: React.FC<{ stations: IStation[] }> = ({ stations }
) => {

  if (!stations?.length) return null;
  return (
    <>
      <h2>Оптимальный маршрут &nbsp;<LikeOutlined /></h2>
      <Steps direction="vertical" current={stations.length - 2}>
        {stations?.filter((i, index) => index < stations.length - 1)
          .map(i => {
            return (
              <Step key={i.id} title={i.name}
                icon={<span style={{ paddingLeft: 2 }}><MetroIcon stationId={i.stationId} /></span>}
                description={<div className="ant-steps-item-description">{i.line.name}</div>} />
            )
          })}

      </Steps>
    </>
  )
}
