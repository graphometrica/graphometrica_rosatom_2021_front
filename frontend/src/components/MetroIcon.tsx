import { Tag } from 'antd';
import React from 'react';
import { useStationsByStationId } from 'src/store';
import { invertColor } from 'src/utils';



export const MetroIcon: React.FC<{
  stationId: string,
}> = ({ stationId }) => {
  const stationsByStationId = useStationsByStationId()

  const station = stationsByStationId[stationId];


  return (
    <Tag style={{
      background: '#' + station.line.color,
      color: invertColor(station.line.color),
      borderRadius: 12
    }}>м</Tag>)
}
