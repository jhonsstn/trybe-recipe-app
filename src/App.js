import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppContext from './context/AppContext';

function App() {
  return (
    <AppContext>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" component={ Foods } />
      </Switch>
    </AppContext>
  );
}

export default App;
