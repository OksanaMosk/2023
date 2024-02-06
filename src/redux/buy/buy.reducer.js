import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
const api_url = 'https://app.scrapeak.com/v1/scrapers/zillow/listing';
// const apiUrl2 = `${api_url}?api_key=${apiKey}&url=https://www.zillow.com/ miami-fl/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A25.788222075074618%2C%22south%22%3A25.661720324138102%2C%22east%22%3A-80.36129951477051%2C%22west%22%3A-80.56214332580566%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A12700%2C%22regionType%22%3A6%7D%5D%2C%22pagination%22%3A%7B%7D%2C%22mapZoom%22%3A6%7D`;
// const apiUrl = `https://app.scrapeak.com/v1/scrapers/zillow/listing?api_key=${apiKey}&url=https://www.zillow.com/${formattedValue}/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A${coordinates.northeast.lat}%2C%22south%22%3A${coordinates.southwest.lat}%2C%22east%22%3A${coordinates.northeast.lng}%2C%22west%22%3A${coordinates.southwest.lng}%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A6181%2C%22regionType%22%3A6%7D%5D%2C%22pagination%22%3A%7B%7D%2C%22mapZoom%22%3A6%7D`;

export const fetchHome = createAsyncThunk(
  'homes/fetchAll',

  async (_, thunkApi) => {
    try {
      const apiKey = '209b0f42-d2bb-495e-95e0-6fc4325b5457';
      const { data } = await axios.get(
        `${api_url}?api_key=${apiKey}&url=https://www.zillow.com/ miami-fl/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A25.788222075074618%2C%22south%22%3A25.661720324138102%2C%22east%22%3A-80.36129951477051%2C%22west%22%3A-80.56214332580566%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A12700%2C%22regionType%22%3A6%7D%5D%2C%22pagination%22%3A%7B%7D%2C%22mapZoom%22%3A6%7D`
      );

      return data.data.cat1.searchResults.listResults;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  listResults: [],
  isLoading: false,
  error: null,
};

const buySlice = createSlice({
  name: 'listResults',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(fetchHome.fulfilled, (state, { payload }) => {
        state.listResults = payload;
        state.isLoading = false;
        state.error = null;
      })

      .addMatcher(isAnyOf(fetchHome.pending), state => {
        state.isLoading = true;
        state.error = null;
      })

      .addMatcher(isAnyOf(fetchHome.rejected), (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

export const buyReducer = buySlice.reducer;
