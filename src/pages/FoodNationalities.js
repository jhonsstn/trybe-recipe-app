import React from 'react';
import Header from '../layout/Header';
import ProfileIcon from '../components/ProfileIcon';
import SearchIcon from '../components/SearchIcon';
import Main from '../layout/Main';
import Footer from '../layout/Footer';

function FoodNationalities() {
  return (
    <>
      <Header title="Explore Nationalities">
        <ProfileIcon />
        <SearchIcon />
      </Header>
      <Main />
      <Footer />
    </>
  );
}

export default FoodNationalities;
