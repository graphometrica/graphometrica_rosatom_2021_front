import { IRoute } from 'src/store';

export const MOCK_ROUTES: IRoute[] = [
  {
    routeId: "7812af4c-5f8f-4686-a643-f0d752f95b12",
    stations: ["line1_1", "line1_2", "line1_3", "line1_5", "line1_6"],
    status: 1,
    created: (new Date()).getTime(),
    payload: {},
  },

  {
    routeId: "7812af4c-5f8f-4686-a643-f0d752f95b13",
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
