import { sleep } from './sleep';

export const mockRequest = async (data: any) => {
  await sleep(2000);
  return Promise.resolve(data);
}