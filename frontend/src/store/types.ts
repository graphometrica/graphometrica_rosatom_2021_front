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
  routeId?: string,
  stations: string[], // (1) какое название поля?
  status?: 1 | 2 | 3,
  created?: number,
  payload?: any,
  result?: {
    route: string[], // (2)) какое название поля?
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

