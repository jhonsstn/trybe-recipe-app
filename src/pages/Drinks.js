import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import Main from '../layout/Main';
import Footer from '../layout/Footer';
import { Context } from '../context/AppContext';
import fetchData from '../services/apiHelper';

function Drinks({ history }) {
  const { drinks, setDrinks } = useContext(Context);

  useEffect(() => {
    const path = window.location.pathname;
    fetchData('name', '', path).then((data) => setDrinks(data));
  }, [setDrinks]);

  const verifyDrinks = () => {
    if (drinks === null) {
      return global.alert(
        'Sorry, we haven\'t found any recipes for these filters.',
      );
    }
    if (drinks.length === 1) {
      return history.push(`/drinks/${drinks[0].idDrink}`);
    }
  };
  return (
    <>
      <Header title="Drinks" />
      <Main>
        {verifyDrinks()}
        {drinks
          && drinks.map((item, index) => {
            const ELEVEN = 11;
            if (index <= ELEVEN) {
              return (
                <Link key={ index } to={ `/drinks/${item.idDrink}` }>
                  <div data-testid={ `${index}-recipe-card` }>
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ item.strDrinkThumb }
                      alt="imagem da receita"
                      width="150px"
                    />
                    <p data-testid={ `${index}-card-name` }>{item.strDrink}</p>
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

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Drinks;
