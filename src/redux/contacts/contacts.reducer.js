import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import { instance } from 'redux/auth/auth.reducer';

export const fetchContacts = createAsyncThunk(
  'homes/fetchAll',

  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(
        'https://app.scrapeak.com/v1/scrapers/zillow/listing?api_key=783323ab-ea71-40c7-bd38-77e920b43c05&url=https://www.zillow.com/miami-fl/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22west%22%3A-80.56214332580566%2C%22east%22%3A-80.36129951477051%2C%22south%22%3A25.661720324138102%2C%22north%22%3A25.788222075074618%7D%2C%22usersSearchTerm%22%3A%22Miami%2C%20FL%22%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A12700%2C%22regionType%22%3A6%7D%5D%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22tow%22%3A%7B%22value%22%3Afalse%7D%2C%22mf%22%3A%7B%22value%22%3Afalse%7D%2C%22land%22%3A%7B%22value%22%3Afalse%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%2C%22apa%22%3A%7B%22value%22%3Afalse%7D%2C%22manu%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A13%7D'
      );
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
