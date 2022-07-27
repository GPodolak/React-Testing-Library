import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/Aux/RenderWithRouter';
import About from '../pages/About';

describe('Testa funcionalidade do componente About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const paragrafoH2 = screen.getByRole('heading', {
      name: /About Pokédex/i });
    expect(paragrafoH2).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    const pokeText = screen.getAllByText(/pokémons/i);
    expect(pokeText).toHaveLength(2);
  });
  test('Testa A existencia da imagem no documento', () => {
    const img = screen.getByRole('img', { name: 'Pokédex' });
    const urlImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img).toHaveAttribute('src', urlImg);
  });
});
