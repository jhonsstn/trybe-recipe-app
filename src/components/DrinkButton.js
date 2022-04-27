import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';

function DrinkButton() {
  return (
    <Link to="/drinks">
      <img
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="Ícone de bebida"
      />
    </Link>
  );
}

export default DrinkButton;
