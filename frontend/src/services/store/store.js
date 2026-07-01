import { configureStore } from '@reduxjs/toolkit';
import companyFilterReducer from './companyFilterSlice';

export const store = configureStore({
  reducer: {
    companyFilters: companyFilterReducer,
  },
});