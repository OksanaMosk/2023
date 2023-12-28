import React from 'react';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { addContacts } from 'redux/contacts/contacts.reducer';
import { useDispatch, useSelector } from 'react-redux';

import Notiflix from 'notiflix';
import book from 'images/icons8-phonebook-60.png';
import book2 from 'images/icons8-add-a-new-contact-on-modern-cell-phone-96.png';
import Loader from 'components/Loader/Loader';

import css from './ContactForm.module.css';

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(state => state.contactsStore.contacts);
  const isLoading = useSelector(state => state.contactsStore.isLoading);
  const dispatch = useDispatch();
  const mpFailure = 'https://audio.code.org/losepoint1.mp3';
  const mpSuccess = 'https://audio.code.org/goal2.mp3';

  const handleAddContact = (name, number) => {
    if (
      contacts.find(
        contact =>
          contact.name.toString().toLowerCase() ===
          name.toString().toLowerCase()
      )
    ) {
      new Audio(mpFailure).play();
      Notiflix.Notify.failure(`${name}  is already in contacts`, {
        timeout: 1000,
        width: '300px',
        borderRadius: '20px',
        backOverlay: true,
      });
      return;
    }
    if (
      contacts.find(contact => contact.number.toString() === number.toString())
    ) {
      new Audio(mpFailure).play();
      Notiflix.Notify.failure(`${number}  is already in contacts`, {
        timeout: 1000,
        width: '300px',
        borderRadius: '20px',
        backOverlay: true,
      });
      return;
    }
    const finalContacts = {
      id: nanoid(),
      name,
      number,
    };
    new Audio(mpSuccess).play();
    Notiflix.Notify.success(`${name} is added to contacts`, {
      timeout: 1000,
      width: '300px',
      borderRadius: '20px',
      backOverlay: true,
    });

    dispatch(addContacts(finalContacts));

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleAddContact(name, number);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name': {
        setName(value);
        break;
      }
      case 'number': {
        setNumber(value);
        break;
      }
      default:
        return;
    }
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  return (
    <div className={css.contactForm}>
      <form className={css.form} onSubmit={handleSubmit}>
        <label htmlFor={nameInputId}>
          <p className={css.inputName}>Name</p>
          <input
            type="text"
            name="name"
            id={nameInputId}
            value={name}
            onChange={handleInputChange}
            className={css.formInput}
            placeholder="Name"
            autoComplete="on"
            autoFocus
            required
          ></input>
        </label>
        <label htmlFor={numberInputId}>
          <p className={css.inputName}>Number</p>
          <input
            type="tel"
            name="number"
            id={numberInputId}
            value={number}
            onChange={handleInputChange}
            className={css.formInput}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="000-000-0000"
            autoComplete="on"
            autoFocus
            required
          ></input>
        </label>
        <button type="submit" className={css.submitButton}>
          {isLoading ? (
            <Loader />
          ) : (
            <img
              src={book2}
              alt="{book2}"
              className={css.book_2}
              width={100}
              height={100}
            ></img>
          )}
        </button>
        <img
          src={book}
          alt="{book}"
          className={css.book}
          width={100}
          height={100}
        ></img>
      </form>
    </div>
  );
}
