import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './Aux/RenderWithRouter';
import pokemons from '../data';

describe('Teste o componente PokemonDetails', () => {
  test('Teste se as informações detalhadas do pokémon selecionado são mostradas na tela:',
    () => {
      renderWithRouter(<App />);
      const pokeDetailsLink = screen.getByRole('link', { name: /More details/i });
      userEvent.click(pokeDetailsLink);
      const pokeText1 = screen.getByRole('heading', { name: /Pikachu Details/i });
      const pokeText2 = screen.getByRole('heading', { name: /Summary/i });
      const pokeText3 = screen.getByRole('heading',
        { name: /Game Locations of Pikachu/i });
      const PokeTextDetails = screen.getByText(/This intelligent Pokémon roasts/i);

      expect(pokeText1).toBeInTheDocument();
      expect(pokeText2).toBeInTheDocument();
      expect(pokeText3).toBeInTheDocument();
      expect(PokeTextDetails).toBeInTheDocument();
    });

  test('Teste se existe na página os mapas contendo as localizações do pokémon',
    () => {
      renderWithRouter(<App />);
      const pokemonLink = screen.getByRole('link', { name: /More details/i });
      userEvent.click(pokemonLink);

      const pokeLocation = pokemons.map((poke) => poke.foundAt);
      const pokeLength = pokeLocation[0].length;
      const pokeSrc = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';

      const pokemonLocalization = screen.getAllByAltText(/Pikachu location/i);

      expect(pokemonLocalization).toHaveLength(pokeLength);
      expect(pokemonLocalization[0]).toHaveAttribute('src', pokeSrc);
    });

  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes:',
    () => {
      renderWithRouter(<App />);
      const linkDetails = screen.getByRole('link', { name: /More details/i });
      userEvent.click(linkDetails);

      const pokeCheckeBox = screen.getByLabelText(/Pokémon favoritado/i);
      expect(pokeCheckeBox).toBeInTheDocument();
    });
});
