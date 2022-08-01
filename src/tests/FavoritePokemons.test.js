import React from 'react';
import FavoritePokemons from '../components/Pokemon';
import renderWithRouter from './Aux/RenderWithRouter';

describe('testando ocomponente FavoritePokemon', () => {
  test('teste a exibição damensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
  });
});
