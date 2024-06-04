import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    selectedStatusId: null,
  },
  reducers: {
    SET_ID_TIPO_ESTATUS_OK: (state, action) => {
      state.selectedStatusId = action.payload;
    },
  },
});

export const { SET_ID_TIPO_ESTATUS_OK } = statusSlice.actions;

export default statusSlice.reducer;
