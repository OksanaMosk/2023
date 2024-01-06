import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeId } from 'redux/homeId/homeId.reducer';
import { useParams } from 'react-router-dom';
import { selecthomeId } from 'redux/homeId/homeId.selector';
import { useEffect } from 'react';
// import LoaderSmall from 'components/Loader/LoaderSmall';

import iconBath from '../images/iconBath.png';
import iconBed from '../images/iconBed.png';
import iconSizeFt from '../images/iconSizeFt.png';
import iconSizeM from '../images/iconSizeM.png';

import css from './HomeElement.module.css';

export const HomeElement = () => {
  const homeId = useSelector(selecthomeId);
  console.log('homeId: ', homeId);

  const { zpid } = useParams();
  // const isLoading = useSelector(state => state.contactsStore.isLoading);
  // const error = useSelector(state => state.contactsStore.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeId({ zpid }));
  }, [zpid, dispatch]);

  // if (typeof homeId.adTargets.price === 'string') {
  //   console.log('price - це рядок.');
  // } else {
  //   console.error('prise - це НЕ рядок.');
  // }

  return (
    <div>
      <h2>{homeId.citySearchUrl.text}</h2>
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
      <p>
        {homeId.address.streetAddress}, {homeId.address.city},{' '}
        {homeId.address.state} {homeId.address.zipcode}, {homeId.country}
      </p>
      <p>$ {homeId.adTargets.price}</p>
      <p>Published on: {homeId.datePostedString}</p>

      <img
        className={css.icon}
        src={35184118}
        alt="iconBath"
        style={{ width: '20px', height: '20px' }}
      />
      <p>{homeId.description}</p>

      <img
        className={css.icon}
        src={homeId.mediumImageLink}
        alt="iconBath"
        style={{ width: '300px', height: '200px' }}
      />
      {/* <div>{homeId.responsivePhotos}</div> */}
    </div>
  );
};
// 2706c264-234e-4d02-a9f9-e1f72689a980
