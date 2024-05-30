import { createSlice } from "@reduxjs/toolkit";

const seriesSlice = createSlice({
  name: "series",
  initialState: {
    selectedSeriesId: null,
  },
  reducers: {
    SET_ID_SERIES: (state, action) => {
      state.selectedSeriesId = action.payload;
    },
  },
});

export const { SET_ID_SERIES } = seriesSlice.actions;

export default seriesSlice.reducer;
