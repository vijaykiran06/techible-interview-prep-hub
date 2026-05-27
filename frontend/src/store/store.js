import { configureStore } from "@reduxjs/toolkit";
import companyFilterReducer from "./slices/companyFilterSlice";

export const store = configureStore({
  reducer: {
    companyFilter: companyFilterReducer,
  },
});