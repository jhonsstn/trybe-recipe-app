import React from 'react';
import Header from '../layout/Header';
import ProfileIcon from '../components/ProfileIcon';
import Main from '../layout/Main';
import Footer from '../layout/Footer';

function FoodIngredients() {
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

export default FoodIngredients;
