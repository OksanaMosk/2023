import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHomeId = createAsyncThunk(
  'homes/homeId',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(
        'https://app.scrapeak.com/v1/scrapers/zillow/property?api_key=	0a2a36fe-9e72-4daa-984b-ad817ce1d7d6&zpid=id'
      );
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
const initialState = {
  homeId: [],
  isLoading: false,
  error: null,
};

const homeIdSlice = createSlice({
  name: 'homeId',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(fetchHomeId.fulfilled, (state, { payload }) => {
        state.listResults = payload;
        state.isLoading = false;
        state.error = null;
      })

      .addMatcher(isAnyOf(fetchHomeId.pending), state => {
        state.isLoading = true;
        state.error = null;
      })

      .addMatcher(isAnyOf(fetchHomeId.rejected), (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

export const homeIdReducer = homeIdSlice.reducer;
