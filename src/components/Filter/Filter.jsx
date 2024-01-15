import React from 'react';
// import { setFilterTerm } from 'redux/filter/filter.reducer';
import { selectFilterTerm } from 'redux/filter/filter.selector';
import { useDispatch, useSelector } from 'react-redux';

import {
  filterReducer as filterResults,
  filterHome,
} from 'redux/filter/filter.reducer';
import css from './Filter.module.css';
import { useEffect } from 'react';

export default function Filter({ value }) {
  const filterTerm = useSelector(selectFilterTerm);
  // const isLoading = useSelector(state => state.filterResults.isLoading);
  // const error = useSelector(state => state.filterResults.error);
  const dispatch = useDispatch();

  const changeFilter = event => {
    const searchTerm = event.target.value;
    console.log('searchTerm: ', searchTerm);
    dispatch(filterHome(searchTerm));
  };

  // useEffect(() => {
  //   dispatch(filterHome());
  // }, [dispatch]);
  const displayValue = filterTerm
    .map(obj => Object.values(obj).join(', '))
    .join(', ');

  return (
    <form className={css.formlFind}>
      <label className={css.labelFind}>
        Find address
        <input
          className={css.inputFind}
          type="text"
          value={displayValue}
          onChange={changeFilter}
          placeholder="City, Neighborhood, ZIP, Address"
        />
      </label>
    </form>
  );
}
