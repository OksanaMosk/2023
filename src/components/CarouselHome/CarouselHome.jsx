import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const photosForDesktop = [
  import('../imagesHome/forDesktop/01.png'),
  ...[...Array(13).keys()].map(i =>
    import(`../imagesHome/forDesktop/${String(i + 2).padStart(2, '0')}.jpg`)
  ),
];
console.log('photosForDesktop: ', photosForDesktop);

const photosForMobile = [
  ...[...Array(12).keys()].map(it =>
    import(`../imagesHome/forMobile/${String(it + 1)}.jpg`)
  ),
];
console.log('photosForMobile: ', photosForMobile);

export const CarouselHome = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const loadedModulesForDesktop = await Promise.all(photosForDesktop);
      const loadedModulesForMobile = await Promise.all(photosForMobile);

      const imagesMobile = loadedModulesForDesktop.map(module => ({
        originalMobile: module.default,
        originalClass: 'full-width-image',
      }));

      const imagesDesktop = loadedModulesForMobile.map(module => ({
        originalDesktop: module.default,
        originalClass: 'full-width-image',
      }));

      setImages([...imagesDesktop, ...imagesMobile]);
      setImagesLoaded(true);
    };

    fetchImages();
  }, []);

  const customImageRenderer = item => (
    <div className={`image-gallery-image ${item.originalClass || ''}`}>
      <picture>
        <source
          srcSet={`${item.originalDesktop} 100%`}
          media="(min-width:1440px)"
        />
        <source
          srcSet={`${item.originalMobile} 340w`}
          media="(max-width:1439px)"
        />
        <source
          srcSet={`${item.originalMobile} 380w`}
          media="(max-width:767px)"
        />
        <img
          srcSet={item.originalDesktop}
          alt={item.originalAlt}
          className="full-width-image"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          type="image"
        />
      </picture>
    </div>
  );

  return (
    <>
      {imagesLoaded ? (
        <ImageGallery
          items={images}
          autoPlay={true}
          disableArrowKeys={true}
          renderItem={customImageRenderer}
          showFullscreenButton={false}
          slideDuration={1700}
        />
      ) : (
        <p>Is loading...</p>
      )}
    </>
  );
};
