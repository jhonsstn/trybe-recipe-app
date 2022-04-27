import React from 'react';
import Header from '../layout/Header';
import ProfileIcon from '../components/ProfileIcon';
import Main from '../layout/Main';
import Footer from '../layout/Footer';

function Explore() {
  return (
    <>
      <Header title="Explore">
        <ProfileIcon />
      </Header>
      <Main />
      <Footer />
    </>
  );
}

export default Explore;
