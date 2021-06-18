import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const languageSlice = createSlice({
  name: 'appLanguage',
  initialState: {
    language: 'en',
  },
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export const selectLanguage = (state: RootState) =>
  state.languageReducer.language;
export default languageSlice.reducer;
