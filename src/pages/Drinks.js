import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Header from '../layout/Header';
import ProfileIcon from '../components/ProfileIcon';
import SearchIcon from '../components/SearchIcon';
import Main from '../layout/Main';
import Footer from '../layout/Footer';
import { Context } from '../context/AppContext';

function Drinks({ history }) {
  const { drinks } = useContext(Context);
  const verifyDrinks = () => {
    if (drinks === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } if (drinks.length === 1) {
      return history.push(`/drinks/${drinks[0].idDrink}`);
    }
  };
  return (
    <>
      <Header title="Drinks">
        <ProfileIcon />
        <SearchIcon />
      </Header>
      <Main>
        { verifyDrinks() }
        { drinks && drinks.map((item, index) => {
          const ELEVEN = 11;
          if (index <= ELEVEN) {
            return (
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ item.strDrinkThumb }
                  alt="imagem da receita"
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  { item.strDrink }
                </p>
              </div>
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
