import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

const api_url = 'https://app.scrapeak.com/v1/scrapers/zillow/property';

// Створіть thunk для отримання інформації про власність за zpid
// export const fetchHomeInfo = createAsyncThunk(
//   'homes/fetchHomeInfo',
//   async (zpid, thunkAPI) => {
//     try {
//       const response = await axios.get(api_url, {
//         params: { api_key: 'YOUR-API-KEY', zpid },
//       });
//       return response.data.data; // Адаптуйте це залежно від структури відповіді
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const fetchHomeId = createAsyncThunk(
  'homes/homeId',
  async (zpid, thunkApi) => {
    try {
      const zpidValue = zpid.zpid; // Отримати значення zpid з об'єкта

      const apiKey = '01377c66-f4d3-43ae-be2f-54d5a39c9277';
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
