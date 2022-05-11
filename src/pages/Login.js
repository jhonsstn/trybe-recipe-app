import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import bgImage from '../images/image.png';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnStatus, setBtnStatus] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!localStorage.getItem('mealsToken')) {
      localStorage.setItem('mealsToken', '1');
    }
    if (!localStorage.getItem('cocktailsToken')) {
      localStorage.setItem('cocktailsToken', '1');
    }
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  useEffect(() => {
    const formValidation = () => {
      const MIN_LENGTH_VALUE = 7;
      const minPassValid = password.length >= MIN_LENGTH_VALUE;
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = regexEmail.test(email);
      const isValid = minPassValid && isEmailValid;
      if (isValid) {
        setBtnStatus(false);
      } else {
        setBtnStatus(true);
      }
    };
    formValidation();
  }, [password, email]);

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center"
      style={ { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' } }
    >
      <div
        className="py-7 bg-orange-400 rounded-md shadow-2xl
        px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="font-dancing font-bold text-5xl text-center pb-2 ">
          Try Recipes
        </h1>
        <form
          className="text-lg  flex flex-col
        justify-center items-center "
          onSubmit={ handleSubmit }
        >
          <label htmlFor="email" className="flex flex-col items-start">
            Email:
            <input
              className="pl-1 shadow text-md border
          rounded-sm h-8 w-52 bg-white
          placeholder:text-sm placeholder:text-orange-300
          placeholder:pl-1"
              data-testid="email-input"
              type="email"
              id="email"
              name="email"
              placeholder="Ex.: ada.lovelace@betrybe.com"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </label>
          <label htmlFor="password" className="flex flex-col items-start">
            Senha:
            <input
              className="pl-1 shadow text-md border rounded-sm h-8 w-52 bg-white
          placeholder:text-sm placeholder:text-orange-300 placeholder:pl-1"
              data-testid="password-input"
              type="password"
              id="password"
              name="password"
              placeholder="Sua senha"
              value={ password }
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </label>
          <button
            className="mt-6 px-4 py-0.5 rounded-sm bg-orange-700
        text-orange-50 hover:bg-orange-500 focus:bg-orange-500"
            data-testid="login-submit-btn"
            type="submit"
            disabled={ btnStatus }
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
