import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
const api_url = 'https://app.scrapeak.com/v1/scrapers/zillow/listing';
// const apiUrl2 = `${api_url}?api_key=${apiKey}&url=https://www.zillow.com/ miami-fl/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A25.788222075074618%2C%22south%22%3A25.661720324138102%2C%22east%22%3A-80.36129951477051%2C%22west%22%3A-80.56214332580566%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A12700%2C%22regionType%22%3A6%7D%5D%2C%22pagination%22%3A%7B%7D%2C%22mapZoom%22%3A6%7D`;
// const apiUrl = `https://app.scrapeak.com/v1/scrapers/zillow/listing?api_key=${apiKey}&url=https://www.zillow.com/${formattedValue}/?searchQueryState=%7B%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A${coordinates.northeast.lat}%2C%22south%22%3A${coordinates.southwest.lat}%2C%22east%22%3A${coordinates.northeast.lng}%2C%22west%22%3A${coordinates.southwest.lng}%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A6181%2C%22regionType%22%3A6%7D%5D%2C%22pagination%22%3A%7B%7D%2C%22mapZoom%22%3A6%7D`;
// https://www.zillow.com/miami-fl/rentals/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A25.955799299814167%2C%22south%22%3A25.4497000375878%2C%22east%22%3A-79.94223887792968%2C%22west%22%3A-80.74561412207031%7D%2C%22filterState%22%3A%7B%22fr%22%3A%7B%22value%22%3Atrue%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A11%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A12700%2C%22regionType%22%3A6%7D%5D%7D
export const fetchRentHome = createAsyncThunk(
  'rentHomes/fetchAll',

  async ({ cityCoordinates, formattedValue, State, RegionID }, thunkApi) => {
    console.log(
      'Fetching rent homes with parameters:',
      cityCoordinates,
      formattedValue,
      State,
      RegionID
    );

    try {
      console.log(
        'Fetching rent homes with parameters:',
        cityCoordinates,
        formattedValue,
        State,
        RegionID
      );
      const apiKey = '2f9951b3-5db9-4ec8-aa91-ed23dae24b60';
      const { data } = await axios.get(
        `${api_url}?api_key=${apiKey}&url=https://www.zillow.com//${formattedValue}-${State.toLowerCase()}/rentals/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A${
          cityCoordinates.north
        }
%2C%22south%22%3A${cityCoordinates.south}%2C%22east%22%3A${cityCoordinates.east}
%2C%22west%22%3A${cityCoordinates.west}
%7D%2C%22filterState%22%3A%7B%22fr%22%3A%7B%22value%22%3Atrue%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A11%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A${RegionID}
%2C%22regionType%22%3A6%7D%5D%7D`
      );
      console.log('rentReducer ', data.data.cat1.searchResults.listResults);
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

const rentSlice = createSlice({
  name: 'listResults',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(fetchRentHome.fulfilled, (state, { payload }) => {
        state.listResults = payload;
        state.isLoading = false;
        state.error = null;
      })

      .addMatcher(isAnyOf(fetchRentHome.pending), state => {
        state.isLoading = true;
        state.error = null;
      })

      .addMatcher(isAnyOf(fetchRentHome.rejected), (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

export const rentReducer = rentSlice.reducer;
