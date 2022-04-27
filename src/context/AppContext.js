import PropTypes from 'prop-types';
import React, { useState, createContext } from 'react';

export const Context = createContext();

function AppContext({ children }) {
  const [searchBarStatus, setSearchBarStatus] = useState(false);

  const contextValue = {
    searchBarStatus,
    setSearchBarStatus,
  };

  return <Context.Provider value={ contextValue }>{children}</Context.Provider>;
}

AppContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext;
