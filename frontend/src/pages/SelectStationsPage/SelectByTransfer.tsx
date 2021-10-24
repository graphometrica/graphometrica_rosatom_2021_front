import { CalculatorOutlined, FireFilled, NodeIndexOutlined } from '@ant-design/icons';
import { Affix, Button, Col, message, Row, Space, Tag, Transfer } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import places from 'src/assets/photo.json';
import { MetroIcon } from 'src/components';
import {
  createRouteFx,
  IRoute,
  useCreateRouteIsBusy,
  useLines,
  useLinesById,
  useStations,
  useStationsByStationId,
} from 'src/store';
import { invertColor } from 'src/utils';


export const SelectByTransfer = (props: any) => {

  const lines = useLines();
  const stations = useStations();
  // const stationsByStationId = useStationsByStationId()
  // const linesById = useLinesById();


  const [transferItems, setTransferItems] = React.useState<Array<{
    key?: string,
    title?: string,
    description?: string,
    disabled?: boolean,
    [name: string]: any
  }>>([]);

  const [kuda, setKuda] = React.useState({})

  React.useEffect(() => {

    if (stations.length && lines.length) {

      const k = {}

      const result = stations.map(i => {


        const foundPlace = places.find(j => j.subway.toLowerCase().split('ё').join('е') === i.name.toLowerCase().split('ё').join('е'));
        if (foundPlace) {
          k[i.stationId] = foundPlace;
        }

        return {
          key: i.stationId,
          title: i.name
        }
      })

      //console.log('k', k)


      setTransferItems(result)
      setKuda(k)
    }

  }, [stations, lines])

  const [selected, setSelected] = React.useState([])
  const [keys, setKeys] = React.useState([])

  const filterOption = (inputValue, option) => {
    return option.title.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
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
  //console.log(kuda, transferItems)
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
      ><NodeIndexOutlined /> ПОСТРОИТЬ<br />МАРШРУТ</Button></div>
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
            <Space direction='vertical'>
              <Space >
                <MetroIcon stationId={item.key} />
                <span>{item.title}</span>
              </Space>
              <div>


                {kuda[item.key] && !!kuda[item.key]?.images?.length && (
                  <>
                    {kuda[item.key]?.images.filter((i, index) => index <= 3)
                      .map((i, index) => {

                        return (
                          <a key={index} href={i.site_url} target="_blank" rel="noreferrer">
                            <img className="iimg" alt='' key={i.image} style={{ width: '54px', marginRight: 6 }} src={i.image} />
                          </a>
                        )
                      })}
                  </>
                )}

              </div>


            </Space>
          )
        }}
      />
    </>
  )
}
