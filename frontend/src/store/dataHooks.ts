import { useStore } from 'node_modules/effector-react';

import { $lines, $routes, $stations } from './effects';


export const useLines = () => useStore($lines)
export const useStations = () => useStore($stations)
export const useRoutes = () => useStore($routes)