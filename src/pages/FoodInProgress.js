import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import WhiteHeartButton from '../components/WhiteHeartButton';
import BlackHeartButton from '../components/BlackHeartButton';
import { ingredientList, toggleFavorite } from '../services/detailsHelper';
import { fetchRecipes } from '../services/apiHelper';
import IngredientCheckbox from '../components/IngredientCheckbox';
import Loading from '../components/Loading';

function FoodInProgress() {
  const { foodId } = useParams();
  const history = useHistory();
  const [food, setFood] = useState({});
  const [share, setShare] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [finished, setFinished] = useState(true);

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
  }, [foodId]);

  useEffect(() => {
    const favoriteFoods = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteFoods) {
      const heart = favoriteFoods.some((item) => item.id === foodId);
      setFavorite(heart);
    }
  }, [foodId]);

  const shareButton = async () => {
    const recipeLink = window.location.href.split('/i')[0];
    await navigator.clipboard.writeText(recipeLink);

    setShare(true);
  };

  const isDone = () => {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (inProgressRecipes.meals[foodId].length === ingredients.length) {
      setFinished(false);
    } else {
      setFinished(true);
    }
  };

  const setDone = () => {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    doneRecipes.push({
      id: food.idMeal,
      type: 'food',
      nationality: '',
      category: food.strCategory,
      alcoholicOrNot: food.strAlcoholic || '',
      name: food.strMeal,
      image: food.strMealThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: food.strTags.split(', ') || [],
    });

    console.log(food);

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    console.log(inProgressRecipes.meals[foodId]);

    delete inProgressRecipes.meals[foodId];

    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );

    history.push('/done-recipes');
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
          onClick={ () => toggleFavorite(foodId, food, 'food', setFavorite) }
        >
          {favorite ? <BlackHeartButton /> : <WhiteHeartButton />}
        </button>
      </div>
      <p data-testid="recipe-category">{food.strCategory}</p>

      <p>Ingredients</p>
      <div>
        {!ingredients ? (
          <Loading />
        ) : (
          ingredients.map((ingredient, index) => (
            <IngredientCheckbox
              key={ index }
              index={ index }
              ingredient={ ingredient }
              measures={ measures }
              recipeId={ foodId }
              id="meal"
              isDone={ isDone }
            />
          ))
        )}
      </div>
      <p data-testid="instructions">{food.strInstructions}</p>

      <button
        type="button"
        data-testid="finish-recipe-btn"
        style={ { position: 'fixed', bottom: '0px' } }
        disabled={ finished }
        onClick={ () => setDone() }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default FoodInProgress;
