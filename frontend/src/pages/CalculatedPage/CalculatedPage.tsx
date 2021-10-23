import { Button, Collapse, Divider, Space, Tag } from 'antd';
import React from 'react';
import { useLines, useRoutes, useStations } from 'src/store';
import { genericDateToRusDateTime } from 'src/utils';

const { Panel } = Collapse;

export const CalculatedPage = () => {

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

        if (line) {
          if (linesMap[i.lineId]) {
            line = linesMap[i.lineId]
          } else {
            line = lines.find(j => j.id === i.lineId);
            linesMap[line.id] = line;
          }

          stationsMap[i.stationId] = { ...i, line }
        }


      })

      //console.log(stationsMap)
      routes.filter(i => i.status === 3).forEach(i => {
        let routeText = i.stations.map(j => stationsMap[j].name).join(', ')
        let resultRouteText = i.result.route.map(j => stationsMap[j].name).join(', ')

        result.push({
          ...i,
          routeText,
          resultRouteText
        })
      })

      setData(result)
    }

  }, [stations, lines, routes])

  const mapStatusToText = (status: number) => {
    return 'Посчитано'
  }

  return (
    <Collapse>
      {data.map(i => {

        return (
          <Panel key={i.routeId} header={<><Tag color={'green'}>{mapStatusToText(i.status)}</Tag> <span>{i.routeText}</span></>}>
            <p>создан: {genericDateToRusDateTime(i.created, true) || 'недавно'}</p>
            <p>кол-во станций: {i.stations.length}</p>
            <p>статус: {mapStatusToText(i.status)}</p>
            <Divider></Divider>

            <b>исходный маршрут</b>
            <p><span>{i.routeText}</span></p>
            <b>оптимальный маршрут</b>
            <p><span>{i.resultRouteText}</span></p>
            <Divider></Divider>
            <p><b>solution type:</b> {i.result.solutionType}</p>
            <p><b>ham energy:</b> {i.result.hamEnergy}</p>
            <p><b>solver type:</b> {i.result.solverType}</p>
            <Divider></Divider>
            <Space>
              <Button type="primary">Скачать маршрут в CSV</Button>
              <Button>Скачать Qubo Matrix в CSV</Button>
              <Button>Скачать Adjacency MatrixCsv в CSV</Button>
            </Space>

          </Panel>
        )
      })}

    </Collapse>
  )
}
