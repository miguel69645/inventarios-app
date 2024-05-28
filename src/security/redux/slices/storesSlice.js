import { createSlice } from "@reduxjs/toolkit";

const storesSlice = createSlice({
  name: "stores",
  initialState: {
    selectedStoresId: null,
  },
  reducers: {
    SET_ID_STORES: (state, action) => {
      state.selectedStoresId = action.payload;
    },
  },
});

export const { SET_ID_STORES } = storesSlice.actions;

export default storesSlice.reducer;
