import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Context } from '../context/AppContext';
import fetchData from '../services/apiHelper';

function Button({ strCategory }) {
  const { setMeals, setDrinks, category, setCategory } = useContext(Context);

  const { pathname } = window.location;

  const setDefaultRecipes = async () => {
    const data = await fetchData('name', '', pathname);
    if (pathname === '/foods') {
      setMeals(data);
    } else {
      setDrinks(data);
    }
  };

  const resetAllButtons = () => {
    const keys = Object.keys(category);
    keys.forEach((key) => {
      if (key !== strCategory) {
        setCategory((prev) => ({
          ...prev,
          [key]: false,
        }));
      }
    });
  };

  const setCategoryMeals = async (categoryName) => {
    resetAllButtons();
    if (!category[strCategory]) {
      const data = await fetchData('category', `${categoryName}`, pathname);
      if (pathname === '/foods') {
        setMeals(data);
        setCategory((prev) => ({
          ...prev,
          [strCategory]: !prev[strCategory],
        }));
      } else {
        setDrinks(data);
        setCategory((prev) => ({
          ...prev,
          [strCategory]: !prev[strCategory],
        }));
      }
    } else {
      setDefaultRecipes();
      setCategory((prev) => ({
        ...prev,
        [strCategory]: !prev[strCategory],
      }));
    }
  };

  return (
    <button
      data-testid={ `${strCategory}-category-filter` }
      type="button"
      onClick={ () => setCategoryMeals(strCategory) }
    >
      {`${strCategory} ${category[strCategory]}`}
    </button>
  );
}

Button.propTypes = {
  strCategory: PropTypes.string.isRequired,
};

export default Button;
