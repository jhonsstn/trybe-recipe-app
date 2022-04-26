import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/testConfig';

describe('2 - Crie uma página de Login:', () => {
  test('Crie um local para que o usuário insira seu email', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    expect(emailInput).toBeInTheDocument();
  });
  test('Crie um local para que o usuário insira seu senha', () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByRole('spinbutton', { name: /senha/i });
    expect(passwordInput).toBeInTheDocument();
  });
  test('Existe um botão', () => {
    renderWithRouter(<App />);
    const buttonLogin = screen.getByRole('button');
    expect(buttonLogin).toBeInTheDocument();
  });
});
