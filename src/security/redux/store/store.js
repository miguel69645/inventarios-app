import { configureStore } from "@reduxjs/toolkit";
import institutesSlice from "../slices/institutesSlice";
import businessSlice from "../slices/businessSlice";
import storesSlice from "../slices/storesSlice";
const store = configureStore({
  reducer: {
    institutes: institutesSlice,
    business: businessSlice,
    stores: storesSlice,
  },
});

export default store;
