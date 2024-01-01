import React from 'react';
import { useSelector } from 'react-redux';
import { ContactList } from 'components/ContactList/ContactList';
import { useLocation } from 'react-router-dom';
import { Navigate, NavLink } from 'react-router-dom';
import Filter from 'components/Filter/Filter';
import Loader from 'components/Loader/Loader';
import { useRef } from 'react';
import error1 from 'images/icons8-no-yelling-100.png';
import css from './ContactsPage.module.css';

const ContactsPage = () => {
  const listResults = useSelector(state => state.contactsStore.listResults);
  const isLoading = useSelector(state => state.contactsStore.isLoading);
  const error = useSelector(state => state.contactsStore.error);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');

  return (
    <div className={css.contacts}>
      <ContactList />
      {/* {error !== null && <Navigate to="/contacts/404" replace={true} />} */}
      <NavLink
        state={{ from: location }}
        className={css.goBack}
        to={backLinkRef.current}
      >
        Go back
      </NavLink>
      {isLoading && <Loader />}
      {/* {homes.length !== 0 ? ( */}
      <>
        <Filter />
        {/* 
        <ContactList /> */}
      </>
      {/* ) : ( */}
      <p className={css.noContacts}>
        Your phonebook is empty. Add your first contact!
        <img src={error1} alt="{svgDelete}" width={200} height={200}></img>
      </p>
      {/* )} */}
    </div>
  );
};
export default ContactsPage;
