import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import WhiteHeartButton from '../components/WhiteHeartButton';
import BlackHeartButton from '../components/BlackHeartButton';
import { ingredientList, toggleFavorite } from '../services/detailsHelper';
import { fetchRecipes, fetchRecommendations } from '../services/apiHelper';
import Loading from '../components/Loading';
import RecommendationsCard from '../components/RecommendationsCard';

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
    <div className="bg-orange-50 relative">
      <img
        width="100%"
        data-testid="recipe-photo"
        src={ food.strMealThumb }
        alt={ food.idMeal }
      />

      <h1 className="ml-4 mt-4 text-4xl" data-testid="recipe-title">
        {food.strMeal}
      </h1>

      <div className="fixed right-2 top-2 bg-orange-400 p-2 rounded-md relativo">
        <div>
          <button type="button" onClick={ shareButton }>
            <ShareButton />
          </button>
          {share && (
            <span
              className="flex justify-center text-black absolute top-2 right-11
            bg-orange-50 w-24 rounded-lg"
            >
              Link copied!
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={ () => toggleFavorite(foodId, food, 'food', setFavorite) }
        >
          {favorite ? <BlackHeartButton /> : <WhiteHeartButton />}
        </button>
      </div>
      <p className="px-4" data-testid="recipe-category">
        {food.strCategory}
      </p>

      <p className="ml-4">Ingredients</p>
      <ul className="ml-10">
        {!ingredients ? (
          <Loading />
        ) : (
          ingredients.map((ingredient, index) => (
            <li
              className="list-disc"
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {`${ingredient} - ${measures[index]}`}
            </li>
          ))
        )}
      </ul>
      <p className="ml-4" data-testid="instructions">
        {food.strInstructions}
      </p>
      <iframe
        width="100%"
        height="230px"
        src={ food.strYoutube?.replace('watch?v=', 'embed/') }
        title="YouTube video player"
        frameBorder="0"
        data-testid="video"
        allowFullScreen
      />
      <div className="flex overflow-scroll">
        {recommendations.map((recommendation, index) => {
          const FIVE = 5;
          if (index <= FIVE) {
            return (
              <RecommendationsCard
                key={ index }
                recommendation={ recommendation }
                index={ index }
              />
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
