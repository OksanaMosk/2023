import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeId } from 'redux/homeId/homeId.reducer';
import { useParams } from 'react-router-dom';
import { selecthomeId } from 'redux/homeId/homeId.selector';
import { useEffect } from 'react';
import ImageGallery from '../Carousel/CarouselApp';
import CarouselApp from '../Carousel/CarouselApp';
// import LoaderSmall from 'components/Loader/LoaderSmall';

import iconBath from '../images/iconBath.png';
import iconBed from '../images/iconBed.png';
import iconSizeFt from '../images/iconSizeFt.png';
import iconSizeM from '../images/iconSizeM.png';

import css from './HomeElement.module.css';

export const HomeElement = () => {
  const homeId = useSelector(selecthomeId);
  // console.log('homeId: ', homeId);

  const { zpid } = useParams();
  console.log(' zpid : ', zpid);
  const isLoading = useSelector(state => state.contactsStore.isLoading);
  // const error = useSelector(state => state.contactsStore.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeId({ zpid }));
  }, [zpid, dispatch]);
  // console.log('HomeId after fetch:', homeId);

  // if (isLoading) {
  //   // Якщо дані ще завантажуються, відображення завантажувача або іншого індікатора
  //   return <p>Loading...</p>;
  // }

  console.log('HomeId after fetch:', homeId);

  // if (typeof homeId === 'string') {
  //   console.log('homeId- це рядок.');
  // } else {
  //   console.error('homeId- це НЕ рядок.');
  // }
  const citySearchUrl = homeId.citySearchUrl.text;
  const address = homeId.address;
  const price = homeId.adTargets.price;
  const galery = homeId.responsivePhotos;
  console.log('galery: ', galery);

  return (
    typeof homeId !== 'string' && (
      <div>
        <h2 className={css.title}>{citySearchUrl}</h2>{' '}
        <p className={css.address}>
          {address.streetAddress}, {address.city}, {address.state}{' '}
          {address.zipcode}, {homeId.country}
        </p>
        <div className={css.aboutDetails}>
          <p>
            <img
              className={css.icon}
              src={iconBath}
              alt="iconBath"
              style={{ width: '20px', height: '20px' }}
            />
            {homeId.bedrooms}
          </p>
          <p>
            <img
              className={css.icon}
              src={iconBed}
              alt="iconBed"
              style={{ width: '20px', height: '20px' }}
            />
            {homeId.bathrooms}
          </p>
          <p>
            <img
              className={css.icon}
              src={iconSizeFt}
              alt="iconSizeFt"
              style={{ width: '20px', height: '20px' }}
            />
            {homeId.livingArea} sqft
          </p>
          <p>
            <img
              className={css.icon}
              src={iconSizeM}
              alt="iconSizeM"
              style={{ width: '20px', height: '20px' }}
            />
            {(homeId.livingArea / 10.7638).toFixed(2)} m²
          </p>
          <p>Views: {homeId.pageViewCount}</p>
        </div>
        <p className={css.price}>$ {price}</p>
        <p className={css.published}>Published on: {homeId.datePostedString}</p>
        <p className={css.address}>{homeId.description}</p>
        <ImageGallery />
      </div>
    )
  );
};
