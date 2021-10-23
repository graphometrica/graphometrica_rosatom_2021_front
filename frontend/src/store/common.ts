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
  isComputerBusy: boolean
}

export const setComputerBusyState = createEvent<boolean | null>();
export const $isComputerBusy = createStore<ICommonState>({
  isComputerBusy: null
})

$isComputerBusy.on(setComputerBusyState, (state, value) => ({
  ...state,
  isComputerBusy: value
}));

export const useCommonState = () => useStore($isComputerBusy)