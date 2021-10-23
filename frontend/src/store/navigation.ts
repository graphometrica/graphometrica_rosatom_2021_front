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



export const menuSelected = createEvent<string>();
export const $selectedMenu = createStore<string>('create')

$selectedMenu.on(menuSelected, (_, value) => value);

export const useSelectedSideMenu = () => useStore($selectedMenu)