import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from './Aux/RenderWithRouter';

describe('Teste o componente notFound', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/pokequalquercoisa');
  });
  test('Testa se a pagina contem um h2 com o texto "Page requested not found 😭"', () => {
    const pokeText = screen.getByRole('heading', { name: /page/i });
    expect(pokeText).toBeInTheDocument();
    expect(pokeText).toHaveTextContent(/page requested not found 😭/i);
  });
  test('Testa se a pagina mostra a imagem ', () => {
    const pokeImage = screen.getByRole('img', { name: /pikachu crying/i });
    const pokeUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(pokeImage).toHaveAttribute('src', pokeUrl);
  });
});
