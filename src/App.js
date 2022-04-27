import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppContext from './context/AppContext';
import Drinks from './pages/Drinks';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import FoodIngredients from './pages/FoodIngredients';
import DrinkIngredients from './pages/DrinkIngredients';
import FoodNationalities from './pages/FoodNationalities';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <AppContext>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:food_id" component={ FoodDetails } />
        <Route exact path="/drinks/:drink_id" component={ DrinkDetails } />
        <Route
          exact
          path="/foods/:food_id/in-progress"
          component={ FoodInProgress }
        />
        <Route
          exact
          path="/foods/:drink_id/in-progress"
          component={ DrinkInProgress }
        />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ FoodIngredients }
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ DrinkIngredients }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ FoodNationalities }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </AppContext>
  );
}

export default App;
