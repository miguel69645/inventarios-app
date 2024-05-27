import { createSlice } from "@reduxjs/toolkit";
import { getAllInstitutes } from "../../institutes/services/remote/get/getAllInstitutes";

const fetchData = () => {
  try {
    const AllInstitutesData = getAllInstitutes().then((data) => {const institutes = { data }; return institutes});
    return AllInstitutesData;
  } catch (error) {
    console.error(
      "Error al obtener los institutos en useEffect de InstitutesTable:",
      error
    );
  }
}  
const initialState = {
  institutesDataArr: fetchData(),
};
const institutesSlice = createSlice({
  name: "INSTITUTES",
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
