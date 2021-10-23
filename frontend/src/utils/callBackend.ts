import axios from 'axios';
import { BACKEND_URL, MOCK_ENABLE } from 'src/config';

import { MOCK_LINES, MOCK_ROUTES, MOCK_STATIONS } from './mockData';
import { sleep } from './sleep';

const mockData = {
  'GET/getLines': MOCK_LINES,
  'GET/getStations': MOCK_STATIONS,
  'POST/createRoute': [],
  'GET/getRoutes': MOCK_ROUTES
}

export const callBackend = async (method: "GET" | "POST", url: string, data?: any) => {

  //console.log('callBackend', method, url, data)
  if (MOCK_ENABLE) {
    const key = `${method}${url}`;
    console.log('callBackend mock', key)
    await sleep(1000);
    return mockData[key] || [];
  }



  return axios({
    method,
    url: `${BACKEND_URL}${url}`,
    data
  }).then(resp => resp.data)
}