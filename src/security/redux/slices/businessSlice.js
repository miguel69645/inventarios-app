import { createSlice } from "@reduxjs/toolkit";

const businessSlice = createSlice({
  name: "business",
  initialState: {
    selectedBusinessId: null,
  },
  reducers: {
    SET_ID_BUSINESS: (state, action) => {
      state.selectedBusinessId = action.payload;
    },
  },
});

export const { SET_ID_BUSINESS } = businessSlice.actions;

export default businessSlice.reducer;
