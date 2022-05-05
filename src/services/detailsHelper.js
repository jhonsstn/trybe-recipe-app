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
  const recipeToRemove = favoriteRecipes.slice(recipeIndex, recipeIndex + 1);
  const newFavoriteRecipes = favoriteRecipes.filter(
    (meal) => meal.id !== recipeToRemove[0].id,
  );
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
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
