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
import { callBackend } from 'src/utils';

import { setComputerBusyState } from './common';
import { ILine, IRoute, IStation } from './types';

/*
getLines
getStations
createRoute
getRoutes
*/

export const getLinesFx = createEffect<void, ILine[]>(async () => {
  return callBackend('GET', '/getLines')
});
export const $lines = createStore<ILine[]>([])
  .on(getLinesFx.done, (_, { params, result }) => result)


export const getStationsFx = createEffect<void, IStation[]>(async () => {
  return callBackend('GET', '/getStations')
});
export const $stations = createStore<IStation[]>([])
  .on(getStationsFx.done, (_, { params, result }) => result)


export const getRoutesFx = createEffect<void, IRoute[]>(async () => {
  return callBackend('GET', '/getRoutes')
})

export const createRouteFx = createEffect<IRoute, IRoute>(async (route) => {
  return callBackend('POST', '/createRoute', route)
})

export const setIsCreateRouteBusy = createEvent<boolean>()
export const $isCreateRouteBusy = createStore(false)
  .on(setIsCreateRouteBusy, (_, value) => value)

createRouteFx.pending.watch(pending => {
  setIsCreateRouteBusy(pending)
})


createRouteFx.done.watch(() => {
  message.success('Маршрут добавлен в очередь');
  getRoutesFx();
})


export const $routes = createStore<IRoute[]>([])
  .on(getRoutesFx.done, (_, { params, result }) => result)


sample({
  clock: getRoutesFx.done,
  fn: (({ params, result }) => {
    if (result.some(i => i.status === 1)) {
      setComputerBusyState(true)
    } else {
      setComputerBusyState(false)
    }
  })
})


