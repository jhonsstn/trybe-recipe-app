import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodDetails() {
  const { foodId } = useParams();
  const history = useHistory();
  const [food, setFood] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setFood(data.meals[0]));
  }, [foodId]);

  useEffect(() => {
    const recUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetch(recUrl)
      .then((response) => response.json())
      .then((data) => setRecommendations(data.drinks));
  }, []);

  const arrIngredients = [];
  const arrMeasure = [];
  const TWENTY = 20;
  for (let index = 1; index < TWENTY; index += 1) {
    if (
      food[`strIngredient${index}`] !== ''
      && food[`strIngredient${index}`] !== null
    ) {
      arrIngredients.push(food[`strIngredient${index}`]);
      arrMeasure.push(food[`strMeasure${index}`]);
    }
  }

  const isDone = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const isRecipeDone = doneRecipes?.some((recipe) => recipe.id === foodId);
    return !isRecipeDone;
  };

  const isInProgress = () => {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (inProgressRecipes) {
      if (Object.keys(inProgressRecipes.meals).includes(foodId)) {
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
        src={ food.strMealThumb }
        alt={ food.idMeal }
      />
      <h1 data-testid="recipe-title">{food.strMeal}</h1>
      <p data-testid="recipe-category">{food.strCategory}</p>
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
      <p data-testid="instructions">{food.strInstructions}</p>
      <iframe
        width="100%"
        height="230px"
        src={ food.strYoutube?.replace('watch?v=', 'embed/') }
        title="YouTube video player"
        frameBorder="0"
        data-testid="video"
        allowFullScreen
      />
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
                  src={ recommendation.strDrinkThumb }
                  alt={ recommendation.strDrink }
                />
                <p>{recommendation.strCategory}</p>
                <h3 data-testid={ `${index}-recomendation-title` }>
                  {recommendation.strDrink}
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
          onClick={ () => history.push(`/foods/${foodId}/in-progress`) }
        >
          {isInProgress() ? 'Start Recipe' : 'Continue Recipe'}
        </button>
      )}
    </div>
  );
}

export default FoodDetails;
