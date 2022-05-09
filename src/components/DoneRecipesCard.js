import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesCard({ value, index, share, shareButton }) {
  const history = useHistory();
  return (
    <div key={ index }>
      <button
        type="button"
        onClick={ () => history.push(`/${value.type}s/${value.id}`) }
      >
        <img
          src={ value.image }
          alt={ value.name }
          data-testid={ `${index}-horizontal-image` }
          width="100px"
        />
      </button>

      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${value.nationality} - ${value.category}`}
      </p>
      <p data-testid="1-horizontal-top-text">{value.alcoholicOrNot}</p>
      <button
        type="button"
        onClick={ () => history.push(`/${value.type}s/${value.id}`) }
      >
        <h1 data-testid={ `${index}-horizontal-name` }>{value.name}</h1>
      </button>

      <p data-testid={ `${index}-horizontal-done-date` }>{value.doneDate}</p>
      <h3>tags:</h3>
      {value.tags.map((tag, i) => (
        <span data-testid={ `${index}-${tag}-horizontal-tag` } key={ i }>
          {tag}
        </span>
      ))}
      <button type="button" onClick={ () => shareButton(value.id, value.type) }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt={ value.name }
        />
        {share && 'Link copied!'}
      </button>
    </div>
  );
}

DoneRecipesCard.propTypes = {
  index: PropTypes.number.isRequired,
  share: PropTypes.bool.isRequired,
  shareButton: PropTypes.func.isRequired,
  value: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string,
  }).isRequired,
};

export default DoneRecipesCard;
