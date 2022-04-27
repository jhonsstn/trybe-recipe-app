import PropTypes from 'prop-types';
import React, { useState, createContext } from 'react';

export const Context = createContext();

function AppContext({ children }) {
  const [searchBarStatus, setSearchBarStatus] = useState(false);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const contextValue = {
    searchBarStatus,
    setSearchBarStatus,
    meals,
    setMeals,
    drinks,
    setDrinks,
  };

  return <Context.Provider value={ contextValue }>{children}</Context.Provider>;
}

AppContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext;
