import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function FoodRecipeCard({ item, index }) {
  return (
    <Link key={ index } to={ `/foods/${item.idMeal}` }>
      <div
        data-testid={ `${index}-recipe-card` }
        className="flex items-center mb-4 border-2
        border-orange-900 rounded-3xl w-[calc(100vw-100px)]
        shadow-lg overflow-hidden shadow-orange-900"
      >
        <img
          className="h-[150px] rounded-3xl shadow-lg"
          data-testid={ `${index}-card-img` }
          src={ item.strMealThumb }
          alt="imagem da receita"
        />
        <p
          data-testid={ `${index}-card-name` }
          className="text-orange-900 hover:text-orange-700
          focus:border-2 text-2xl m-auto"
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
