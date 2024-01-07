import React, { useState, useEffect } from 'react';
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
  const galery = homeId.responsivePhotos.slice(0, 7);
  const items = galery.map((item, index) => ({
    original: `${item.url}`,
    thumbnail: `${item.url}`,
    key: index,
  }));
  return <ImageGallery items={items} />;
};
export default CarouselApp;
// import { Carousel } from './Carousel';

//   return (
//     <div className="App">
//       <Carousel slides={slides} />
//     </div>
//   );
// };

//   if (typeof homeId === 'object' && Object.keys(homeId).length > 0) {
//     console.log("homeId - це об'єкт з даними.");
//   } else {
//     console.error("homeId - це НЕ об'єкт або порожній об'єкт.");
//   }
//   const slides = [
//     <img
//       src="https://photos.zillowstatic.com/fp/21f0bb602ff5c0619d8d72b9412a6979-p_d.jpg"
//       alt="Слайд 1"
//       style={{ width: '300px', height: '200px' }}
//     />,
//     <img
//       src="https://photos.zillowstatic.com/fp/c891e62e9ff822c1ef84cca04282620b-p_d.jpg"
//       alt="Слайд 2"
//       style={{ width: '300px', height: '200px' }}
//     />,
//     <img
//       src="https://photos.zillowstatic.com/fp/dafcc0d79c8a39a281df226fc04b048c-p_d.jpg"
//       alt="Слайд 3"
//       style={{ width: '300px', height: '200px' }}
//     />,
//   ];

//   console.log('slides : ', slides);

//   return (
//     <div className="App">
//       <Carousel slides={slides} />
//     </div>
//   );
// };
