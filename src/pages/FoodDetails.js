import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import WhiteHeartButton from '../components/WhiteHeartButton';
import BlackHeartButton from '../components/BlackHeartButton';
import { ingredientList, toggleFavorite } from '../services/detailsHelper';
import { fetchRecipes, fetchRecommendations } from '../services/apiHelper';
import Loading from '../components/Loading';

function FoodDetails() {
  const { foodId } = useParams();
  const history = useHistory();
  const [food, setFood] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [share, setShare] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    const TWENTY = 20;
    fetchRecipes(foodId, 'meals')
      .then((meal) => {
        setFood(meal);
        return ingredientList(TWENTY, meal);
      })
      .then(([allIngredients, allMeasures]) => {
        setIngredients(allIngredients);
        setMeasures(allMeasures);
      });

    fetchRecommendations('drinks').then((cocktail) => setRecommendations(cocktail));
  }, [foodId, food]);

  useEffect(() => {
    const favoriteFoods = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteFoods) {
      const heart = favoriteFoods.some((item) => item.id === foodId);
      setFavorite(heart);
    }
  }, [foodId]);

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

  const shareButton = async () => {
    await navigator.clipboard.writeText(window.location.href);

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
      <ul>
        {!ingredients ? (
          <Loading />
        ) : (
          ingredients.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {`${ingredient} - ${measures[index]}`}
            </li>
          ))
        )}
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
