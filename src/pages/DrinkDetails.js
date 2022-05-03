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
  const arrMeasure = [];
  const FIFTEEN = 15;
  for (let index = 1; index <= FIFTEEN; index += 1) {
    if (drink[`strIngredient${index}`] !== null) {
      arrIngredients.push(drink[`strIngredient${index}`]);
      arrMeasure.push(drink[`strMeasure${index}`]);
    }
  }

  return (
    <div>
      <img
        width="350px"
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.idDrink }
      />
      <h1 data-testid="recipe-title">{drink.strDrink}</h1>
      {drink.strAlcoholic === 'Alcoholic' ? (
        <p data-testid="recipe-category">{drink.strAlcoholic}</p>
      ) : (
        <p data-testid="recipe-category">{drink.strCategory}</p>
      )}

      <p>Ingredients</p>
      <ul>
        {arrIngredients.map((ingredient, index) => (
          <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
            {`${ingredient} - ${arrMeasure[index]}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <div style={ { display: 'flex', maxWidth: '350px', overflowY: 'scroll' } }>
        {recomendations.map((recomendation, index) => {
          const FIVE = 5;
          if (index <= FIVE) {
            return (
              <div
                style={ { maxWidth: '180px' } }
                key={ index }
                data-testid={ `${index}-recomendation-card` }
              >
                <img
                  width="180px"
                  src={ recomendation.strMealThumb }
                  alt={ recomendation.strMeal }
                />
                <p>{recomendation.strCategory}</p>
                <h3 data-testid={ `${index}-recomendation-title` }>
                  {recomendation.strMeal}
                </h3>
              </div>
            );
          }

          return null;
        })}
      </div>
      <img src={ shareIcon } alt="share-button" data-testid="share-btn" />
      <img
        src={ blackHeartIcon }
        alt="favorite-button"
        data-testid="favorite-btn"
      />
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ { position: 'fixed', bottom: '0px' } }
      >
        Start Recipe
      </button>
    </div>
  );
}

export default DrinkDetails;
