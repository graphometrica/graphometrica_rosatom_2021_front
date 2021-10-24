import { message } from 'antd';
import axios from 'axios';
import {
  combine,
  createApi,
  createDomain,
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
  sample,
  Store,
} from 'effector';
import { useStore } from 'effector-react';
import { pending } from 'patronum';
import { callBackend } from 'src/utils';

import { setCommonState } from './common';
import { ILine, IRoute, IStation } from './types';

/*
getLines
getStations
createRoute
getRoutes
*/

export const downloadDataFx = createEffect<void, any[]>(async () => {
  const linesPromise = getLinesFx();
  const stationsPromise = getStationsFx();
  const routesPromise = getRoutesFx();

  return Promise.all([linesPromise, stationsPromise, routesPromise])
    .then((values) => {
      dataNormalized({
        lines: values[0],
        stations: values[1],
        routes: values[2]
      });
      return values;
    });
});

const dataNormalized = createEvent<{
  lines: ILine[],
  stations: IStation[],
  routes: IRoute[]
}>();

sample({
  clock: dataNormalized,
  fn: ({ lines, stations, routes }) => {

    const linesById: Record<string, ILine> = {}
    lines.forEach(i => linesById[i.id] = i)

    const stationsByStationId: Record<string, IStation> = {}
    const stationsById: Record<string, IStation> = {}

    const newStations: IStation[] = [];
    stations.forEach(i => {

      const newStation = {
        ...i,
        line: linesById[i.lineId]
      }
      stationsByStationId[i.stationId] = newStation;
      stationsById[i.id] = newStation;
      newStations.push(newStation)
    })

    setLinesById(linesById)
    setStationsByStationId(stationsByStationId)
    setStationsById(stationsById)

    const newRoutes: IRoute[] = [];

    routes.forEach(i => {
      const newRoute = {
        ...i,
        stationInstances: i.stations.map(j => stationsByStationId[j]),
      }
      if (newRoute.result?.route) {
        newRoute.result.routeInstances = newRoute.result.route.map(j => stationsByStationId[j]);
      }


      newRoutes.push(newRoute);
    })

    setLines(lines);
    setStations(stations);
    setRoutes(newRoutes);

  }
})

export const setLinesById = createEvent<Record<string, ILine>>();
export const $linesById = createStore<Record<string, ILine>>({});

export const setStationsByStationId = createEvent<Record<string, IStation>>();
export const $stationsByStationId = createStore<Record<string, IStation>>({});

export const setStationsById = createEvent<Record<string, IStation>>();
export const $stationsById = createStore<Record<number, IStation>>({});


export const getLinesFx = createEffect<void, ILine[]>(async () => {
  return callBackend('GET', '/getLines')
});

export const setLines = createEvent<ILine[]>()
export const $lines = createStore<ILine[]>([])
  .on(setLines, (_, result) => result)


export const getStationsFx = createEffect<void, IStation[]>(async () => {
  return callBackend('GET', '/getStations')
});

export const setStations = createEvent<IStation[]>()
export const $stations = createStore<IStation[]>([])
  .on(setStations, (_, result) => result)



export const getRoutesFx = createEffect<void, IRoute[]>(async () => {
  return callBackend('GET', '/getRoutes')
})

export const createRouteFx = createEffect<IRoute, IRoute>(async (route) => {
  return callBackend('POST', '/createRoute', route)
})

// export const setIsCreateRouteBusy = createEvent<boolean>()
// export const $isCreateRouteBusy = createStore(false)
//   .on(setIsCreateRouteBusy, (_, value) => value)

// createRouteFx.pending.watch(pending => {
//   setIsCreateRouteBusy(pending)
// })


createRouteFx.done.watch(() => {
  message.success('Маршрут добавлен в очередь');
  getRoutesFx();
})


export const $isLoading = pending({
  effects: [
    createRouteFx,
    getRoutesFx,
    getStationsFx,
    getLinesFx
  ]
});

export const $isCreateRouteIsBusy = pending({
  effects: [createRouteFx]
})



export const setRoutes = createEvent<IRoute[]>()
export const $routes = createStore<IRoute[]>([])
  .on(setRoutes, (_, result) => result)


sample({
  clock: getRoutesFx.done,
  fn: (({ params, result }) => {
    let isComputerBusy = false;
    let queueCount = result.filter(i => i.status !== 3).length
    if (queueCount > 0) {
      isComputerBusy = true;
    }

    let calculatedCount = result.filter(i => i.status === 3).length

    setCommonState({
      isComputerBusy,
      queueCount,
      calculatedCount
    })
  })
})


