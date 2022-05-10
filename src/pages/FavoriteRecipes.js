import React, { useState, useEffect } from 'react';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';
import Header from '../layout/Header';
import Main from '../layout/Main';
import Loading from '../components/Loading';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('all');
  const [share, setShare] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(recipes);
  }, [changed]);

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

    return filteredRecipes.map((recipe, index) => (
      <FavoriteRecipesCard
        key={ index }
        recipe={ recipe }
        index={ index }
        share={ share }
        shareButton={ shareButton }
        setChanged={ setChanged }
      />
    ));
  };

  return (
    <>
      <Header title="Favorite Recipes" />
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
          {!favoriteRecipes ? <Loading /> : renderCards(favoriteRecipes)}
        </div>
      </Main>
    </>
  );
}

export default FavoriteRecipes;
