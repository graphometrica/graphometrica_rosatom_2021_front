import { useStore } from 'effector-react';

import { $isCreateRouteBusy, $lines, $routes, $stations } from './effects';


export const useLines = () => useStore($lines)
export const useStations = () => useStore($stations)
export const useRoutes = () => useStore($routes)

export const useCreateRouteIsBusy = () => useStore($isCreateRouteBusy)