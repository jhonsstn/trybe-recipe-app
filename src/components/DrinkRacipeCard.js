import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function DrinkRecipeCard({ item, index }) {
  return (
    <Link key={ index } to={ `/drinks/${item.idDrink}` }>
      <div
        data-testid={ `${index}-recipe-card` }
        className="flex items-center mb-4 border-2
        border-orange-900 rounded-3xl w-[calc(100vw-100px)]
        shadow-lg overflow-hidden shadow-orange-900"
      >
        <img
          className="h-[150px] rounded-3xl shadow-lg"
          data-testid={ `${index}-card-img` }
          src={ item.strDrinkThumb }
          alt="imagem da receita"
        />
        <p
          data-testid={ `${index}-card-name` }
          className="text-orange-900 hover:text-orange-700
          focus:border-2 text-2xl m-auto"
        >
          {item.strDrink}
        </p>
      </div>
    </Link>
  );
}

DrinkRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};

export default DrinkRecipeCard;
