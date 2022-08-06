import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Aux/RenderWithRouter';

describe('teste o coponente pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokeTitle = screen.getByRole('heading', { name: / encountered pokemons/i });
    expect(pokeTitle).toBeInTheDocument();

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const pokefavorited = screen.getByText(/is marked as favorite/i);
    expect(pokefavorited).toBeInTheDocument();

    const pokechecked = screen.getByRole('checkbox', { name: / favorite Pokemons /i });
    userEvent.click(pokechecked);

    const pokePageFav = screen.getByRole('link', { name: /Favorite Pokemon/i });
    userEvent.click(pokePageFav);

    const PokeName = screen.getByText(/pikachu/i);
    const pokeType = screen.getByText(/electric/i);
    const pokeSize = screen.getByText(/average weight:/i);
    expect(PokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeSize).toBeInTheDocument();
  });
  test('Testa se o tipo correto do pokémon é mostrado na tela;', () => {
    renderWithRouter(<App />);
    const fire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fire);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const pokefavorited = screen.getByText(/pokémon favoritado\?/i);
    expect(pokefavorited).toBeInTheDocument();

    const pokechecked = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(pokechecked);

    const pokePageFav = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(pokePageFav);
  });
  test('testa o peso medio renderiza corretamente ', () => {
    const { container } = renderWithRouter(<App
      measurementUnit="kg"
      value="5,0"
      averageWeight="Average Weight"
    />);
    expect(container.firstChild).toMatchSnapshot();
    // https://pt-br.reactjs.org/docs/testing-recipes.html#snapshot-testing
    //    https://jestjs.io/pt-BR/docs/snapshot-testing

    // obter uma captura disso, então compará-lo para com uma imagem de referência armazenada com o teste
    // O teste irá falhar se as duas imagens não coincidirem:
    // quer a mudança seja inesperada, ou a captura de tela precisa ser atualizada para a nova versão do componente.
  });
});
