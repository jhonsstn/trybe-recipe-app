import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/testConfig';

describe('2 - Crie uma página de Login:', () => {
  test('Crie um local para que o usuário insira seu email e senha', () => {
    renderWithRouter(<App />);
    // render(<App />);
    const emailInput = screen.getByRole('input', { name: /email/i });
    expect(emailInput).toBeInTheDocument();
  });
});
