import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import WhiteHeartButton from '../components/WhiteHeartButton';
import ShareButton from '../components/ShareButton';
import { ingredientList, toggleFavorite } from '../services/detailsHelper';
import { fetchRecipes, fetchRecommendations } from '../services/apiHelper';
import BlackHeartButton from '../components/BlackHeartButton';
import RecommendationsCard from '../components/RecommendationsCard';

function DrinkDetails() {
  const { drinkId } = useParams();
  const history = useHistory();
  const [drink, setDrink] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [share, setShare] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    const FIFTEEN = 15;
    fetchRecipes(drinkId, 'drinks')
      .then((cocktail) => {
        setDrink(cocktail);
        return ingredientList(FIFTEEN, cocktail);
      })
      .then(([allIngredients, allMeasures]) => {
        setIngredients(allIngredients);
        setMeasures(allMeasures);
      });

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

  const shareButton = async () => {
    await navigator.clipboard.writeText(window.location.href);

    setShare(true);
  };

  return (
    <div className="bg-orange-50 relative">
      <img
        width="100%"
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt={ drink.idDrink }
      />

      <h1 className="ml-4 mt-4 text-4xl" data-testid="recipe-title">
        {drink.strDrink}
      </h1>
      <div className="fixed right-2 top-2 bg-orange-400 p-2 rounded-md relativo">
        <div>
          <button type="button" onClick={ shareButton }>
            <ShareButton />
            {share && (
              <span
                className="flex justify-center text-black absolute top-2 right-11
            bg-orange-50 w-24 rounded-lg"
              >
                Link copied!
              </span>
            )}
          </button>
        </div>
        <button
          type="button"
          onClick={ () => toggleFavorite(drinkId, drink, 'drink', setFavorite) }
        >
          {favorite ? <BlackHeartButton /> : <WhiteHeartButton />}
        </button>
      </div>
      {drink.strAlcoholic === 'Alcoholic' ? (
        <p className="px-4" data-testid="recipe-category">
          {drink.strAlcoholic}
        </p>
      ) : (
        <p className="px-4" data-testid="recipe-category">
          {drink.strCategory}
        </p>
      )}

      <p className="ml-4">Ingredients</p>
      <ul className="ml-10">
        {ingredients.map((ingredient, index) => (
          <li
            className="list-disc"
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${ingredient} - ${measures[index]}`}
          </li>
        ))}
      </ul>
      <p className="ml-4" data-testid="instructions">
        {drink.strInstructions}
      </p>
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
          onClick={ () => history.push(`/drinks/${drinkId}/in-progress`) }
        >
          {isInProgress() ? 'Start Recipe' : 'Continue Recipe'}
        </button>
      )}
    </div>
  );
}

export default DrinkDetails;
