import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Header from '../layout/Header';
import Main from '../layout/Main';
import Footer from '../layout/Footer';

function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      setEmail(user.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <>
      <Header title="Profile" />
      <Main>
        <p data-testid="profile-email">{`Email: ${email}`}</p>

        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </Main>
      <Footer />
    </>
  );
}

export default Profile;
