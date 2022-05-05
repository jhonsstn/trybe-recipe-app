import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  return <img src={ shareIcon } alt="share-button" data-testid="share-btn" />;
}

export default ShareButton;
