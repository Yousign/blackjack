import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { Action } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import cardApi from './services/cards';
import cardsReducer from '../features/cards/cardsSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      [cardApi.reducerPath]: cardApi.reducer,
      cards: cardsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
  });

// configure listeners using the provided defaults
const store = makeStore();
setupListeners(store.dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
