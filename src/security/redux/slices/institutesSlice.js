import { createSlice } from "@reduxjs/toolkit";
import { getInstitutesAll } from "../actions/institutesActions";

const datos = await getInstitutesAll()
const initialState = {
  institutesDataArr: datos,
};
const institutesSlice = createSlice({
  name: "institutes",
  initialState,
  reducers: {
    SET_ID_INSTITUTES: (state, action) => {
      //state.institutesDataArr = action.payload.institutesDataArr;
      state.institutesDataArr = action.payload;
    },
  },
});
export const {
  SET_ID_INSTITUTES,
  //ADD_PRODUCT_SELECTED,
  //SWITCH_STATE,
} = institutesSlice.actions;
export default institutesSlice.reducer;
