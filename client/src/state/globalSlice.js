import { createSlice } from '@reduxjs/toolkit';

const settings = JSON.parse(localStorage.getItem('settings'));
let mode = 'dark';
if (settings && settings.mode === 'light') mode = 'light';

const initialState = {
  mode,
  userId: '63701cc1f03239b7f700000e',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setMode: (state) => {
      const mode = state.mode === 'light' ? 'dark' : 'light';
      state.mode = mode;
      localStorage.setItem('settings', JSON.stringify({ mode }));
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
