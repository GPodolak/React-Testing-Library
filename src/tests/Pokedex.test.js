import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Aux/RenderWithRouter';

const filterPokemon = [
  'Bug',
  'Normal',
  'Dragon',
  'Poison',
  'Psychic',
  'Electric',
  'Fire',
];
describe('teste o componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('testa o texto na pagina', () => {
    const poketext = screen.getByRole('heading', { level: 2 });
    expect(poketext).toBeInTheDocument();
  });
});
describe('Testa o botão Próximo pokémon', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Testa se é exibido o próximo pokémon da lista quando clicado', () => {
    const pokeButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(pokeButton);
    const pokeNext = screen.getByRole('img', { name: /charmander sprite/i });
    expect(pokeNext).toBeInTheDocument();
  });
  test('Testa se a lista retorna pro começo ao terminar', () => {
    const pokeButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokeList = 9;
    for (let i = 0; i < pokeList; i += 1) {
      userEvent.click(pokeButton);
    }
    const newPokemon = screen.getByText(/pikachu/i);
    expect(newPokemon).toBeInTheDocument();
  });

  test('Testa se o botão contem o texto "Próximo pokémon"', () => {
    const newbutton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(newbutton).toHaveTextContent('Próximo pokémon');
  });
  test('Teste se é mostrado apenas um pokémon por vez;', () => {
    const pokemnos = screen.getAllByRole('img');
    expect(pokemnos).toHaveLength(1);
  });

  describe('Testa os botões do pokedex', () => {
    beforeEach(() => {
      renderWithRouter(<App />);
    });
    test('Testa se o pokémon filtrado é renderizado', () => {
      const fire = screen.getByRole('button', { name: /fire/i });
      userEvent.click(fire);
      const charmander = screen.getByRole('img', { name: /charmander sprite/i });
      expect(charmander).toBeInTheDocument();
    });
    test('Testa se contém botões de preenchimento', () => {
      const btns = screen.getAllByTestId('pokemon-type-button');
      expect(btns.length).toBe(filterPokemon.length);
    });
    test('Testa o botão all', () => {
      const pokeAll = screen.getByRole('button', { name: /all/i });
      userEvent.click(pokeAll);
      expect(pokeAll).toBeInTheDocument();
    });
  });

  describe('Testa o botão de reset', () => {
    beforeEach(() => {
      renderWithRouter(<App />);
    });
    test('testa se contem um botão de reset', () => {
      const allBtn = screen.getByRole('button', { name: /all/i });
      userEvent.click(allBtn);
      const pokeFirst = screen.getByRole('img', { name: /pikachu sprite/i });
      expect(pokeFirst).toBeInTheDocument();
    });
    test('Testa se a pagina quando carregada tem  o filtro selecionado', () => {
      const pokeFirst = screen.getByRole('img', { name: /pikachu sprite/i });
      expect(pokeFirst).toBeInTheDocument();
      const pokeNext = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(pokeNext);
      const pokeSec = screen.getByRole('img', { name: /charmander sprite/i });
      expect(pokeSec).toBeInTheDocument();
    });

    test('testa se o botão contém o texto all', () => {
      const btn = screen.getByRole('button', { name: /all/i });
      expect(btn).toHaveTextContent('All');
    });
  });
});
