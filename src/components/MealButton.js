import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';

function MealButton() {
  return (
    <Link to="/foods">
      <img data-testid="food-bottom-btn" src={ mealIcon } alt="Ícone de comida" />
    </Link>
  );
}

export default MealButton;
