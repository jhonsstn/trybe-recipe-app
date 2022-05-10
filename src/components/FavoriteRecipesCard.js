import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import { toggleFavorite } from '../services/detailsHelper';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteRecipesCard({
  recipe,
  index,
  share,
  shareButton,
  setChanged,
}) {
  const history = useHistory();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favoriteFoods = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteFoods) {
      const heart = favoriteFoods.some((item) => item.id === recipe.id);
      setFavorite(heart);
    }
  }, [recipe.id]);

  return (
    <div key={ index }>
      <button
        type="button"
        onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
      >
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
          width="100px"
        />
      </button>

      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${recipe.nationality} - ${recipe.category}`}
      </p>
      <p data-testid="1-horizontal-top-text">{recipe.alcoholicOrNot}</p>
      <button
        type="button"
        onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
      >
        <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
      </button>

      <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

      <button type="button" onClick={ () => shareButton(recipe.id, recipe.type) }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt={ recipe.name }
        />
        {share && 'Link copied!'}
      </button>
      <button
        type="button"
        onClick={ () => {
          toggleFavorite(recipe.id, recipe, recipe.type, setFavorite);
          setChanged((prev) => !prev);
        } }
      >
        {favorite ? (
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt="favorite black button"
          />
        ) : (
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ whiteHeartIcon }
            alt="favorite white button "
          />
        )}
      </button>
    </div>
  );
}

FavoriteRecipesCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
    tags: PropTypes.shape({
      map: PropTypes.func,
    }),
    type: PropTypes.string,
  }).isRequired,
  setChanged: PropTypes.func.isRequired,
  share: PropTypes.bool.isRequired,
  shareButton: PropTypes.func.isRequired,
};

export default FavoriteRecipesCard;
