import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const LoaderSmall = () => {
  return (
    <ThreeCircles
      height="35"
      width="35"
      color="#5a6679"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor="#af9e8e"
      innerCircleColor="#b1b9cc"
      middleCircleColor="#e6eaed"
    />
  );
};
export default LoaderSmall;
