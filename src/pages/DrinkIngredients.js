import React from 'react';
import Header from '../layout/Header';
import ProfileIcon from '../components/ProfileIcon';
import Main from '../layout/Main';
import Footer from '../layout/Footer';

function DrinkIngredients() {
  return (
    <>
      <Header title="Explore Ingredients">
        <ProfileIcon />
      </Header>
      <Main />
      <Footer />
    </>
  );
}

export default DrinkIngredients;
