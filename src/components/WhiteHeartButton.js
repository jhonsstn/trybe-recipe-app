import React from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function WhiteHeartButton() {
  return (
    <img
      src={ whiteHeartIcon }
      alt="favorite-button"
      data-testid="favorite-btn"
    />
  );
}

export default WhiteHeartButton;
