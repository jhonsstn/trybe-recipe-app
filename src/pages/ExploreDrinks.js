import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../layout/Header';
import Main from '../layout/Main';
import Footer from '../layout/Footer';

function ExploreDrinks() {
  const history = useHistory();
  const [drink, setDrink] = useState({});

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => setDrink(data.drinks[0]));
  }, []);

  return (
    <>
      <Header title="Explore Drinks" />
      <Main>
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ () => history.push(`/drinks/${drink.idDrink}`) }
        >
          Surprise me!
        </button>
      </Main>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
