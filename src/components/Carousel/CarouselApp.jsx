import React, { useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useParams } from 'react-router-dom';
import { selecthomeId } from 'redux/homeId/homeId.selector';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeId } from 'redux/homeId/homeId.reducer';

// const isLoading = useSelector(state => state.contactsStore.isLoading);
// const error = useSelector(state => state.contactsStore.error);

const CarouselApp = () => {
  const homeId = useSelector(selecthomeId);

  const { zpid } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeId({ zpid }));
  }, [zpid, dispatch]);

  const galery = homeId.responsivePhotos
    ? homeId.responsivePhotos.slice(0, 7)
    : [];
  const items = galery.map((item, index) => ({
    original: `${item.url}`,
    thumbnail: `${item.url}`,
    key: index,
  }));
  return <ImageGallery items={items} />;
};
export default CarouselApp;
