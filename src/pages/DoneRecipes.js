import React, { useEffect, useState } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Header from '../layout/Header';
import Main from '../layout/Main';

function DoneRecipes() {
  const [filter, setFilter] = useState('all');
  const [share, setShare] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState([]);
  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(recipes);
  }, []);

  const shareButton = async (id, type) => {
    const url = `http://localhost:3000/${type}s/${id}`;
    await navigator.clipboard.writeText(url);

    setShare(true);
  };
  const recipesFilter = (recipes) => {
    if (filter === 'all') {
      return recipes;
    }
    return recipes.filter((recipe) => recipe.type === filter);
  };
  const renderCards = (allRecipes) => {
    const filteredRecipes = recipesFilter(allRecipes);

    return filteredRecipes.map((value, index) => (
      <DoneRecipesCard
        key={ index }
        value={ value }
        index={ index }
        share={ share }
        shareButton={ shareButton }
      />
    ));
  };

  return (
    <>
      <Header title="Done Recipes" />
      <Main>
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setFilter('all') }
            name="all"
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => setFilter('food') }
            name="food"
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setFilter('drink') }
            name="drink"
          >
            Drink
          </button>
          {!doneRecipes ? 'carregando' : renderCards(doneRecipes)}
        </div>
      </Main>
    </>
  );
}

export default DoneRecipes;
