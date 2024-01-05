import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeId } from 'redux/homeId/homeId.reducer';
import { useParams } from 'react-router-dom';
import { selectContacts } from 'redux/contacts/contacts.selector';
import { selectFilterTerm } from 'redux/filter/filter.selector';
import { useEffect } from 'react';
import LoaderSmall from 'components/Loader/LoaderSmall';

import css from './ContactElement.module.css';

export const HomeElement = () => {
  const listResults = useSelector(selectContacts);
  const zpid = useParams();
  const isLoading = useSelector(state => state.contactsStore.isLoading);
  const error = useSelector(state => state.contactsStore.error);
  const filterTerm = useSelector(selectFilterTerm);

  const dispatch = useDispatch();

  console.log('listResults', listResults);

  useEffect(() => {
    dispatch(fetchHomeId(zpid));
  }, [zpid, dispatch]);

  // const { zpid } = useParams();
  return listResults.imgSrc !== null && <div></div>;
};
