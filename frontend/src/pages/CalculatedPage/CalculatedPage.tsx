import { Button, Collapse, Divider, Space, Tag } from 'antd';
import React from 'react';
import { CSVLink } from 'react-csv';
import { NoData } from 'src/components';
import { useLines, useRoutes, useStations } from 'src/store';
import { convertJsonStringToCsv, genericDateToRusDateTime } from 'src/utils';

import { OptimizedRoute } from './OptimizedRoute';
import { SourceRoute } from './SourceRoute';

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
      routes.filter(i => i.status === 3).forEach(i => {

        let sourceStationNames = i.stations.map(j => stationsMap[j]?.name || null)
        let optimizedStationNames = i.result.route.map(j => stationsMap[j]?.name || null)

        result.push({
          ...i,
          sourceStationNames,
          optimizedStationNames
        })
      })

      setData(result)
    }

  }, [stations, lines, routes])

  const mapStatusToText = (status: number) => {
    return 'Посчитано'
  }

  if (!data.length) {
    return <NoData message="Посчитанных маршрутов пока нет" />
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


            <SourceRoute stationNames={i.sourceStationNames}></SourceRoute>

            <OptimizedRoute stationNames={i.optimizedStationNames} />

            <Divider></Divider>
            <p><b>solution type:</b> {i.result.solutionType}</p>
            <p><b>ham energy:</b> {i.result.hamEnergy}</p>
            <p><b>solver type:</b> {i.result.solverType}</p>
            <Divider></Divider>
            <Space>

              <CSVLink
                filename={"route.csv"}
                className="ant-btn ant-btn-primary"
                data={i.result.routeCsv}
              >Скачать маршрут в CSV</CSVLink>

              <CSVLink
                filename={"quboMatrix.csv"}
                className="ant-btn"
                data={convertJsonStringToCsv(i.result.quboMatrixCsv)}
              >Скачать Qubo Matrix в CSV</CSVLink>

              <CSVLink
                filename={"adjacencyMatrix.csv"}
                className="ant-btn"
                data={convertJsonStringToCsv(i.result.adjacencyMatrixCsv)}
              >Скачать Adjacency Matrix в CSV</CSVLink>

            </Space>

          </Panel>
        )
      })}

    </Collapse>
  )
}
