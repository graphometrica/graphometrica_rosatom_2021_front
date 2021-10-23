import { Button, Space } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';
import { getRoutesFx } from 'src/store';


export const SelectStationsPage = () => {

  React.useEffect(() => {
    getRoutesFx();
  }, [])

  return (
    <div>
      <p>SelectStationsPage</p>
    </div>
  )
}
