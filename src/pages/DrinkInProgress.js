import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import WhiteHeartButton from '../components/WhiteHeartButton';
import ShareButton from '../components/ShareButton';
import { ingredientList, toggleFavorite } from '../services/detailsHelper';
import { fetchRecipes } from '../services/apiHelper';
import BlackHeartButton from '../components/BlackHeartButton';
import IngredientCheckbox from '../components/IngredientCheckbox';
import Loading from '../components/Loading';

function DrinkInProgress() {
  const history = useHistory();
  const { drinkId } = useParams();
  const [drink, setDrink] = useState({});
  const [share, setShare] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [finished, setFinished] = useState(true);

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
  }, [drinkId]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteRecipes) {
      const heart = favoriteRecipes.some((item) => item.id === drinkId);
      setFavorite(heart);
    }
  }, [drinkId]);

  const shareButton = async () => {
    const recipeLink = window.location.href.split('/i')[0];
    await navigator.clipboard.writeText(recipeLink);

    setShare(true);
  };

  const isDone = () => {
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (inProgressRecipes.cocktails[drinkId].length === ingredients.length) {
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

    console.log(drink);

    doneRecipes.push({
      id: drink.idDrink,
      type: 'drink',
      nationality: '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: drink.strTags?.split(', ') || [],
    });

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    console.log(inProgressRecipes.cocktails[drinkId]);

    delete inProgressRecipes.cocktails[drinkId];

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
        {!ingredients ? (
          <Loading />
        ) : (
          ingredients.map((ingredient, index) => (
            <IngredientCheckbox
              key={ index }
              index={ index }
              ingredient={ ingredient }
              measures={ measures }
              recipeId={ drinkId }
              id="drink"
              isDone={ isDone }
            />
          ))
        )}
      </div>
      <p data-testid="instructions">{drink.strInstructions}</p>

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

export default DrinkInProgress;
