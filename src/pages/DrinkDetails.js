import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinkDetails() {
  const { drinkId } = useParams();
  const history = useHistory();
  const [drink, setDrink] = useState({});
  const [recommendations, setRecommendations] = useState([]);

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
      .then((data) => setRecommendations(data.meals));
  }, []);

  const arrIngredients = [];
  const arrMeasure = [];
  const FIFTEEN = 15;
  for (let index = 1; index <= FIFTEEN; index += 1) {
    if (
      drink[`strIngredient${index}`] !== ''
      && drink[`strIngredient${index}`] !== null
    ) {
      arrIngredients.push(drink[`strIngredient${index}`]);
      arrMeasure.push(drink[`strMeasure${index}`]);
    }
  }

  const isDone = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const isRecipeDone = doneRecipes?.some((recipe) => recipe.id === drinkId);
    return !isRecipeDone;
  };

  const isInProgress = () => {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (inProgressRecipes) {
      if (Object.keys(inProgressRecipes.cocktails).includes(drinkId)) {
        return false;
      }
      return true;
    }
    return true;
  };

  return (
    <div>
      <img
        width="100%"
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
      <img src={ shareIcon } alt="share-button" data-testid="share-btn" />
      <img
        src={ blackHeartIcon }
        alt="favorite-button"
        data-testid="favorite-btn"
      />

      <p>Ingredients</p>
      <ul>
        {arrIngredients.map((ingredient, index) => (
          <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
            {`${ingredient} - ${arrMeasure[index]}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <div style={ { display: 'flex', overflowY: 'scroll' } }>
        {recommendations.map((recommendation, index) => {
          const FIVE = 5;
          if (index <= FIVE) {
            return (
              <div
                style={ { width: '180px' } }
                key={ index }
                data-testid={ `${index}-recomendation-card` }
              >
                <img
                  style={ { width: '180px', height: '180px' } }
                  src={ recommendation.strMealThumb }
                  alt={ recommendation.strMeal }
                />
                <p>{recommendation.strCategory}</p>
                <h3 data-testid={ `${index}-recomendation-title` }>
                  {recommendation.strMeal}
                </h3>
              </div>
            );
          }

          return null;
        })}
      </div>

      {isDone() && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: '0px' } }
          onClick={ () => history.push(`/drinks/${drinkId}/in-progress`) }
        >
          {isInProgress() ? 'Start Recipe' : 'Continue Recipe'}
        </button>
      )}
    </div>
  );
}

export default DrinkDetails;
