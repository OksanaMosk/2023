import React from 'react';
import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import '../CarouselHome/CarouselHome';
import photo1 from '../imagesHome/01.png';
import photo2 from '../imagesHome/02.jpg';
import photo3 from '../imagesHome/03.jpg';
import photo4 from '../imagesHome/04.jpg';
import photo5 from '../imagesHome/05.jpg';
import photo6 from '../imagesHome/06.jpg';
import photo7 from '../imagesHome/07.jpg';
import photo8 from '../imagesHome/08.jpg';
import photo9 from '../imagesHome/09.jpg';
import photo10 from '../imagesHome/10.jpg';
import photo11 from '../imagesHome/11.jpg';
import photo12 from '../imagesHome/12.jpg';
import photo13 from '../imagesHome/13.jpg';
import photo14 from '../imagesHome/14.jpg';

export const CarouselHome = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setImagesLoaded(true);
    };

    fetchImages();
  }, []);

  const images = [
    {
      original: photo1,
      originalClass: 'full-width-image',
    },
    {
      original: photo2,
      originalClass: 'full-width-image',
    },
    {
      original: photo3,
      originalClass: 'full-width-image',
    },
    {
      original: photo4,
      originalClass: 'full-width-image',
    },
    {
      original: photo5,
      originalClass: 'full-width-image',
    },
    {
      original: photo6,
      originalClass: 'full-width-image',
    },
    {
      original: photo7,
      originalClass: 'full-width-image',
    },
    {
      original: photo8,
      originalClass: 'full-width-image',
    },
    {
      original: photo9,
      originalClass: 'full-width-image',
    },
    {
      original: photo10,
      originalClass: 'full-width-image',
    },
    {
      original: photo11,
      originalClass: 'full-width-image',
    },
    {
      original: photo12,
      originalClass: 'full-width-image',
    },
    {
      original: photo13,
      originalClass: 'full-width-image',
    },
    {
      original: photo14,
      originalClass: 'full-width-image',
    },
  ];

  const customImageRenderer = item => (
    <div className={`image-gallery-image ${item.originalClass || ''}`}>
      <img
        src={item.original}
        alt={item.originalAlt}
        className="full-width-image"
        style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }}
      />
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
