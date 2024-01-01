import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

export const instance = axios.create({
  baseURL:
    'https://app.scrapeak.com/v1/scrapers/zillow/listing?api_key=4cce9248-566d-4d04-938e-c0004a133ab9&url=https://www.zillow.com/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A37.38535259536369%2C%22south%22%3A36.76300834703627%2C%22east%22%3A-83.53414213085937%2C%22west%22%3A-84.61354886914062%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A53028%2C%22regionType%22%3A6%7D%5D%7D',
});

const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/login', formData);
      setToken(data.token);
      // console.log(' data: ', data);

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.status(400));
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/signup', formData);
      setToken(data.token);
      // console.log(' data: ', data);

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      setToken(token);
      const { data } = await instance.get('/users/current');
      // console.log(' data: ', data);

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const token = state.auth.token;
      if (!token) return false;
      return true;
    },
  }
);

export const logOutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.post('/users/logout');

      // console.log(' data: ', data);

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  isLoadingAuth: false,
  error: null,
  authenticated: false,
  token: null,
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.authenticated = true;
        state.token = payload.token;
        state.userData = payload.user;
        state.isLoadingAuth = false;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.authenticated = true;
        state.token = payload.token;
        state.userData = payload.user;
        state.isLoadingAuth = false;
        state.error = null;
      })
      .addCase(refreshThunk.fulfilled, (state, { payload }) => {
        state.authenticated = true;
        state.userData = payload;
        state.isLoadingAuth = false;
        state.error = null;
      })
      .addCase(logOutThunk.fulfilled, (state, { payload }) => {
        state.isLoadingAuth = false;
        state.error = null;
        state.authenticated = false;
        state.token = null;
        state.userData = null;
      })
      .addMatcher(
        isAnyOf(
          loginThunk.pending,
          registerThunk.pending,
          refreshThunk.pending,
          logOutThunk.pending
        ),
        state => {
          state.isLoadingAuth = true;
          state.error = null;
        }
      )

      .addMatcher(
        isAnyOf(
          loginThunk.rejected,
          registerThunk.rejected,
          refreshThunk.rejected,
          logOutThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoadingAuth = false;
          state.error = payload;
        }
      ),
});

export const authReducer = authSlice.reducer;
