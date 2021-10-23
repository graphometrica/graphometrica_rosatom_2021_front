export type IStation = {

  id: number, //
  stationId: string //
  lineId?: string,
  name: string,
  inCircle?: boolean,
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
  routeId?: number,
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

