import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
const api_url =
  'https://app.scrapeak.com/v1/scrapers/zillow/locationSuggestions';

export const filterHome = createAsyncThunk(
  'homes/filter',

  async (queryValue, thunkApi) => {
    try {
      const apiKey = '9c3a389f-678a-4082-9337-d35b44df3dfc';

      const { data } = await axios.get(
        `${api_url}?api_key=${apiKey}&q=${queryValue}`
      );
      console.log('Server Response:', data);

      console.log('data.data.results: ', data.data.results);
      return data.data.results;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  filterTerm: [],
  isLoading: false,
  error: null,
};

const filterSlice = createSlice({
  name: ' filter',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(filterHome.fulfilled, (state, { payload }) => {
        state.filterTerm = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(isAnyOf(filterHome.pending), state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(filterHome.rejected), (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});
export const { setFilterTerm } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
