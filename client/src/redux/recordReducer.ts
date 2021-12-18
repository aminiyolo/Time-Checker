import { createSlice } from "@reduxjs/toolkit";

interface IState {
  date: string;
  times: any[];
  sleep: number;
  coding: number;
  exercise: number;
  english: number;
  reading: number;
  isFetching: Boolean;
  error: Boolean;
}

const initialState: IState = {
  date: "",
  times: [],
  sleep: 0,
  coding: 0,
  exercise: 0,
  english: 0,
  reading: 0,
  isFetching: false,
  error: false,
};

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    loadStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },

    loadSuccess: (state, action) => {
      state.isFetching = false;
      state.times = [action.payload?.times];
      state.sleep = action.payload?.sleep;
      state.coding = action.payload?.coding;
      state.exercise = action.payload?.exercise;
      state.english = action.payload?.english;
      state.reading = action.payload?.reading;
    },

    loadFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { loadStart, loadSuccess, loadFailure } = recordSlice.actions;
export default recordSlice.reducer;
