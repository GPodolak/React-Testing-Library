import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Aux/RenderWithRouter';

const pokeFilter = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
];

describe('teste o componente pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('teste se a página contém um heading h2', () => {
    const pokeHeading = screen.getByRole('heading', { level: 2 });
    expect(pokeHeading).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo pokémon da lista quando o botão é clicado', () => {
    const pokeHeading = screen.getByRole('heading', { level: 2 });
    expect(pokeHeading).toHaveTextContent('Encountered pokémons');
  });
});

describe('Testa o proximo botão', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Teste se é exibido o próximo pokémon da lista quando o botão é clicado', () => {
    const pokeNextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(pokeNextButton);
    const pokeNext = screen.getByRole('img', { name: /charmander sprite/i });
    expect(pokeNext).toBeInTheDocument();
  });
  test('testa se é exibido no botão o texto "proximo pokemon" ', () => {
    const pokebutton = screen.getByRole('img', { name: /charmander sprite/i });
    expect(pokebutton).toHaveTextContent('Próximo pokémon');
  });
  test('Os próximos pokémons da lista devem ser mostrados, um a um;', () => {
    const pokemonOneByOne = screen.getAllByRole('img');
    expect(pokemonOneByOne).toHaveLength(1);
  });
  test('testa se retorna ao primeiro pokemon ao acabar a lista', () => {
    const pokeNextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokelist = 9;
    for
    (let i = 0; i < pokelist; i += 1) {
      userEvent.click(pokeNextButton);
    }
    const pokeFirst = screen.getByText(/pikachu/i);
    expect(pokeFirst).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex tem os botões de filtro:', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Teste se tem botões para preenchimento', () => {
    const fillBtn = screen.getAllByTestId('pokemon-type-button');
    expect(fillBtn.length).toBe(pokeFilter.length);
  });
  test('teste se contem um botão de filtragem pra cada tipo de pokemon', () => {
    const pokemonType = screen.getByRole('button', { name: /fire/i });
    userEvent.click(pokemonType);
    const charmander = screen.getByRole('img', { name: /charmander sprite/i });
    expect(charmander).toBeInTheDocument();
  });
  test('a se o botão "all" está sempre visivel', () => {
    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttonAll);
    expect(buttonAll).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('testa se contem o botão reset', () => {
    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttonAll);
    const pokeFirst = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokeFirst).toBeInTheDocument();
  });
  test('testa se o botão possui o texto "all"', () => {
    const textBtn = screen.getByRole('button', { name: /all/i });
    expect(textBtn).toHaveTextContent('All');
  });
  test('Test se Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const pokeFirst = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokeFirst).toBeInTheDocument();
    const pokeNext = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(pokeNext);
    const pokeSec = screen.getByRole('img', { name: /charmander sprite/i });
    expect(pokeSec).toBeInTheDocument();
  });
});
