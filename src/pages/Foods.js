import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Context } from '../context/AppContext';
import Header from '../layout/Header';
import Main from '../layout/Main';
import Footer from '../layout/Footer';
import fetchData from '../services/apiHelper';

function Foods({ history }) {
  const { meals, setMeals, searchBarStatus } = useContext(Context);

  useEffect(() => {
    const path = window.location.pathname;
    fetchData('name', '', path).then((data) => setMeals(data));
  }, [setMeals]);

  const verifyMeals = () => {
    if (meals === null) {
      return global.alert(
        'Sorry, we haven\'t found any recipes for these filters.',
      );
    }
    if (meals.length === 1 && searchBarStatus) {
      return history.push(`/foods/${meals[0].idMeal}`);
    }
  };
  return (
    <>
      <Header title="Foods" />
      <Main>
        {verifyMeals()}
        {meals
          && meals.map((item, index) => {
            const ELEVEN = 11;
            if (index <= ELEVEN) {
              return (
                <Link key={ index } to={ `/foods/${item.idMeal}` }>
                  <div data-testid={ `${index}-recipe-card` }>
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ item.strMealThumb }
                      alt="imagem da receita"
                      width="150px"
                    />
                    <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
                  </div>
                </Link>
              );
            }
            return null;
          })}
      </Main>
      <Footer />
    </>
  );
}

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Foods;
