import { useDispatch, useSelector } from 'react-redux';
import { fetchRentHome } from 'redux/rent/rent.reducer';

import { selectRent } from 'redux/rent/rent.selector';
// import { selectFilterTerm } from 'redux/filter/filter.selector';
import { useEffect } from 'react';
import LoaderSmall from 'components/Loader/LoaderSmall';
import iconBath from '../images/iconBath.png';
import iconBed from '../images/iconBed.png';
// import iconSizeFt from '../images/iconSizeFt.png';
// import iconSizeM from '../images/iconSizeM.png';
import { NavLink } from 'react-router-dom';
// import { CurrentLocationMarker } from '../CurrentLocationMarker';

import css from './RentList.module.css';

export const RentList = ({ setSelectedMarker }) => {
  const listResults = useSelector(selectRent);
  // const zpid = useParams();
  const isLoading = useSelector(state => state.rentStore.isLoading);
  const error = useSelector(state => state.rentStore.error);
  // const filterTerm = useSelector(selectFilterTerm);

  const dispatch = useDispatch();

  console.log('listResults', listResults);

  useEffect(() => {
    dispatch(fetchRentHome());
  }, [dispatch]);

  return (
    listResults.imgSrc !== null && (
      <div className={css.homeContainer}>
        <ul className={css.homeList}>
          {listResults.map(result => (
            <li
              className={css.itemHome}
              key={result.lotId || result.providerListingId}
            >
              <div className={css.everyItem}>
                {result.imgSrc && (
                  <img
                    src={result.imgSrc}
                    alt={`House ${result.lotId || result.providerListingId}`}
                    style={{ width: 'auto', maxHeight: '250px' }}
                  />
                )}
                <div className={css.about}>
                  <p
                    className={css.address}
                    style={{
                      whiteSpace: 'pre-wrap',
                      maxWidth: '25ch',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {result.address.replace(/,([^,]{0,10})$/, ',\u00A0$1')}
                  </p>
                  {result.price && <p className={css.price}>{result.price}</p>}
                  <p className={css.bath}>
                    {result.baths ? (
                      <>
                        <img
                          className={css.icon}
                          src={iconBath}
                          alt="iconBath"
                          style={{ width: '20px', height: '20px' }}
                        />
                        {result.baths}
                      </>
                    ) : (
                      ''
                    )}
                  </p>
                  {result.beds && (
                    <p className={css.beds}>
                      <img
                        className={css.icon}
                        src={iconBed}
                        alt="iconBed"
                        style={{ width: '20px', height: '20px' }}
                      />
                      {result.beds}
                    </p>
                  )}
                  {result.units &&
                    result.units.map(unit => (
                      <div
                        key={unit.beds + unit.price}
                        className={css.aboutDetails}
                      >
                        {unit.price && (
                          <p className={css.price}>{unit.price}</p>
                        )}

                        {unit.beds !== undefined && (
                          <p className={css.beds}>
                            {unit.beds === '0' ? (
                              'Studio'
                            ) : (
                              <>
                                {unit.beds}
                                <img
                                  className={css.icon}
                                  src={iconBed}
                                  alt="iconBed"
                                  style={{ width: '20px', height: '20px' }}
                                />
                              </>
                            )}
                          </p>
                        )}
                      </div>
                    ))}
                  <NavLink
                    className={css.toHomeElement}
                    key={result.lotId || result.providerListingId}
                    to={`/rent/${result.lotId || result.providerListingId}`}
                    onClick={() => setSelectedMarker(result)}
                  >
                    View details
                  </NavLink>
                </div>

                {isLoading && <LoaderSmall />}
                {error !== null && <div className={css.error}>{error}</div>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};
