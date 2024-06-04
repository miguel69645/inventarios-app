import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    selectedLocationId: null,
  },
  reducers: {
    SET_ID_UBICACION: (state, action) => {
      state.selectedLocationId = action.payload;
    },
  },
});

export const { SET_ID_UBICACION } = locationSlice.actions;

export default locationSlice.reducer;
