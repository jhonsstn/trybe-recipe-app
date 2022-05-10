import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnStatus, setBtnStatus] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
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
    <form
      className="text-lg  flex flex-col
       justify-center items-center py-7 bg-orange-300"
      onSubmit={ handleSubmit }
    >
      <label htmlFor="email" className="flex justify-center items-center">
        Email:
        <input
          className="rounded-lg"
          data-testid="email-input"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          className="rounded-lg"
          data-testid="password-input"
          type="number"
          id="password"
          name="password"
          placeholder="Senha"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        className="px-2 rounded-lg bg-orange-700 text-orange-50"
        data-testid="login-submit-btn"
        type="submit"
        disabled={ btnStatus }
      >
        Login
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
