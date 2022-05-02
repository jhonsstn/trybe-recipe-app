import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinkDetails() {
  const { drinkId } = useParams();
  const [drink, setDrink] = useState({});
  const [recomendations, setRecomendations] = useState([]);

  useEffect(() => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setDrink(data.drinks[0]));
  }, [drinkId]);

  useEffect(() => {
    const recUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetch(recUrl)
      .then((response) => response.json())
      .then((data) => setRecomendations(data.meals));
  }, []);

  const arrIngredients = [];
  const TWENTY = 20;
  for (let index = 1; index < TWENTY; index += 1) {
    if (drink[`strIngredient${index}`] !== '') {
      arrIngredients.push(drink[`strIngredient${index}`]);
    }
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.idDrink }
      />
      <h1 data-testid="recipe-title">{drink.strDrink}</h1>
      <p data-testid="recipe-category">{drink.strCategory}</p>
      <img src={ shareIcon } alt="share-button" data-testid="share-btn" />
      <img
        src={ blackHeartIcon }
        alt="favorite-button"
        data-testid="favorite-btn"
      />
      <ul>
        {arrIngredients.map((ingredient, index) => (
          <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
            {ingredient}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>

      {recomendations.map((recomendation, index) => {
        const FIVE = 5;
        if (index <= FIVE) {
          return (
            <div key={ index } data-testid={ `${index}-recomendation-card` }>
              {recomendation.strDrink}
            </div>
          );
        }
        return null;
      })}
      <button type="button" data-testid="start-recipe-btn">
        Iniciar Receita
      </button>
    </div>
  );
}

export default DrinkDetails;
