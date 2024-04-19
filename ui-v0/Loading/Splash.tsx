import React from 'react';

import { LoadingSpinner } from './LoadingSpinner';

const Splash = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-evergreen-25/25">
    <div className="relative flex flex-col items-center justify-center w-12 h-12">
      <LoadingSpinner className="w-8 h-8 fill-evergreen-700/50 text-black-alpha-25 z-10 animate-spin-medium" />
    </div>
  </div>
);

export default Splash;
