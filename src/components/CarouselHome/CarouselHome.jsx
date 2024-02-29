import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export const CarouselHome = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesDesktop, setImagesDesktop] = useState([]);
  const [imagesMobile, setImagesMobile] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const photosForDesktop = await Promise.all(
        [...Array(14).keys()].map(i =>
          import(
            `../imagesHome/forDesktop/${String(i + 1).padStart(2, '0')}.jpg`
          )
        )
      );

      const photosForMobile = await Promise.all(
        [...Array(14).keys()].map(i =>
          import(
            `../imagesHome/forMobile/${String(i + 1).padStart(2, '0')}.jpg`
          )
        )
      );

      const imagesMobile = photosForMobile.map(module => ({
        originalMobile: module.default,
        originalClass: 'full-width-image',
      }));

      const imagesDesktop = photosForDesktop.map(module => ({
        originalDesktop: module.default,
        originalClass: 'full-width-img',
      }));

      setImagesDesktop(imagesDesktop);
      setImagesMobile(imagesMobile);

      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);

      setImagesLoaded(true);
    };

    fetchImages();
  }, []);

  const customImageRenderer = item =>
    item.originalDesktop !== null && (
      <div className={`image-gallery-image ${item.originalClass || ''}`}>
        <picture>
          <source
            srcSet={`${item.originalDesktop} 100%`}
            media="(min-width:1440px)"
          />
          <img
            srcSet={isMobile ? item.originalMobile : item.originalDesktop}
            alt={item.originalAlt}
            className="full-width-image"
            style={{
              width: '100%',
              height: isMobile ? '300px' : 'auto',
              objectFit: 'cover',
            }}
            type="image"
          />
        </picture>
      </div>
    );

  return (
    <>
      {imagesLoaded ? (
        <div style={{ height: isMobile ? 'auto' : '100%' }}>
          <ImageGallery
            items={isMobile ? imagesMobile : imagesDesktop}
            autoPlay={true}
            disableArrowKeys={true}
            renderItem={customImageRenderer}
            showFullscreenButton={false}
            slideDuration={1700}
          />
        </div>
      ) : (
        <p>Is loading...</p>
      )}
    </>
  );
};
