import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
}

const heroesFiltersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
    filtersFetched: (state, action) => {
      state.filtersLoadingStatus = 'idle';
      state.filters = action.payload;
    },
    filtersFetchingError: state => {state.filtersLoadingStatus = 'error'},
    filtersActiveChanged: (state, action) => {
      state.filtersLoadingStatus = 'idle';
      state.activeFilter = action.payload;
    },
  }
});

const {actions, reducer}  = heroesFiltersSlice;

export default reducer;

export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  filtersActiveChanged
} = actions;