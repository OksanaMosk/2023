import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterHome } from 'redux/filter/filter.reducer';

import css from './Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const onFormSubmit = e => {
    e.preventDefault();
    const value = e.currentTarget.elements.searchKey.value;
    dispatch(filterHome(value));
    e.target.reset();
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.target.closest('form');
      dispatch(filterHome(e.target.value));
      form.reset();
    }
  };

  return (
    <form className={css.formlFind} onSubmit={onFormSubmit}>
      <label className={css.labelFind}>
        Search address
        <input
          className={css.inputFind}
          type="text"
          name="searchKey"
          placeholder="City, District, ZIP, Address"
          onKeyDown={handleKeyDown}
        />
      </label>
      <button className={css.inputButton} type="submit">
        <span className={css.buttonLabel}></span>
        &#128269;
      </button>
    </form>
  );
}
