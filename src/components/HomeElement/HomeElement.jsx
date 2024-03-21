import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeId } from 'redux/homeId/homeId.reducer';
import { useParams } from 'react-router-dom';
import { selecthomeId } from 'redux/homeId/homeId.selector';
import { useEffect } from 'react';
import ImageGallery from '../Carousel/CarouselApp';
import Filter from 'components/Filter/Filter';
import 'react-image-gallery/styles/css/image-gallery.css';
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
  // const isLoading = useSelector(state => state.buyStore.isLoading);
  // const error = useSelector(state => state.contactsStore.error);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Current zpid in useEffect:', zpid);

    if (zpid) {
      console.log('Dispatching fetchHomeId');
      dispatch(fetchHomeId({ zpid }));
    }
  }, [zpid, dispatch]);

  // console.log('HomeId after fetch:', homeId);

  // if (isLoading) {
  //   // Якщо дані ще завантажуються, відображення завантажувача або іншого індікатора
  //   return <p>Loading...</p>;
  // }
  const HighlightedDescription = ({ description }) => {
    const renderStyledText = () => {
      const description = homeId?.description || '';
      const match = description.match(/^([^\s]*\s)/); // Знаходження першого слова

      if (match) {
        const firstWord = match[1];
        const restOfText = description.substring(firstWord.length);

        return (
          <>
            <span className={css.descriptionSpan} style={{ color: '#bbbfca' }}>
              {firstWord.charAt(0)}
            </span>
            {firstWord.substring(1)}
            {restOfText}
          </>
        );
      }

      return <>{description}</>;
    };

    return (
      <p className={css.description} style={{ textIndent: '2em' }}>
        {renderStyledText()}
      </p>
    );
  };
  console.log('HomeId after fetch:', homeId);

  const citySearchUrl = homeId.citySearchUrl ? homeId.citySearchUrl.text : '';

  const address = homeId.address ? homeId.address : {};
  const streetAddress = address.streetAddress ? address.streetAddress : '';
  const city = address.city ? address.city : '';
  const state = address.state ? address.state : '';
  const zipcode = address.zipcode ? address.zipcode : '';
  const country = homeId.country ? homeId.country : '';

  const price = homeId.price ? homeId.price : '';
  const galery = homeId.responsivePhotos ? homeId.responsivePhotos : '';

  console.log('galery: ', galery);

  return (
    typeof homeId !== 'string' && (
      <>
        <div className={css.homeContainer}>
          <div className={css.homeLeftContainer}>
            <h2 className={css.title}>{citySearchUrl}</h2>
            <p className={css.address}>
              {streetAddress}, {city}, {state} {zipcode}, {country}
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
            </div>
            <p className={css.price}>$ {price.toLocaleString()}</p>
            <p className={css.published}>
              Published on: {homeId.datePostedString}
            </p>
            <p className={css.views}>Views: {homeId.pageViewCount}</p>
          </div>
          <div className={css.homeRightContainer}>
            <ImageGallery className={css.imageGallery} />
          </div>
          <HighlightedDescription
            className={css.description}
            description={homeId.description}
          />
          <Filter />
        </div>
      </>
    )
  );
};
