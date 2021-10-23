import { IRoute } from 'src/store';

export const MOCK_ROUTES: IRoute[] = [
  {
    routeId: 1,
    stations: ["line1_1", "line1_2", "line1_3", "line1_5", "line1_6"],
    status: 2,
    created: (new Date()).getTime(),
    payload: {},
  },

  {
    routeId: 2,
    stations: ["line1_5", "line1_1", "line1_2", "line1_3", "line1_6"],
    status: 3,
    created: (new Date()).getTime(),
    payload: {},
    result: {
      route: ["line1_1", "line1_2", "line1_6", "line1_5", "line1_5"],
      totalTime: 782,
      routeCsv: "",
      quboMatrixCsv: "",
      adjacencyMatrixCsv: "",
      solutionType: 'solutionType1',
      hamEnergy: 438.00,
      solverType: 'solverType2'
    },
  },
];
