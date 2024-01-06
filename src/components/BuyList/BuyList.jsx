import { useDispatch, useSelector } from 'react-redux';
import { fetchHome } from 'redux/contacts/contacts.reducer';

import { selectContacts } from 'redux/contacts/contacts.selector';
// import { selectFilterTerm } from 'redux/filter/filter.selector';
import { useEffect } from 'react';
import LoaderSmall from 'components/Loader/LoaderSmall';
import iconBath from '../images/iconBath.png';
import iconBed from '../images/iconBed.png';
import iconSizeFt from '../images/iconSizeFt.png';
import iconSizeM from '../images/iconSizeM.png';
import { NavLink } from 'react-router-dom';
import css from './BuyList.module.css';

export const BuyList = () => {
  const listResults = useSelector(selectContacts);
  // const zpid = useParams();
  const isLoading = useSelector(state => state.contactsStore.isLoading);
  const error = useSelector(state => state.contactsStore.error);
  // const filterTerm = useSelector(selectFilterTerm);

  const dispatch = useDispatch();

  console.log('listResults', listResults);

  useEffect(() => {
    dispatch(fetchHome());
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
    listResults.imgSrc !== null && (
      <div className={css.contactContainer}>
        <ul className={css.contactList}>
          {listResults.map(result => (
            <li className={css.itemContact} key={result.zpid}>
              <div className={css.everyItem}>
                {result.imgSrc && (
                  <img
                    src={result.imgSrc}
                    alt={`House ${result.zpid}`}
                    style={{ width: 'auto', maxHeight: '250px' }}
                  />
                )}
                <div className={css.about}>
                  <p className={css.price}>{result.price}</p>
                  <p className={css.address}>{result.address}</p>
                  <div className={css.aboutDetails}>
                    <p>
                      <img
                        className={css.icon}
                        src={iconBath}
                        alt="iconBath"
                        style={{ width: '20px', height: '20px' }}
                      />
                      {result.beds}
                    </p>
                    <p>
                      <img
                        className={css.icon}
                        src={iconBed}
                        alt="iconBed"
                        style={{ width: '20px', height: '20px' }}
                      />
                      {result.baths}
                    </p>
                    <p>
                      <img
                        className={css.icon}
                        src={iconSizeFt}
                        alt="iconSizeFt"
                        style={{ width: '20px', height: '20px' }}
                      />
                      {result.area} sqft
                    </p>
                    <p>
                      <img
                        className={css.icon}
                        src={iconSizeM}
                        alt="iconSizeM"
                        style={{ width: '20px', height: '20px' }}
                      />
                      {(result.area / 10.7638).toFixed(2)} m²
                    </p>
                  </div>
                  <NavLink
                    className={css.buttonDelete}
                    key={result.id}
                    to={`/contacts/${result.id}`}
                  >
                    View details
                  </NavLink>
                </div>

                {isLoading && <LoaderSmall />}
                {error !== null && <>{error}</>}
              </div>
            </li>
          ))}

          {/* {Array.isArray(listResults) &&
            listResults.length > 0 &&
            listResults.map(result => (
              <HomeElement
                key={result.id}
                price={result.price}
                img={result.imgSrc}
                address={result.address}
                beds={result.beds}
                baths={result.baths}
                area={result.area} */}
          {/* // onRemoveContact={removeContact} */}
          {/* /> ))} */}
        </ul>
      </div>
    )
  );
};
