import { HomeElement } from '../ContactElement/ContactElement';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts, fetchContacts } from 'redux/contacts/contacts.reducer';
import { useParams } from 'react-router-dom';
import { selectContacts } from 'redux/contacts/contacts.selector';
import { selectFilterTerm } from 'redux/filter/filter.selector';
import { useEffect } from 'react';

import css from './ContactList.module.css';

export const ContactList = () => {
  const listResults = useSelector(selectContacts);
  const zpid = useParams();

  const filterTerm = useSelector(selectFilterTerm);

  const dispatch = useDispatch();
  const mpDelete = 'https://audio.code.org/goal2.mp3';
  console.log('listResults', listResults);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // const removeContact = contactId => {
  //   dispatch(deleteContacts(contactId));
  //   new Audio(mpDelete).play();
  // };

  // const visibleContacts = () => {
  //   return home.filter(contact =>
  //    home.name
  //       .toString()
  //       .toLowerCase()
  //       .includes(filterTerm.toString().toLowerCase())
  //   );
  // };

  // const visContacts = visibleContacts();
  // const sorted = [...visContacts].sort((a, b) =>
  //   a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  // );

  return (
    listResults !== null && (
      <div className={css.contactContainer}>
        <ul className={css.contactList}>
          {Array.isArray(listResults) &&
            listResults.length > 0 &&
            listResults.map(({ address, price, imgSrc, zpid }) => (
              <HomeElement
                key={zpid}
                price={price}
                // img={imgSrc}
                address={address}
                // onRemoveContact={removeContact}
              />
            ))}
        </ul>
      </div>
    )
  );
};
