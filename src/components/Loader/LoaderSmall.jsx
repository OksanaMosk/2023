import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const LoaderSmall = () => {
  return (
    <div style={{ marginTop: '60px' }}>
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
    </div>
  );
};
export default LoaderSmall;
