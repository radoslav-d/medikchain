import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './appLoading';

export const store = configureStore({
  reducer: {
    loadingReducer: loadingReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
