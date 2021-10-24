import { Button, Collapse, Descriptions, Divider, Space, Tag } from 'antd';
import React from 'react';
import { CSVLink } from 'react-csv';
import { NoData, SourceRoute } from 'src/components';
import { IRoute, useLines, useRoutes, useStations } from 'src/store';
import { convertJsonStringToCsv, genericDateToRusDateTime } from 'src/utils';

import { OptimizedRoute } from './OptimizedRoute';


const { Panel } = Collapse;

export const CalculatedPage = () => {

  const lines = useLines();
  const stations = useStations();

  const routes = useRoutes();

  const [data, setData] = React.useState<IRoute[]>([]);

  React.useEffect(() => {

    if (stations.length && lines.length && routes.length > 0) {
      setData(routes.filter(i => i.status === 3))
    }

  }, [stations, lines, routes])


  if (!data.length) {
    return <NoData message="Посчитанных маршрутов пока нет" />
  }

  return (
    <Collapse defaultActiveKey={[data[0]?.routeId]}>
      {data.map(i => {

        const created = genericDateToRusDateTime(i.created, true)
        const calculated = genericDateToRusDateTime(i.calculated, true)

        return (
          <Panel key={i.routeId}
            style={{ background: '#f6ffed' }}
            header={<>

              <Tag color="blue">Посчитано</Tag>
              <span style={{ fontSize: 10, paddingRight: 12 }}>{created}</span>
              <span style={{ fontSize: 10, paddingRight: 12 }}>кол-во: {i.stationInstances.length}</span>

            </>}>
            <Descriptions >
              <Descriptions.Item label="Создан">{created}</Descriptions.Item>
              <Descriptions.Item label="Solution type">{i.result.solutionType}</Descriptions.Item>
              <Descriptions.Item label="Тип бэкенда">{i.result.solverType}</Descriptions.Item>
              <Descriptions.Item label="Посчитан">{calculated}</Descriptions.Item>
              <Descriptions.Item label="Ham energy">
                {i.result.hamEnergy}
              </Descriptions.Item>
            </Descriptions>

            <Divider></Divider>


            <SourceRoute stations={i.stationInstances}></SourceRoute>

            <Divider></Divider>
            <OptimizedRoute stations={i.result.routeInstances} />


            <Divider></Divider>
            <Space direction={"vertical"} style={{ marginBottom: 32 }}>

              <CSVLink
                style={{ width: 245 }}
                filename={"route.csv"}
                className="ant-btn ant-btn-primary"
                data={i.result.routeCsv}
              >Скачать маршрут в CSV</CSVLink>

              <CSVLink
                style={{ width: 245 }}
                filename={"quboMatrix.csv"}
                className="ant-btn"
                data={convertJsonStringToCsv(i.result.quboMatrixCsv)}
              >Скачать Qubo Matrix в CSV</CSVLink>

              <CSVLink
                style={{ width: 245 }}
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
