import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { alreadyUsed, toggleIngredients } from '../services/detailsHelper';

function IngredientCheckbox({
  index,
  ingredient,
  measures,
  recipeId,
  id,
  isDone,
}) {
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    if (alreadyUsed(ingredient, recipeId, id)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [ingredient, recipeId, id]);

  return (
    <label
      htmlFor={ `${index}-checkbox-ingredient` }
      key={ index }
      data-testid={ `${index}-ingredient-step` }
    >
      <input
        style={ { textDecoration: 'none solid rgb(0,0,0)' } }
        id={ `${index}-checkbox-ingredient` }
        type="checkbox"
        defaultChecked={ checked }
        onClick={ () => {
          toggleIngredients(ingredient, recipeId, id);
          isDone();
          if (alreadyUsed(ingredient, recipeId, id)) {
            setChecked(true);
          } else {
            setChecked(false);
          }
        } }
      />
      {`${ingredient} - ${measures[index]}`}
    </label>
  );
}

IngredientCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  isDone: PropTypes.func.isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeId: PropTypes.string.isRequired,
};

export default IngredientCheckbox;
