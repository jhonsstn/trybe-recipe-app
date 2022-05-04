import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Header from '../layout/Header';
import Main from '../layout/Main';
import Footer from '../layout/Footer';
import { Context } from '../context/AppContext';
import fetchData from '../services/apiHelper';
import DrinkRecipeCard from '../components/DrinkRacipeCard';

function Drinks({ history }) {
  const { drinks, setDrinks } = useContext(Context);

  useEffect(() => {
    const path = window.location.pathname;
    fetchData('name', '', path).then((data) => setDrinks(data));
  }, [setDrinks]);

  const verifyDrinks = () => {
    if (drinks === null) {
      return global.alert(
        'Sorry, we haven\'t found any recipes for these filters.',
      );
    }
    if (drinks.length === 1) {
      return history.push(`/drinks/${drinks[0].idDrink}`);
    }
  };
  return (
    <>
      <Header title="Drinks" />
      <Main>
        {verifyDrinks()}
        {drinks
          && drinks.map((item, index) => {
            const ELEVEN = 11;
            if (index <= ELEVEN) {
              return <DrinkRecipeCard key={ index } item={ item } index={ index } />;
            }

            return null;
          })}
      </Main>
      <Footer />
    </>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Drinks;
