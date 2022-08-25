import { configureStore } from '@reduxjs/toolkit';
import wordsReducer from './wordsSlice';
import userReducer from './userSlice';
import sprintReducer from './sprintSlice';

export const store = configureStore({
  reducer: {
    words: wordsReducer,
    user: userReducer,
    sprint: sprintReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
