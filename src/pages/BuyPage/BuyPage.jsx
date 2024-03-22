import React from 'react';
import { useSelector } from 'react-redux';
import { BuyList } from 'components/BuyList/BuyList';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
// import Find from 'components/Find/Find';
import LoaderSmall from 'components/Loader/LoaderSmall';
import { useRef } from 'react';
import { Map } from 'components/Map';
import { Autocomplete } from 'components/Autocomplete';
import { getBrowserLocation } from 'utils/geo';
import { useJsApiLoader } from '@react-google-maps/api';

import css from './BuyPage.module.css';
const API_KEY = process.env.REACT_APP_API_KEY;

const defaultCenter = {
  lat: 25.761681,
  lng: -80.191788,
};

const libraries = ['places'];

const BuyPage = () => {
  //   const listResults = useSelector(state => state.contactsStore.listResults);
  const isLoading = useSelector(state => state.buyStore.isLoading);
  // const error = useSelector(state => state.buyStore.error);
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
    <>
      {isLoading && (
        <div className={css.loader}>
          <LoaderSmall />
        </div>
      )}
      <div className={css.buyContainer}>
        <div className={css.mapContainer}>
          <div className={css.addressSearchContainer}>
            <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
          </div>
          {isLoaded && window.google && window.google.maps ? (
            <Map center={center} />
          ) : (
            <div className={css.loader}>
              <LoaderSmall />
            </div>
          )}
        </div>

        <BuyList />
        {/* {error !== null && <Navigate to="/buy/404" replace={true} />} */}
        <NavLink
          state={{ from: location }}
          className={css.goBack}
          to={backLinkRef.current}
        >
          Go back
        </NavLink>
      </div>
    </>
  );
};
export default BuyPage;
