import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole } from '../lib/types/UserRole';
import { RootState } from './store';

const userRoleSlice = createSlice({
  name: 'appUserRole',
  initialState: {
    role: UserRole.UNASSIGNED,
  },
  reducers: {
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
  },
});

export const { setUserRole } = userRoleSlice.actions;
export const selectUserRole = (state: RootState) => state.userRoleReducer.role;
export default userRoleSlice.reducer;
