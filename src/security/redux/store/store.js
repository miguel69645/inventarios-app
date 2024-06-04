import { configureStore } from "@reduxjs/toolkit";
import institutesSlice from "../slices/institutesSlice";
import businessSlice from "../slices/businessSlice";
import storesSlice from "../slices/storesSlice";
import seriesSlice from "../slices/seriesSlice";
import statusSlice from "../slices/statusSlice";
import locationsSlice from "../slices/locationsSlice";
const store = configureStore({
  reducer: {
    institutes: institutesSlice,
    business: businessSlice,
    stores: storesSlice,
    series: seriesSlice,
    status: statusSlice,
    location: locationsSlice,
  },
});

export default store;
