export const ingredientList = (number, recipeList) => {
  const ingredients = [];
  const measures = [];

  for (let index = 1; index < number; index += 1) {
    if (
      recipeList[`strIngredient${index}`] !== ''
      && recipeList[`strIngredient${index}`] !== null
    ) {
      ingredients.push(recipeList[`strIngredient${index}`]);
      measures.push(recipeList[`strMeasure${index}`]);
    }
  }
  return [ingredients, measures];
};

const removeRecipe = (recipeId, setFavorite) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let recipeIndex = 0;
  favoriteRecipes.forEach((item, index) => {
    if (item.id === recipeId) {
      recipeIndex = index;
    }
  });
  favoriteRecipes.splice(recipeIndex, 1);
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  setFavorite(false);
};

const insertRecipe = (recipeList, id, setFavorite) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  favoriteRecipes.push({
    id: recipeList[`${id === 'meal' ? 'idMeal' : 'idDrink'}`],
    type: id === 'meal' ? 'food' : 'drink',
    nationality: recipeList.strArea || '',
    category: recipeList.strCategory || '',
    alcoholicOrNot: recipeList.strAlcoholic || '',
    name: recipeList[`${id === 'meal' ? 'strMeal' : 'strDrink'}`],
    image: recipeList[`${id === 'meal' ? 'strMealThumb' : 'strDrinkThumb'}`],
  });
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  setFavorite(true);
};

export const toggleFavorite = (recipeId, recipeList, id, setFavorite) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes) {
    if (favoriteRecipes.some((item) => item.id === recipeId)) {
      removeRecipe(recipeId, setFavorite);
    } else {
      insertRecipe(recipeList, id, setFavorite);
    }
  }
};

const getIndex = (array, ingredient) => {
  let ingredientIndex = 0;
  for (let index = 0; index < array.length; index += 1) {
    if (array[index] === ingredient) {
      ingredientIndex = index;
    }
  }
  return ingredientIndex;
};

const addIngredient = (key, recipeId, ingredient) => {
  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  inProgressRecipes[key][recipeId].push(ingredient);
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
};

const removeIngredient = (key, recipeId, ingredient) => {
  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  const index = getIndex(inProgressRecipes[key][recipeId], ingredient);
  inProgressRecipes[key][recipeId].splice(index, 1);
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
};

export const toggleIngredients = (ingredient, recipeId, id) => {
  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  const key = id === 'meal' ? 'meals' : 'cocktails';
  if (inProgressRecipes[key][recipeId]) {
    if (inProgressRecipes[key][recipeId].includes(ingredient)) {
      removeIngredient(key, recipeId, ingredient);
    } else {
      addIngredient(key, recipeId, ingredient);
    }
  } else {
    inProgressRecipes[key][recipeId] = [];
    inProgressRecipes[key][recipeId].push(ingredient);
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );
  }
};

export const alreadyUsed = (ingredient, recipeId, id) => {
  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  const key = id === 'meal' ? 'meals' : 'cocktails';
  if (inProgressRecipes[key][recipeId]) {
    return inProgressRecipes[key][recipeId].includes(ingredient);
  }
  return false;
};
