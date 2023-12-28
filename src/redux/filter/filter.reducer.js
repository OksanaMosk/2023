import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterTerm: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterTerm(state, { payload }) {
      state.filterTerm = payload;
    },
  },
});

export const { setFilterTerm } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
