import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useJsApiLoader } from '@react-google-maps/api';
import Loader from 'components/Loader/Loader';
import { Map } from 'components/Map';
import { Autocomplete } from 'components/Autocomplete';
import { getBrowserLocation } from 'utils/geo';
// import photo1 from 'images/icons8-phonebook-96.png';
// import photo2 from 'images/icons8-add-a-new-contact-on-modern-cell-phone-96.png';

import css from './HomePage.module.css';

const API_KEY = process.env.REACT_APP_API_KEY;
console.log('API_KEY: ', API_KEY);

const defaultCenter = {
  lat: 25.761681,
  lng: -80.191788,
};

const libraries = ['places'];

const HomePage = () => {
  // const isLoadingAuth = useSelector(state => state.auth.isLoadingAuth);
  // const location = useLocation();
  const [center, setCenter] = React.useState(defaultCenter);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const onPlaceSelect = React.useCallback(coordinates => {
    setCenter(coordinates);
  }, []);

  React.useEffect(() => {
    getBrowserLocation()
      .then(curLoc => {
        setCenter(curLoc);
      })
      .catch(defaultLocation => {
        setCenter(defaultLocation);
      });
  }, []);

  return (
    <div className={css.home}>
      {/* {isLoadingAuth ? ( */}
      {/* <Loader /> */}
      {/* ) : ( */}
      <>
        <NavLink
          className={css.toLinkHome}
          // state={{ from: location }}
          to="/buy"
        >
          buy
        </NavLink>
        <NavLink
          className={css.toLinkHome}
          // state={{ from: location }}
          to="/rent"
        >
          rent
        </NavLink>
      </>
      <div className={css.addressSearchContainer}>
        <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
      </div>
      {isLoaded && window.google && window.google.maps ? (
        <Map center={center} />
      ) : (
        <h2 className={css.isLoading}>Loading...</h2>
      )}
    </div>
  );
};
export default HomePage;
