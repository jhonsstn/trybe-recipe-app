import React from 'react';
import DrinkButton from '../components/DrinkButton';
import ExploreButton from '../components/ExploreButton';
import MealButton from '../components/MealButton';

function Footer() {
  return (
    <footer data-testid="footer" style={ { position: 'fixed', bottom: 0 } }>
      <DrinkButton />
      <ExploreButton />
      <MealButton />
    </footer>
  );
}

export default Footer;
