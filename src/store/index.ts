import { configureStore } from '@reduxjs/toolkit';
import wordsReducer from './wordsSlice';

export const store = configureStore({
  reducer: {
    words: wordsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
