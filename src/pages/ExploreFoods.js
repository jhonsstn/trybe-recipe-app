import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../layout/Header';
import Main from '../layout/Main';
import Footer from '../layout/Footer';

function ExploreFoods() {
  const history = useHistory();
  const [food, setFood] = useState({});

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => setFood(data.meals[0]));
  }, []);

  return (
    <>
      <Header title="Explore Foods" />
      <Main>
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          data-testid="explore-by-nationality"
          type="button"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ () => history.push(`/foods/${food.idMeal}`) }
        >
          Surprise me!
        </button>
      </Main>
      <Footer />
    </>
  );
}

export default ExploreFoods;
