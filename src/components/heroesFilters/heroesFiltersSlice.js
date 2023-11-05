import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
}

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  async () => {
    const {request} = useHttp();
    return await request("http://localhost:3001/filters");
  }
)

const heroesFiltersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersActiveChanged: (state, action) => {
      state.filtersLoadingStatus = 'idle';
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filtersLoadingStatus = 'idle';
        state.filters = action.payload;
      })
      .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
      .addDefaultCase(() => {})
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