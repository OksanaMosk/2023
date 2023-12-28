import React from 'react';
import { setFilterTerm } from 'redux/filter/filter.reducer';
import { selectFilterTerm } from 'redux/filter/filter.selector';
import { useDispatch, useSelector } from 'react-redux';

import css from './Filter.module.css';

export default function Filter({ value }) {
  const filterTerm = useSelector(selectFilterTerm);
  const dispatch = useDispatch();
  const changeFilter = event => {
    dispatch(setFilterTerm(event.target.value));
  };

  return (
    <form className={css.formlFind}>
      <label className={css.labelFind}>
        Find contacts by name
        <input
          className={css.inputFind}
          type="text"
          value={filterTerm}
          onChange={changeFilter}
        />
      </label>
    </form>
  );
}
