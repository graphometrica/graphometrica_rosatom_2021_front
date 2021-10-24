import { useStore } from 'effector-react';

import {
  $isCreateRouteIsBusy,
  $isLoading,
  $lines,
  $linesById,
  $routes,
  $stations,
  $stationsById,
  $stationsByStationId,
} from './effects';


export const useLines = () => useStore($lines)
export const useStations = () => useStore($stations)
export const useRoutes = () => useStore($routes)

export const useLinesById = () => useStore($linesById)

export const useStationsByStationId = () => useStore($stationsByStationId)
export const useStationsById = () => useStore($stationsById)

export const useCreateRouteIsBusy = () => useStore($isCreateRouteIsBusy)
export const useIsLoading = () => useStore($isLoading)
