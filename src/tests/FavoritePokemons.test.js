import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/Pokemon';
import renderWithRouter from './Aux/RenderWithRouter';
import App from '../App';

describe('Teste o componente Favorite Pokemons', () => {
  test('Teste se é exibido na tela a mensagem No favorite Pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const pokeMessage = screen.getByText(/No favorite Pokemon found/i);
    expect(pokeMessage).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokemons favoritados', () => {
    renderWithRouter(<App />);
    const pokeDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeDetails);

    const favoriteCard = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favoriteCard);

    const favoritePokemon = screen.getByText(/Favorite Pokémons/i);
    userEvent.click(favoritePokemon);

    const pikachu = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachu).toBeInTheDocument();
  });
});
