import { Button, Collapse, Space, Tag } from 'antd';
import React from 'react';
import { NoData, SourceRoute } from 'src/components';
import { IRoute, useLines, useLinesById, useRoutes, useStations, useStationsByStationId } from 'src/store';
import { genericDateToRusDateTime } from 'src/utils';

const { Panel } = Collapse;

export const QueuePage = () => {

  const lines = useLines();
  const stations = useStations();

  const routes = useRoutes();


  const [data, setData] = React.useState<IRoute[]>([]);

  React.useEffect(() => {

    if (stations.length && lines.length && routes.length > 0) {
      setData(routes.filter(i => i.status !== 3))
    }

  }, [stations, lines, routes])



  if (!data.length) {
    return <NoData icon="ok" message="Все маршруты посчитались" />
  }

  return (
    <Collapse defaultActiveKey={[data[0].routeId]}>
      {data.map(i => {

        const created = genericDateToRusDateTime(i.created, true)

        return (
          <Panel key={i.routeId}
            style={{ background: '#fffbe6' }}
            header={<>

              <Tag color="blue">В очереди</Tag>
              <span style={{ fontSize: 10, paddingRight: 12 }}>{created}</span>
              <span style={{ fontSize: 10, paddingRight: 12 }}>кол-во: {i.stationInstances.length}</span>

            </>}>
            <SourceRoute stations={i.stationInstances}></SourceRoute>
            <p>количество станций в маршруте: {i.stationInstances.length}</p>
          </Panel>
        )
      })}

    </Collapse >
  )
}
