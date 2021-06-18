import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './appLoading';
import languageReducer from './appLanguage';

export const store = configureStore({
  reducer: {
    loadingReducer: loadingReducer,
    languageReducer: languageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
