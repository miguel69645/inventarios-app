import { configureStore } from "@reduxjs/toolkit";
import institutesSlice from "../slices/institutesSlice";
import businessSlice from "../slices/businessSlice";
const store = configureStore({
  reducer: {
    institutes: institutesSlice,
    business: businessSlice,
  },
});

export default store;
