import React from 'react';
import Header from '../layout/Header';
import ProfileIcon from '../components/ProfileIcon';
import SearchIcon from '../components/SearchIcon';
import Main from '../layout/Main';

function Foods() {
  return (
    <>
      <Header title="Foods">
        <ProfileIcon />
        <SearchIcon />
      </Header>
      <Main />
    </>
  );
}

export default Foods;
