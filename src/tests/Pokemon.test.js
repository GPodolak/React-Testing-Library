import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Aux/RenderWithRouter';

describe('testeandoo componente Pokemon', () => {
  test('Teste se é renderizado um card com as info de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokeTitle = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(pokeTitle).toBeInTheDocument();

    const pokeFav = screen.getByText(/pokémon favoritado/i);
    expect(pokeFav).toBeInTheDocument();

    const pokeDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeDetails);

    const pokeChecked = screen.getByRole('checkbox', { name: /Pokémons Favoritados\?/i });
    userEvent.click(pokeChecked);

    const pokeFavPg = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(pokeFavPg);

    const size = screen.getByText(/average weight:/i);
    const name = screen.getByText(/pikachu/i);
    const type = screen.getByText(/fire/i);
    expect(size).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
  });
  test('Teste se o nome correto do pokemon é mostrado em tela', () => {
    renderWithRouter(<App />);
    const typePoison = screen.getByRole('button', { name: /poison/i });
    userEvent.click(typePoison);

    const pokeDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeDetails);

    const pokeFav = screen.getByText(/pokémon favoritado\?/i);
    expect(pokeFav).toBeInTheDocument();

    const pokemonEkan = screen.getByText(/ekans/i);
    expect(pokemonEkan).toBeInTheDocument();
    const favCheck = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    userEvent.click(favCheck);

    const pokeFavPg = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(pokeFavPg);

  //  const eka = screen.getByText(/ekans/i);
    // expect(eka).toBeInTheDocument();
  });
  test('testa o peso medio renderiza corretamente', () => {
    const { container } = renderWithRouter(<App
      measurementUnit="kg"
      averageWeight="Average weight"
      value="6.0"
    />);
    expect(container.firstChild).toMatchSnapshot();
    // https://pt-br.reactjs.org/docs/testing-recipes.html#snapshot-testing
    //    https://jestjs.io/pt-BR/docs/snapshot-testing

    // Snapshot
    // obter uma captura disso, então compará-lo para com uma imagem de referência armazenada com o teste
    // O teste irá falhar se as duas imagens não coincidirem:
    // quer a mudança seja inesperada, ou a captura de tela precisa ser atualizada para a nova versão do componente.
  });
});
describe('testando a URL  Pokedex', () => {
  test('test se contém um link de navegação "Mostrar detalhes"', () => {
    renderWithRouter(<App />);
    const url = screen.getByText(/more details/i);
    expect(url).toBeInTheDocument();
  });
  test('test se a url do link contém o id do pokemon', () => {
    const { container } = renderWithRouter(<App id="25" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('teste se existe um ícone de estrela nos pokémons favoritados:', () => {
  test('Test se tem um icone de "fav" quando é adicionado aos favoritos', () => {
    const { container } = renderWithRouter(<App
      alt="charmander is marked as favorite"
      src="/star-icon.svg"
    />);
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('testa se é exibido o nome do pokemon no atirbuto Alt', () => {
    const { container } = renderWithRouter(<App
      alt="charmander is marked as favorite"
    />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
