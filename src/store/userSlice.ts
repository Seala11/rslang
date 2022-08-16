import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './';

interface IUserState {
  current: object;
}

const initialState: IUserState = {
  current: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<object>) {
      state.current = action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.current;

export default userSlice.reducer;
