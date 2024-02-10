import React from 'react';

import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import { useJsApiLoader } from '@react-google-maps/api';

// import Loader from 'components/Loader/Loader';
// import { Map } from 'components/Map';
// import { Autocomplete } from 'components/Autocomplete';
import { getBrowserLocation } from 'utils/geo';
import buyPhoto from '../../components/imagesHome/buy.png';
import rentPhoto from '../../components/imagesHome/rent.png';
import { CarouselHome } from '../../components/CarouselHome/CarouselHome';

import css from './HomePage.module.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const defaultCenter = {
  lat: 25.761681,
  lng: -80.191788,
};

const libraries = ['places'];

const HomePage = () => {
  // const isLoadingAuth = useSelector(state => state.auth.isLoadingAuth);
  const location = useLocation();
  const [center, setCenter] = React.useState(defaultCenter);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries,
  });
  console.log(center, isLoaded);

  const onPlaceSelect = React.useCallback(coordinates => {
    console.log('onPlaceSelect: ', onPlaceSelect);
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
    <>
      <div className={css.carousel}>
        <CarouselHome />

        {/* {isLoadingAuth ? ( */}
        {/* <Loader /> */}
        {/* ) : ( */}
      </div>
      <div className={css.home}>
        <div>
          <h2 className={css.homeTitle}>Buy a home</h2>
          <NavLink
            className={css.homePage1}
            state={{ from: location }}
            to="/buy"
          >
            <img src={buyPhoto} alt="{photo}" width="50%" height="50%"></img>
          </NavLink>
        </div>
        <div>
          <h2 className={css.homeTitle}>Rent a home</h2>
          <NavLink
            className={css.homePage2}
            state={{ from: location }}
            to="/rent"
          >
            <img src={rentPhoto} alt="{photo}" width="50%" height="50%"></img>
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default HomePage;
