const fetchMealsData = async (id, value) => {
  let URL = '';
  if (id === 'ingredient') {
    URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
  } else if (id === 'name') {
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
  } else if (id === 'first-letter') {
    if (value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;
  }
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
};

export default fetchMealsData;
