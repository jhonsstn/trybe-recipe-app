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
      console.log('aqui');
      removeRecipe(recipeId, setFavorite);
    } else {
      console.log('ali');
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

export const toggleIngredients = (ingredient, recipeId) => {
  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  if (inProgressRecipes.cocktails[recipeId]) {
    if (inProgressRecipes.cocktails[recipeId].includes(ingredient)) {
      const index = getIndex(inProgressRecipes.cocktails[recipeId], ingredient);
      inProgressRecipes.cocktails[recipeId].splice(index, 1);
      console.log(inProgressRecipes);
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify(inProgressRecipes),
      );
    } else {
      inProgressRecipes.cocktails[recipeId].push(ingredient);
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify(inProgressRecipes),
      );
    }
  } else {
    inProgressRecipes.cocktails[recipeId] = [];
    inProgressRecipes.cocktails[recipeId].push(ingredient);
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );
  }
};
