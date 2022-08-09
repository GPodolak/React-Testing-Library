import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import pokemons from '../data';
import App from '../App';
import renderWithRouter from './Aux/RenderWithRouter';

test('', () => {});

describe('Teste o componente Pokemon', () => {
  const pokeId = pokemons
    .map((poke) => poke.id);

  it('Teste se é renderizado um card com as informações de determinado pokémon:',
    () => {
      renderWithRouter(<App />);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/Electric/i);
      const pokeImg = screen.getByAltText(/Pikachu sprite/i);
      const Urlimg = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
      expect(pokeImg).toBeInTheDocument();
      expect(pokeImg).toHaveAttribute('src', Urlimg);
    });

  test(
    'Teste o card do pokémon indicado contém um link de navegação para exibir detalhes',
    () => {
      renderWithRouter(<App />);
      const PokemonButtonNex = screen.getByRole('button', { name: /Próximo pokémon/i });
      const PokeLink = screen.getByRole('link',
        { name: /More details/i });
      pokeId.forEach((id) => {
        expect(PokeLink).toHaveAttribute('href', `/pokemons/${id}`);
        userEvent.click(PokemonButtonNex);
      });
    },
  );

  test('Ao clicar no link, é feito o redirecionamento para a página de detalhes:',
    () => {
      renderWithRouter(<App />);
      const PokeLink = screen.getByRole('link', { name: /More details/i });
      userEvent.click(PokeLink);
      const PokeHead = screen.getAllByRole('heading', { level: 2 });
      expect(PokeLink).not.toBeInTheDocument();
      expect(PokeHead[0]).toHaveTextContent(/Details/i);
      expect(PokeHead[1]).toHaveTextContent(/Summary/i);
      expect(PokeHead[2]).toHaveTextContent(/Game Locations of/i);
    });

  test(' Teste também se a URL exibida no navegador muda para',
    () => {
      const { history } = renderWithRouter(<App />);
      const PokeLink = screen.getByRole('link', { name: /More details/i });
      userEvent.click(PokeLink);
      const { pathname } = history.location;
      expect(pathname).toBe(`/pokemons/${pokeId[0]}`);
    });
  // teste
  test('Teste se existe um ícone de estrela nos pokémons favoritados:',
    () => {
      const { history } = renderWithRouter(<App />);
      const PokeLink = screen.getByRole('link', { name: /More details/i });
      userEvent.click(PokeLink);
      const pokecheck = screen.getByRole('checkbox');
      userEvent.click(pokecheck);
      history.push('/');
      const favIcon = screen.getAllByRole('img');
      expect(favIcon[1]).toHaveAttribute('src', '/star-icon.svg');
      expect(favIcon[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    });
});
