import React from 'react';
import '../styles/loadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="overlay">
      <div className="pokeball">
        <div className="pokeball__button"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
