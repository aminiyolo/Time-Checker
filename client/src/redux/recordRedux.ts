import { createSlice } from "@reduxjs/toolkit";

interface IState {
  date: string;
  list: [];
  record: {
    sleep: Number;
    coding: Number;
    exercise: Number;
    english: Number;
    reading: Number;
  };
}

const initialState = {
  date: "",
  list: <any>[],
  sleep: 0,
  coding: 0,
  exercise: 0,
  english: 0,
  reading: 0,

  // record: {
  // sleep: 0,
  // coding: 0,
  // exercise: 0,
  // english: 0,
  // reading: 0,
  // },
};

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    loadData: (state, action) => {
      // console.log(action.payload.category[0]);
      // console.log(state);
      console.log(action.payload);
      state.sleep = action.payload?.sleep;
      state.coding = action.payload?.coding;
      state.exercise = action.payload?.exercise;
      state.english = action.payload?.english;
      state.reading = action.payload?.reading;
      // const category = Object.keys(action.payload.category[0]);
      // const keys = Object.values(state.list).map((k) => k);
      // console.log(category, keys);
      // if(keys.filter((k) => k === category  ))
      // state.list = [...state.list, action.payload.category[0]];
    },
  },
});

export const { loadData } = recordSlice.actions;
export default recordSlice.reducer;
