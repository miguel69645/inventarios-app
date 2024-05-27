import { configureStore } from "@reduxjs/toolkit";
import institutesSlice from "../slices/institutesSlice";
const store = configureStore({
  reducer: {
    institutes: institutesSlice,
  },
});

export default store;
