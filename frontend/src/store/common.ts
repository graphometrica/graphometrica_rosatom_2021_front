import axios from 'axios';
import {
  combine,
  createApi,
  createDomain,
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
  sample,
  Store,
} from 'effector';
import { useStore } from 'effector-react';

export type ICommonState = {
  isComputerBusy: boolean,
  queueCount: number,
  calculatedCount: number
}

export const setCommonState = createEvent<ICommonState>();
export const commonState = createStore<ICommonState>({
  isComputerBusy: null,
  queueCount: 0,
  calculatedCount: 0

})

commonState.on(setCommonState, (state, value) => (value));

export const useCommonState = () => useStore(commonState)