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

export const setComputerBusyState = createEvent<boolean>();
export const $isComputerBusy = createStore<ICommonState>({
  isComputerBusy: false
})

$isComputerBusy.on(setComputerBusyState, (state, value) => ({
  ...state,
  isComputerBusy: value
}));

export const useCommonState = () => useStore($isComputerBusy)