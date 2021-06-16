import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const loadingSlice = createSlice({
  name: 'appLoading',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setNotLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLoading, setNotLoading } = loadingSlice.actions;
export const selectLoading = (state: RootState) =>
  state.loadingReducer.isLoading;
export default loadingSlice.reducer;
