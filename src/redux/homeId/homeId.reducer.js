import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

const api_url = 'https://app.scrapeak.com/v1/scrapers/zillow/property';

export const fetchHomeId = createAsyncThunk(
  'homes/homeId',
  async (zpid, thunkApi) => {
    try {
      const zpidValue = zpid.zpid;

      const apiKey = '225cd6e8-20f8-48d1-ae7f-47b5e7f7351b';
      const stringZpid = String(zpidValue);
      console.log('Fetching homeId with zpid:', stringZpid);

      const response = await axios.get(
        `${api_url}?api_key=${apiKey}&zpid=${encodeURIComponent(stringZpid)}`,
        { timeout: 5800 }
      );
      console.log('Response data:', response.data.data);

      if (response.status === 200) {
        console.log('Response data:', response.data.data);
        return response.data.data;
      } else {
        console.error('Non-200 status code:', response.status);
        return thunkApi.rejectWithValue('Non-200 status code');
      }
    } catch (err) {
      console.error('Error fetching homeId:', err.message);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
const initialState = {
  homeId: {},
  isLoading: false,
  error: null,
};

const homeIdSlice = createSlice({
  name: 'homeId',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(fetchHomeId.fulfilled, (state, { payload }) => {
        state.homeId = payload;
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
