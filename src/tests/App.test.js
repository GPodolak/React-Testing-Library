import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/Aux/RenderWithRouter';
// import renderWithRouter from '../Aux/renderWithRouter';

describe('Teste se a aplicação é redirecionada para a página inicial, na URL', () => {
  test('testando link Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: /home/i });

    expect(linkToHome).toBeInTheDocument();
    userEvent.click(linkToHome);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});
test('testando link About', () => {
  const { history } = renderWithRouter(<App />);
  const linkToAbout = screen.getByRole('link', { name: /About/i });

  expect(linkToAbout).toBeInTheDocument();

  userEvent.click(linkToAbout);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/about');
});

test('testando link Favorite Pokemons', () => {
  const { history } = renderWithRouter(<App />);
  const linkToFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

  expect(linkToFavorite).toBeInTheDocument();
  userEvent.click(linkToFavorite);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/favorites');
});
test('Testando o NotFound a entrar em uma URL desconhecida', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/UmaURL');

  const pageNotFound = screen.getByText('Page not found');
  expect(pageNotFound).toBeInTheDocument();
});
// teste
