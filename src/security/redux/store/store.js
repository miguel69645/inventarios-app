import { configureStore } from "@reduxjs/toolkit";
import institutesSlice from "../slices/institutesSlice";
import businessSlice from "../slices/businessSlice";
import storesSlice from "../slices/storesSlice";
import seriesSlice from "../slices/seriesSlice";
const store = configureStore({
  reducer: {
    institutes: institutesSlice,
    business: businessSlice,
    stores: storesSlice,
    series: seriesSlice,
  },
});

export default store;
