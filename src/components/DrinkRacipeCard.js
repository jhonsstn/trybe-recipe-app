import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function DrinkRecipeCard({ item, index }) {
  return (
    <Link key={ index } to={ `/drinks/${item.idDrink}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ item.strDrinkThumb }
          alt="imagem da receita"
          width="150px"
        />
        <p data-testid={ `${index}-card-name` }>{item.strDrink}</p>
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
