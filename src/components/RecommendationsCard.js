import PropTypes from 'prop-types';
import React from 'react';

function RecommendationsCard({ recommendation, index }) {
  console.log(recommendation);
  const { strMealThumb, strMeal } = recommendation;
  return (
    <div
      key={ index }
      data-testid={ `${index}-recomendation-card` }
      className="flex flex-col justify-center items-center min-w-[164px] m-2"
    >
      <img
        className="w-[150px]"
        src={
          recommendation[`${strMealThumb ? 'strMealThumb' : 'strDrinkThumb'}`]
        }
        alt={ recommendation[`${strMeal ? 'strMeal' : 'strDrink'}`] }
      />
      <p>{recommendation.strCategory}</p>
      <h3 data-testid={ `${index}-recomendation-title` }>
        {recommendation[`${strMeal ? 'strMeal' : 'strDrink'}`]}
      </h3>
    </div>
  );
}

RecommendationsCard.propTypes = {
  index: PropTypes.number.isRequired,
  recommendation: PropTypes.shape({
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
};
export default RecommendationsCard;
