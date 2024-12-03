// PedidoForm.jsx
import React from 'react';

export const PedidoForm = ({ pedidoActual, enviarPedido }) => (
  <form onSubmit={(e) => { e.preventDefault(); enviarPedido(); }} className="formularioDePedidos">
    <div className="row g-2 boxioContainer">
      <div className="col-6 boxio">
        <h4>Entradas</h4>
        {pedidoActual.entradas.length > 0 ? (
          <div className="row g-2">
            {pedidoActual.entradas.map((plato, i) => (
              <div className=" boxi" key={i}>
                {plato.nombre}
                <p className="cantidad">{plato.cantidad}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay entradas seleccionadas</p>
        )}
      </div>
      <div className="col-6 boxio">
        <h4>Principales</h4>
        {pedidoActual.principales.length > 0 ? (
          <div className="row g-2">
            {pedidoActual.principales.map((plato, i) => (
              <div className=" boxi" key={i}>
                {plato.nombre}{" "}
                <p className="cantidad">{plato.cantidad}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay platos principales seleccionados</p>
        )}
      </div>
    </div>
    <p className="totalPedido">Total: S/.{pedidoActual.total}</p>
    <button type="submit">Enviar Pedido</button>
  </form>
);


