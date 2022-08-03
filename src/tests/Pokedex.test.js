import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './Aux/RenderWithRouter';

describe('teste o componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('testa o texto na pagina', () => {
    const poketext = screen.getByRole('heading', { level: 2 });
    expect(poketext).toBeInTheDocument();
  });
});
