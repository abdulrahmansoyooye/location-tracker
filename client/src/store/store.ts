import { configureStore } from '@reduxjs/toolkit';
import tripReducer from '../features/tripSlice';
import { socketMiddleware } from '../features/socketMiddleware';

export const store = configureStore({
  reducer: {
    trip: tripReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
