export const fetchData = async (id, value, path) => {
  let URL = '';
  if (id === 'ingredient') {
    URL = `https://www.${
      path === '/foods' ? 'themealdb' : 'thecocktaildb'
    }.com/api/json/v1/1/filter.php?i=${value}`;
  } else if (id === 'name') {
    URL = `https://www.${
      path === '/foods' ? 'themealdb' : 'thecocktaildb'
    }.com/api/json/v1/1/search.php?s=${value}`;
  } else if (id === 'first-letter') {
    if (value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    URL = `https://www.${
      path === '/foods' ? 'themealdb' : 'thecocktaildb'
    }.com/api/json/v1/1/search.php?f=${value}`;
  } else if (id === 'category') {
    URL = `https://www.${
      path === '/foods' ? 'themealdb' : 'thecocktaildb'
    }.com/api/json/v1/1/filter.php?c=${value}`;
  }
  const response = await fetch(URL);
  const data = await response.json();
  if (path === '/foods') {
    return data.meals;
  }
  return data.drinks;
};

export const fetchRecipes = async (recipeId, recipeType) => {
  const URL = `https://www.${
    recipeType === 'meals' ? 'themealdb' : 'thecocktaildb'
  }.com/api/json/v1/1/lookup.php?i=${recipeId}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data[recipeType][0];
};

export const fetchRecommendations = async (recipeType) => {
  const recUrl = `https://www.${
    recipeType === 'meals' ? 'themealdb' : 'thecocktaildb'
  }.com/api/json/v1/1/search.php?s=`;
  const response = await fetch(recUrl);
  const data = await response.json();
  return data[recipeType];
};
