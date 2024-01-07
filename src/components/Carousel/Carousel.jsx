import React, { useState } from 'react';

export const Carousel = props => {
  const goToNextSlide = () => {
    if (currentIndex === props.slides.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(props.slides.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderSlide = () => {
    return <div>{props.slides[currentIndex]}</div>;
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      <div className={css.carouselContainer}>
        <button className={css.prevButton} onClick={goToPrevSlide}>
          Prev
        </button>
        {renderSlide()}
        <button className={css.nextButton} onClick={goToNextSlide}>
          Next
        </button>
      </div>
    </div>
  );
};
