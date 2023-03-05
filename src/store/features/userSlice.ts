import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { User } from '../../classes/user.classes';

interface UserState {
  user: User | null | undefined;
  isLoggedIn: boolean;
  token: string | undefined | null;
  isAuthInProgress: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  token: null,
  isAuthInProgress: true,
};

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<{ user: User; token: string }>) => {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
        isAuthInProgress: false,
      };
      return state;
    },
    setIsAuthInProgress: (state, action: PayloadAction<boolean>) => {
      state = { ...state, isAuthInProgress: action.payload };
      return state;
    },

    setUserLogout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state = { ...initialState, isAuthInProgress: false };
      return state;
    },
  },
});

export const { setUserLogin, setIsAuthInProgress, setUserLogout } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
