
import React from 'react';
import { BallTriangle } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f4ff] dark:bg-gray-900/80">
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
