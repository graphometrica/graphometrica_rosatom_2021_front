import axios from 'axios';
import { BACKEND_URL, MOCK_ENABLE } from 'src/config';

import { sleep } from './sleep';

const mockData = {
  'GET/getLines': [],
  'GET/getStations': [],
  'POST/createRoute': [],
  'GET/getRoutes': [
    {
      routeId: "7812af4c-5f8f-4686-a643-f0d752f95b12",
      stations: ["line1_2", "line1_3", "line1_5", "line1_4", "line1_7"],
      status: 1,
      payload: {}
    },

    {
      routeId: "7812af4c-5f8f-4686-a643-f0d752f95b13",
      stations: ["line1_3", "line1_2", "line1_5", "line1_4", "line1_7"],
      status: 3,
      payload: {},
      result: {
        route: ["line1_2", "line1_3", "line1_4", "line1_5", "line1_7"],
        totalTime: 782,
        routeCsv: "",
        quboMatrixCsv: "",
        adjacencyMatrixCsv: "",
      },
    },
  ]
}

export const callBackend = async (method: "GET" | "POST", url: string, data?: any) => {


  if (MOCK_ENABLE) {
    const key = `${method}${url}`;
    console.log('callBackend mock', key)
    await sleep(2000);
    return mockData[key] || [];
  }

  return axios({
    method,
    url: `${BACKEND_URL}${url}`,
    data
  }).then(resp => resp.data)
}