import React from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function BlackHeartButton() {
  return (
    <img
      src={ blackHeartIcon }
      alt="favorite-button"
      data-testid="favorite-btn"
    />
  );
}

export default BlackHeartButton;
