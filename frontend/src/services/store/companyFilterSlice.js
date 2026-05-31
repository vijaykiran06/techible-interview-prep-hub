import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  difficulty: "",
  page: 1,
};

const companyFilterSlice = createSlice({
  name: "companyFilter",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetFilters: (state) => {
      state.search = "";
      state.difficulty = "";
      state.page = 1;
    },
  },
});

export const {
  setSearch,
  setDifficulty,
  setPage,
  resetFilters,
} = companyFilterSlice.actions;

export default companyFilterSlice.reducer;