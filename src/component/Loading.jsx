
import React from 'react';
import { BallTriangle } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-[#0b0f1a]">
      <BallTriangle
        height={80}
        width={80}
        radius={5}
        color="#fdc800"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
