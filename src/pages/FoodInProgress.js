import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import WhiteHeartButton from '../components/WhiteHeartButton';
import BlackHeartButton from '../components/BlackHeartButton';
import { ingredientList, toggleFavorite } from '../services/detailsHelper';
import { fetchRecipes, fetchRecommendations } from '../services/apiHelper';

function FoodInProgress() {
  const { foodId } = useParams();
  const history = useHistory();
  const [food, setFood] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [share, setShare] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    fetchRecipes(foodId, 'meals').then((meal) => setFood(meal));
    fetchRecommendations('drinks').then((cocktail) => setRecommendations(cocktail));
  }, [foodId]);

  useEffect(() => {
    const favoriteFoods = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteFoods) {
      const heart = favoriteFoods.some((item) => item.id === foodId);
      setFavorite(heart);
    }
  }, [foodId]);

  const TWENTY = 20;
  const [ingredients, measures] = ingredientList(TWENTY, food);

  const isDone = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const isRecipeDone = doneRecipes?.some((recipe) => recipe.id === foodId);
    return !isRecipeDone;
  };

  const shareButton = async () => {
    const recipeLink = window.location.href.split('/i')[0];
    await navigator.clipboard.writeText(recipeLink);

    setShare(true);
  };

  return (
    <div>
      <img
        width="100%"
        data-testid="recipe-photo"
        src={ food.strMealThumb }
        alt={ food.idMeal }
      />
      <div style={ { display: 'flex' } }>
        <h1 data-testid="recipe-title">{food.strMeal}</h1>
        <div>
          <button type="button" onClick={ shareButton }>
            <ShareButton />
          </button>
          {share && <p>Link copied!</p>}
        </div>
        <button
          type="button"
          onClick={ () => toggleFavorite(foodId, food, 'meal', setFavorite) }
        >
          {favorite ? <BlackHeartButton /> : <WhiteHeartButton />}
        </button>
      </div>
      <p data-testid="recipe-category">{food.strCategory}</p>

      <p>Ingredients</p>
      <div>
        {ingredients.map((ingredient, index) => (
          <label
            htmlFor="checkbox-ingredient"
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <input id="checkbox-ingredient" type="checkbox" />
            {`${ingredient} - ${measures[index]}`}
          </label>
        ))}
      </div>
      <p data-testid="instructions">{food.strInstructions}</p>
      {/* <iframe
        width="100%"
        height="230px"
        src={ food.strYoutube?.replace('watch?v=', 'embed/') }
        title="YouTube video player"
        frameBorder="0"
        data-testid="video"
        allowFullScreen
      /> */}
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
          data-testid="finish-recipe-btn"
          style={ { position: 'fixed', bottom: '0px' } }
          onClick={ () => history.push(`/foods/${foodId}/in-progress`) }
        >
          {/* {isInProgress() ? 'Start Recipe' : 'Continue Recipe'} */}
          Finish Recipe
        </button>
      )}
    </div>
  );
}

export default FoodInProgress;
