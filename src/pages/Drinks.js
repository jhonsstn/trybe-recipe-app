import React from 'react';
import Header from '../layout/Header';
import ProfileIcon from '../components/ProfileIcon';
import SearchIcon from '../components/SearchIcon';
import Main from '../layout/Main';
import Footer from '../layout/Footer';

function Drinks() {
  return (
    <>
      <Header title="Drinks">
        <ProfileIcon />
        <SearchIcon />
      </Header>
      <Main />
      <Footer />
    </>
  );
}

export default Drinks;
