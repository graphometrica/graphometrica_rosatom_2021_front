import { CalculatorOutlined, FireFilled } from '@ant-design/icons';
import { Affix, Button, Col, message, Row, Space, Tag, Transfer } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { createRouteFx, IRoute, useCreateRouteIsBusy, useLines, useStations } from 'src/store';


export const SelectByTransfer = () => {

  const lines = useLines();
  const stations = useStations();

  const [transferItems, setTransferItems] = React.useState<Array<{
    key?: string,
    title?: string,
    description?: string,
    disabled?: boolean,
    [name: string]: any
  }>>([]);

  React.useEffect(() => {

    if (stations.length && lines.length) {

      const linesMap = {}

      const result = [];
      stations.forEach(i => {

        let line = null;

        if (linesMap[i.line_id]) {
          line = linesMap[i.line_id]
        } else {
          line = lines.find(j => j.id === i.line_id);
          linesMap[line.id] = line;
        }

        result.push({
          key: i.station_id,
          title: i.name,
          line: line
        })
      })

      setTransferItems(result)
    }

  }, [stations, lines])

  const [selected, setSelected] = React.useState([])
  const [keys, setKeys] = React.useState([])

  const filterOption = (inputValue, option) => {
    return option.title.toLowerCase().indexOf(inputValue) >= 0
  }

  const handleChange = (targetKeys) => {

    if (targetKeys.length <= 5) {
      setSelected(targetKeys)
    } else {
      message.warning('Максимальное кол-во станций: 5');

      setSelected(targetKeys.reverse()
        .filter((i, index) => index <= 4).reverse())

    }
  }

  const handleSelectChange = (newKeys) => {


    if (newKeys.length <= 5) {
      setKeys(newKeys)
    } else {
      message.warning('Максимальное кол-во станций: 5');

      setKeys(newKeys.reverse()
        .filter((i, index) => index <= 4).reverse())

    }

  }

  const history = useHistory()
  const calculateRoute = () => {
    const route: IRoute = {
      stations: selected
    };
    createRouteFx(route).then(_ => {
      setSelected([])
      setKeys([])
      history.push('queue')
    })

  }

  const isBusy = useCreateRouteIsBusy()



  return (
    <>
      <div
        className='create-route-bar'
        style={{
          position: 'fixed',
          right: 0,
          zIndex: 2,
          top: 68

        }}
      ><Button
        disabled={selected.length < 3}
        loading={isBusy}
        onClick={calculateRoute}
        className='calculate-route-button gradient-btn'
        style={{

          fontWeight: 700
        }}
        type="primary"
      ><FireFilled /> ПОСТРОИТЬ<br />МАРШРУТ</Button></div>
      <Transfer
        style={{ minWidth: '350px' }}
        locale={{
          notFoundContent: 'Нет данных',
          searchPlaceholder: 'Начните ввод для поиска',
          itemUnit: 'станция',
          itemsUnit: 'станций',
          remove: 'убрать'
        }}
        listStyle={{
          width: '30%',
          minWidth: 350,
          height: 'calc(100vh - 120px)',
        }}
        onSelectChange={handleSelectChange}
        showSelectAll={false}
        oneWay

        dataSource={transferItems}
        showSearch
        filterOption={filterOption}
        targetKeys={selected}
        selectedKeys={keys}
        onChange={handleChange}
        render={item => {
          return (
            <Space>
              <Tag style={{ background: '#' + item.line.color, borderRadius: 12 }}>&nbsp;&nbsp;</Tag>
              <span>{item.title}</span>
            </Space>
          )
        }}
      />
    </>
  )
}
