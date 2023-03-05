import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Config } from '../../classes/config.classes';

interface ConfigState {
  config: Config | null | undefined;
}

const initialState: ConfigState = {
  config: null,
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<{ config: Config | null }>) => {
      localStorage.setItem('config', JSON.stringify(action.payload.config));
      state = {
        ...state,
        config: action.payload.config,
      };
      return state;
    },
  },
});

export const { setConfig } = configSlice.actions;

export default configSlice.reducer;
