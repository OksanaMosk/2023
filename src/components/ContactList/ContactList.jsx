import { ContactElement } from '../ContactElement/ContactElement';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts, fetchContacts } from 'redux/contacts/contacts.reducer';
import { useParams } from 'react-router-dom';
import { selectContacts } from 'redux/contacts/contacts.selector';
import { selectFilterTerm } from 'redux/filter/filter.selector';
import { useEffect } from 'react';

import css from './ContactList.module.css';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const id = useParams();

  const filterTerm = useSelector(selectFilterTerm);

  const dispatch = useDispatch();
  const mpDelete = 'https://audio.code.org/goal2.mp3';

  useEffect(() => {
    dispatch(fetchContacts(id));
  }, [id, dispatch]);

  const removeContact = contactId => {
    dispatch(deleteContacts(contactId));
    new Audio(mpDelete).play();
  };

  const visibleContacts = () => {
    return contacts.filter(contact =>
      contact.name
        .toString()
        .toLowerCase()
        .includes(filterTerm.toString().toLowerCase())
    );
  };

  const visContacts = visibleContacts();
  const sorted = [...visContacts].sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  return (
    contacts !== null && (
      <div className={css.contactContainer}>
        <ul className={css.contactList}>
          {Array.isArray(contacts) &&
            contacts.length > 0 &&
            sorted.map(({ name, number, id }) => (
              <ContactElement
                key={id}
                name={name}
                number={number}
                id={id}
                onRemoveContact={removeContact}
              />
            ))}
        </ul>
      </div>
    )
  );
};
