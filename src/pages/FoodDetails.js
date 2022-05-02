import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodDetails() {
  const { foodId } = useParams();
  const [food, setFood] = useState({});
  const [recomendations, setRecomendations] = useState([]);

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
      .then((data) => setRecomendations(data.drinks));
  }, []);

  const arrIngredients = [];
  const TWENTY = 20;
  for (let index = 1; index < TWENTY; index += 1) {
    if (food[`strIngredient${index}`] !== '') {
      arrIngredients.push(food[`strIngredient${index}`]);
    }
  }

  return (
    <div>
      <img
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
      <ul>
        {arrIngredients.map((ingredient, index) => (
          <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
            {ingredient}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{food.strInstructions}</p>
      <iframe
        width="560"
        height="315"
        src={ food.strYoutube?.replace('watch?v=', 'embed/') }
        title="YouTube video player"
        frameBorder="0"
        data-testid="video"
        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
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

export default FoodDetails;
