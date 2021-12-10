import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: 0,
  list: [],
  record: {
    sleep: 0,
    coding: 0,
    exercise: 0,
    english: 0,
    reading: 0,
  },
};

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    loadData: (state, action) => {
      state.date = action.payload.date;
    },
  },
});

export const { loadData } = recordSlice.actions;
export default recordSlice.reducer;
