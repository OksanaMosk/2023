import React from 'react';
import { useSelector } from 'react-redux';
import { RentList } from 'components/RentList/RentList';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
// import Find from 'components/Find/Find';
import LoaderSmall from 'components/Loader/LoaderSmall';
import { useRef } from 'react';
import { MapRent } from 'components/MapRent';
import { AutocompleteRent } from 'components/AutocompleteRent';
import { getBrowserLocation } from 'utils/geo';
import { useJsApiLoader } from '@react-google-maps/api';

import css from './RentPage.module.css';
const API_KEY = process.env.REACT_APP_API_KEY;

const defaultCenter = {
  lat: 25.761681,
  lng: -80.191788,
};

const libraries = ['places'];

const RentPage = () => {
  //   const listResults = useSelector(state => state.contactsStore.listResults);
  const isLoading = useSelector(state => state.rentStore.isLoading);
  // const error = useSelector(state => state.contactsStore.error);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');

  const [center, setCenter] = React.useState(defaultCenter);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const onPlaceSelect = React.useCallback(async coordinates => {
    if (coordinates) {
      setCenter(coordinates);
    } else {
      try {
        const browserLocation = await getBrowserLocation();
        setCenter(browserLocation);
      } catch (error) {
        console.error('Failed to get browser location:', error);
      }
    }
  }, []);

  React.useEffect(() => {
    console.log('Before getBrowserLocation call');
    getBrowserLocation()
      .then(curLoc => {
        console.log('Browser Location:', curLoc);
        setCenter(curLoc);
      })
      .catch(defaultLocation => {
        setCenter(defaultLocation);
      })
      .finally(() => {
        console.log('After getBrowserLocation call');
      });
  }, []);

  return (
    <div className={css.buyContainer}>
      <div className={css.mapContainer}>
        <div className={css.addressSearchContainer}>
          <AutocompleteRent isLoaded={isLoaded} onSelect={onPlaceSelect} />
        </div>
        {isLoaded && window.google && window.google.maps ? (
          <MapRent center={center} />
        ) : (
          <h2 className={css.isLoading}>Loading...</h2>
        )}
      </div>
      <div className={css.contacts}></div>

      <RentList />
      {/* {error !== null && <Navigate to="/contacts/404" replace={true} />} */}
      <NavLink
        state={{ from: location }}
        className={css.goBack}
        to={backLinkRef.current}
      >
        Go back
      </NavLink>
      {isLoading && <LoaderSmall />}
      {/* {homes.length !== 0 ? ( */}
      {/* ) : ( */}
      {/* )} */}
    </div>
  );
};
export default RentPage;
