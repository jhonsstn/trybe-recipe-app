import React from 'react';
import { Link } from 'react-router-dom';
import exploreIcon from '../images/exploreIcon.svg';

function ExploreButton() {
  return (
    <Link to="/explore">
      <img
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
        alt="Ícone do explore"
      />
    </Link>
  );
}

export default ExploreButton;
