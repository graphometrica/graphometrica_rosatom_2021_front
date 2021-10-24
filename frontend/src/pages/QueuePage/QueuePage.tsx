import { Button, Collapse, Space, Tag } from 'antd';
import React from 'react';
import { NoData } from 'src/components';
import { useLines, useRoutes, useStations } from 'src/store';
import { genericDateToRusDateTime } from 'src/utils';

const { Panel } = Collapse;

export const QueuePage = () => {

  const lines = useLines();
  const stations = useStations();

  const routes = useRoutes();

  const [data, setData] = React.useState([]);

  React.useEffect(() => {

    if (stations.length && lines.length && routes.length > 0) {

      const linesMap = {}

      const stationsMap = {}

      const result = [];
      stations.forEach(i => {

        let line = null;

        //if (line) {
        if (linesMap[i.lineId]) {
          line = linesMap[i.lineId]
        } else {
          line = lines.find(j => j.id === i.lineId);
          linesMap[line.id] = line;
        }

        stationsMap[i.stationId] = { ...i, line }
        //}


      })

      //console.log(stationsMap)
      routes.filter(i => i.status <= 2).forEach(i => {
        let routeText = i.stations.map(j => {

          return stationsMap[j].name
        }).join(', ')

        result.push({ ...i, routeText })
      })

      setData(result)
    }

  }, [stations, lines, routes])

  const mapStatusToText = (status: number) => {
    if (status === 1) {
      return "В очереди"
    } else if (status === 2) {
      return "Считается"
    }
    return 'Неизвестно'
  }

  if (!data.length) {
    return <NoData icon="ok" message="Все маршруты посчитались" />
  }

  return (
    <Collapse>
      {data.map(i => {

        return (
          <Panel key={i.routeId} header={<><Tag color={i.status === 1 ? 'gold' : 'red'}>{mapStatusToText(i.status)}</Tag> <span>{i.routeText}</span></>}>
            <p>создан: {genericDateToRusDateTime(i.created, true) || 'недавно'}</p>
            <p>кол-во станций: {i.stations.length}</p>
            <p>статус: {mapStatusToText(i.status)}</p>
          </Panel>
        )
      })}

    </Collapse>
  )
}
