import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/userSlice';
import configSlice from './features/configSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    config: configSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
