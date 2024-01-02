import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import { instance } from 'redux/auth/auth.reducer';

export const fetchContacts = createAsyncThunk(
  'homes/fetchAll',

  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(
        'https://app.scrapeak.com/v1/scrapers/zillow/listing?api_key=287740c2-3eba-4f0a-bf10-df1877bda283&url=https://www.zillow.com/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22north%22%3A37.38535259536369%2C%22south%22%3A36.76300834703627%2C%22east%22%3A-83.53414213085937%2C%22west%22%3A-84.61354886914062%7D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A53028%2C%22regionType%22%3A6%7D%5D%7D'
      );

      // console.log('data.listResults: ', data.listResults);
      return data.data.cat1.searchResults.listResults;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

// export const addContacts = createAsyncThunk(
//   'contacts/addContacts',
//   async (name, number, id, thunkApi) => {
//     try {
//       const { data } = await instance.post('/contacts', name, number, id);

//       return data;
//     } catch (e) {
//       return thunkApi.rejectWithValue(e.message);
//     }
//   }
// );

// export const deleteContacts = createAsyncThunk(
//   'contacts/deleteContacts',
//   async (id, thunkApi) => {
//     try {
//       const { data } = await instance.delete(`/contacts/${id}`);

//       return data;
//     } catch (e) {
//       return thunkApi.rejectWithValue(e.message);
//     }
//   }
// );

const initialState = {
  listResults: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'listResults',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.listResults = payload;
        state.isLoading = false;
        state.error = null;
        console.log('state.homes', state.homes);
      })
      // .addCase(addContacts.fulfilled, (state, { payload }) => {
      //   state.contacts.push(payload);
      //   state.isLoading = false;
      //   state.error = null;
      // })
      // .addCase(deleteContacts.fulfilled, (state, { payload }) => {
      //   state.contacts = state.contacts.filter(
      //     contact => contact.id !== payload.id
      //   );
      //   state.isLoading = false;
      //   state.error = null;
      // })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending
          // addContacts.pending,
          // deleteContacts.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addMatcher(
        isAnyOf(
          fetchContacts.rejected
          // addContacts.rejected,
          // deleteContacts.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});

export const contactsReducer = contactsSlice.reducer;
