import { createSlice } from '@reduxjs/toolkit';

export const connectionSlice = createSlice({
  name: 'connection',
  initialState: {
    isInternetConnected: true,
    isInternetReachable: true,
  },
  reducers: {
    setIsInternetConnected: (state, action) => {
      state.isInternetConnected = action.payload;
    },
    setIsInternetReachable: (state, action) => {
      state.isInternetReachable = action.payload;
    },
  },
});

export const { setIsInternetConnected, setIsInternetReachable } = connectionSlice.actions;

export default connectionSlice.reducer;
