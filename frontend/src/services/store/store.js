import { configureStore } from '@reduxjs/toolkit';
import companyFilterReducer from './slices/companyFilterSlice';
import challengeFilterReducer from './slices/challengeFilterSlice';

export const store = configureStore({
  reducer: {
    companyFilters: companyFilterReducer,
    challengeFilters: challengeFilterReducer,
  },
});