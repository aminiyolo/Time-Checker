import { createSlice } from "@reduxjs/toolkit";
import { timeStamp } from "console";

interface IState {
  date: string;
  times: string[] | number;
  sleep: Number;
  coding: Number;
  exercise: Number;
  english: Number;
  reading: Number;
}

const initialState = {
  date: "",
  times: <any>[],
  sleep: 0,
  coding: 0,
  exercise: 0,
  english: 0,
  reading: 0,
};

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    loadData: (state, action) => {
      console.log(action.payload);

      state.times = [action.payload?.times];
      state.sleep = action.payload?.sleep;
      state.coding = action.payload?.coding;
      state.exercise = action.payload?.exercise;
      state.english = action.payload?.english;
      state.reading = action.payload?.reading;
    },
  },
});

export const { loadData } = recordSlice.actions;
export default recordSlice.reducer;
