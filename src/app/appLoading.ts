import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const loadingSlice = createSlice({
  name: 'appLoading',
  initialState: {
    isLoading: false,
  },
  reducers: {
    loading: (state) => {
      state.isLoading = true;
    },
    notLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { loading, notLoading } = loadingSlice.actions;
export const selectLoading = (state: RootState) => state.loadingFlag.isLoading;
export default loadingSlice.reducer;
