import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './appLoading';
import languageReducer from './appLanguage';
import userRoleReducer from './appUserRole';

export const store = configureStore({
  reducer: {
    loadingReducer,
    languageReducer,
    userRoleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
