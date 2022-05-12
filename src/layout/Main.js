import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Categories from '../components/Categories';
import SearchBar from '../components/SearchBar';
import { Context } from '../context/AppContext';

function Main({ children }) {
  const { searchBarStatus } = useContext(Context);
  const { pathname } = window.location;

  const renderSearchBar = () => {
    if (searchBarStatus) return <SearchBar />;
  };

  const renderCategories = () => {
    if (searchBarStatus) return null;
    if (
      pathname === '/explore'
      || pathname === '/done-recipes'
      || pathname === '/profile'
      || pathname === '/explore/foods'
      || pathname === '/explore/drinks'
      || pathname === '/explore/drinks/ingredients'
      || pathname === '/explore/foods/ingredients'
      || pathname === '/explore/foods/nationalities'
    ) {
      return null;
    }
    return <Categories />;
  };
  return (
    <main className="bg-orange-50 flex flex-col items-center">
      {renderSearchBar()}
      {renderCategories()}
      {children}
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
