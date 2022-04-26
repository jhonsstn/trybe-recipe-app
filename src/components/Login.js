import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {};

  return (
    <form action={ handleSubmit }>
      <label htmlFor="email">
        Email:
        <input
          data-testid="email-input"
          type="email"
          id="email"
          placeholder="Email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          data-testid="password-input"
          type="number"
          id="password"
          placeholder="Senha"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button data-testid="login-submit-btn" type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;
