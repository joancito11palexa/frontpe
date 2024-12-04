// PlatoButton.jsx
import React from 'react';

export const PlatoButton = ({ plato, agregarAlPedido }) => (
  <button onClick={() => agregarAlPedido(plato)}>
    {plato.nombre}
  </button>
);


