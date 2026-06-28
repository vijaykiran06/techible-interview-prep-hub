import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  debouncedSearchQuery: '',
  filters: {
    difficulty: 'All', // Can be 'All', 'Easy', 'Medium', 'Hard'
    sort: 'order',
    order: 'asc'
  },
  pagination: {
    currentPage: 1,
    pageSize: 10
  }
};

const challengeFilterSlice = createSlice({
  name: 'challengeFilters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setDebouncedSearchQuery: (state, action) => {
      state.debouncedSearchQuery = action.payload;
      state.pagination.currentPage = 1; // Reset page on fresh search queries
    },
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
      state.pagination.currentPage = 1; // Reset page configuration on filter adjustments
    },
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    resetFilters: () => initialState
  }
});

export const { 
  setSearchQuery, 
  setDebouncedSearchQuery, 
  setFilter, 
  setPage, 
  resetFilters 
} = challengeFilterSlice.actions;

// Selector to format cleanly into React Query URL parameters
export const selectChallengeQueryParams = (state) => ({
  page: state.challengeFilters.pagination.currentPage,
  limit: state.challengeFilters.pagination.pageSize,
  search: state.challengeFilters.debouncedSearchQuery,
  difficulty: state.challengeFilters.filters.difficulty,
  sort: state.challengeFilters.filters.sort,
  order: state.challengeFilters.filters.order
});

export default challengeFilterSlice.reducer;