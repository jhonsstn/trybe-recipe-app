import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function FoodRecipeCard({ item, index }) {
  return (
    <Link key={ index } to={ `/foods/${item.idMeal}` }>
      <div
        data-testid={ `${index}-recipe-card` }
        className="flex flex-col items-center"
      >
        <img
          className="w-[calc(100vw-30px)]"
          data-testid={ `${index}-card-img` }
          src={ item.strMealThumb }
          alt="imagem da receita"
        />
        <p
          data-testid={ `${index}-card-name` }
          className="text-orange-900 hover:text-orange-700 focus:border-2"
        >
          {item.strMeal}
        </p>
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
