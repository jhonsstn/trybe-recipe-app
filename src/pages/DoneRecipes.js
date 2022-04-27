import React from 'react';
import Header from '../layout/Header';
import ProfileIcon from '../components/ProfileIcon';
import Main from '../layout/Main';
import Footer from '../layout/Footer';

function DoneRecipes() {
  return (
    <>
      <Header title="Done Recipes">
        <ProfileIcon />
      </Header>
      <Main />
      <Footer />
    </>
  );
}

export default DoneRecipes;
