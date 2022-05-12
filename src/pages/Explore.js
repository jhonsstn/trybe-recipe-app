import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../layout/Header';
import Main from '../layout/Main';
import Footer from '../layout/Footer';

function Explore() {
  const history = useHistory();
  return (
    <>
      <Header title="Explore" />
      <Main>
        <button
          data-testid="explore-foods"
          type="button"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          data-testid="explore-drinks"
          type="button"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </Main>
      <Footer />
    </>
  );
}

export default Explore;
