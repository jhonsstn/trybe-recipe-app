import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import WhiteHeartButton from '../components/WhiteHeartButton';
import ShareButton from '../components/ShareButton';
import {
  ingredientList,
  toggleFavorite,
  toggleIngredients,
} from '../services/detailsHelper';
import { fetchRecipes, fetchRecommendations } from '../services/apiHelper';
import BlackHeartButton from '../components/BlackHeartButton';

function DrinkInProgress() {
  const { drinkId } = useParams();
  const history = useHistory();
  const [drink, setDrink] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [share, setShare] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    fetchRecipes(drinkId, 'drinks').then((cocktail) => setDrink(cocktail));
    fetchRecommendations('meals').then((meal) => setRecommendations(meal));
  }, [drinkId]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteRecipes) {
      const heart = favoriteRecipes.some((item) => item.id === drinkId);
      setFavorite(heart);
    }
  }, [drinkId]);

  const isDone = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const isRecipeDone = doneRecipes?.some((recipe) => recipe.id === drinkId);
    return !isRecipeDone;
  };

  const FIFTEEN = 15;
  const [ingredients, measures] = ingredientList(FIFTEEN, drink);

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
        src={ drink.strDrinkThumb }
        alt={ drink.idDrink }
      />
      <div style={ { display: 'flex' } }>
        <h1 data-testid="recipe-title">{drink.strDrink}</h1>
        <div>
          <button type="button" onClick={ shareButton }>
            <ShareButton />
            {share && 'Link copied!'}
          </button>
        </div>
        <button
          type="button"
          onClick={ () => toggleFavorite(drinkId, drink, 'drink', setFavorite) }
        >
          {favorite ? <BlackHeartButton /> : <WhiteHeartButton />}
        </button>

        {drink.strAlcoholic === 'Alcoholic' ? (
          <p data-testid="recipe-category">{drink.strAlcoholic}</p>
        ) : (
          <p data-testid="recipe-category">{drink.strCategory}</p>
        )}
      </div>

      <p>Ingredients</p>
      <div>
        {ingredients.map((ingredient, index) => (
          <label
            htmlFor={ `${index}-checkbox-ingredient` }
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            style={ { textDecoration: 'none solid black' } }
          >
            <input
              id={ `${index}-checkbox-ingredient` }
              type="checkbox"
              onChange={ () => toggleIngredients(ingredient, drinkId) }
            />
            {`${ingredient} - ${measures[index]}`}
          </label>
        ))}
      </div>
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
          data-testid="finish-recipe-btn"
          style={ { position: 'fixed', bottom: '0px' } }
          onClick={ () => history.push(`/drinks/${drinkId}/done-recipes`) }
        >
          {/* {isInProgress() ? 'Start Recipe' : 'Continue Recipe'} */}
          Finish Recipe
        </button>
      )}
    </div>
  );
}

export default DrinkInProgress;
