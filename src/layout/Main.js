import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import SearchBar from '../components/SearchBar';
import { Context } from '../context/AppContext';

function Main({ children }) {
  const { searchBarStatus } = useContext(Context);
  return (
    <main>
      {searchBarStatus && <SearchBar />}
      { children }
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
