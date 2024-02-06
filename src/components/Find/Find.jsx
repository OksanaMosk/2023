import React from 'react';
import { useDispatch } from 'react-redux';
import { findHome } from 'redux/find/find.reducer';

import css from './Find.module.css';

export default function Find() {
  const dispatch = useDispatch();

  const onFormSubmit = e => {
    e.preventDefault();
    const value = e.currentTarget.elements.searchKey.value;
    dispatch(findHome(value));

    e.target.reset();
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.target.closest('form');
      dispatch(findHome(e.target.value));
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
