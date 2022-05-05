import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function FoodRecipeCard({ item, index }) {
  return (
    <Link key={ index } to={ `/foods/${item.idMeal}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ item.strMealThumb }
          alt="imagem da receita"
          width="150px"
        />
        <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
      </div>
    </Link>
  );
}

FoodRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    idMeal: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
};

export default FoodRecipeCard;
