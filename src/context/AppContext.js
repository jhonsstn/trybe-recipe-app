import PropTypes from 'prop-types';
import React, { useState, createContext, useEffect } from 'react';

export const Context = createContext();

function AppContext({ children }) {
  const [searchBarStatus, setSearchBarStatus] = useState(false);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [category, setCategory] = useState({});

  useEffect(() => {
    if (!localStorage.getItem('mealsToken')) {
      localStorage.setItem('mealsToken', '1');
    }
    if (!localStorage.getItem('cocktailsToken')) {
      localStorage.setItem('cocktailsToken', '1');
    }
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    if (!localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipes = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify(inProgressRecipes),
      );
    }
  }, []);

  const contextValue = {
    searchBarStatus,
    setSearchBarStatus,
    meals,
    setMeals,
    drinks,
    setDrinks,
    category,
    setCategory,
  };

  return <Context.Provider value={ contextValue }>{children}</Context.Provider>;
}

AppContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext;
