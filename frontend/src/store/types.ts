export type IStation = {

  id: number,
  station_id: string
  line_id: string,
  name: string,
  inCirle?: boolean,
  top: number,
  left: number,
  labelTop?: number,
  labelLeft?: number,
  labelRight?: number,
  labelBottom?: number,
  close?: boolean,
  outside?: boolean,
  payload?: any,
}

export type ILine = {
  id: string,
  name: string,
  isMCC?: boolean,
  isCircle?: boolean,
  color: string,
  payload?: any,
}

export type IRoute = {
  routeId?: string,
  stations: string[],
  status?: 1 | 2 | 3,
  created?: number,
  payload?: any,
  result?: {
    route: string[],
    totalTime?: number,
    routeCsv?: string,
    quboMatrixCsv?: string,
    adjacencyMatrixCsv?: string,
    solutionType?: string,
    hamEnergy?: number,
    solverType?: string,
    calculated?: number
  },
}

