import React from 'react';
import Header from '../layout/Header';
import ProfileIcon from '../components/ProfileIcon';
import Main from '../layout/Main';
import Footer from '../layout/Footer';

function ExploreFoods() {
  return (
    <>
      <Header title="Explore Foods">
        <ProfileIcon />
      </Header>
      <Main />
      <Footer />
    </>
  );
}

export default ExploreFoods;
