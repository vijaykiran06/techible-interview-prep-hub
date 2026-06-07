import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  industry: 'All',
  difficulty: 'All',
  sort: 'views',
  page: 1,
};

const companyFilterSlice = createSlice({
  name: 'companyFilters',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },

    setIndustry: (state, action) => {
      state.industry = action.payload;
      state.page = 1;
    },

    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
      state.page = 1;
    },

    setSort: (state, action) => {
      state.sort = action.payload;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    resetFilters: () => initialState,
  },
});

export const {
  setSearch,
  setIndustry,
  setDifficulty,
  setSort,
  setPage,
  resetFilters,
} = companyFilterSlice.actions;

export default companyFilterSlice.reducer;