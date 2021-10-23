import { Affix, Button, Space } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';
import { getRoutesFx } from 'src/store';

import { SelectByTransfer } from './SelectByTransfer';


export const SelectStationsPage = () => {


  return (
    <div>
      <SelectByTransfer />
    </div>
  )
}
