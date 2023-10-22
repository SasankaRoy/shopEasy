import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    state: false,
    forWhichPorpose: "",
    currentMessage: "",
  },
  reducers: {
    loadingStart: (state, action) => {
      state.state = true;
      state.forWhichPorpose = action.payload?.message.forWhichPorpose;
      state.currentMessage = action.payload?.message.currentMessage;
    },
    loadingComplete: (state, action) => {
      state.state = false;
      state.forWhichPorpose = "";
      state.currentMessage = "";
    },
    loadingError: (state, action) => {
      state.state = false;
      state.forWhichPorpose = action.payload?.message.forWhichPorpose;
      state.currentMessage = action.payload?.message.currentMessage;
    },
  },
});

export const { loadingStart, loadingComplete, loadingError } =
  loadingSlice.actions;
export default loadingSlice.reducer;
