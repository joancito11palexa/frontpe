// PedidoList.jsx
import React from "react";
import BtnEntregadoIcon from "/src/assets/btnEntregado.svg?react";
import BtnEliminarIcon from "/src/assets/btnEliminar.svg?react";

export const PedidoList = ({
  pedidos,
  dispatch,
  marcarEntregado,
  eliminarPedido,
}) => (
  <div className="contenedorPedidos row">
    {pedidos.map((pedido, index) => (
      <div
        key={index}
        className={
          pedido.estado === "entregado" ? "oculto" : "p-1 col-12 col-md-3"
        }
      >
        <div className="pedido">
          <div className="data">
            <div className="col-6">
              <strong>Plato Principal:</strong>
              {pedido.descripcion?.platoPrincipal?.length > 0
                ? pedido.descripcion.platoPrincipal.map((p, idx) => (
                    <p key={idx}>
                      {p.nombre} (x{p.cantidad})
                    </p>
                  ))
                : "No hay platos principales"}
            </div>
            <div className="col-6">
              <strong>Entradas:</strong>
              {pedido.descripcion?.entradas &&
              Array.isArray(pedido.descripcion.entradas) &&
              pedido.descripcion.entradas.length > 0
                ? pedido.descripcion.entradas.map((entrada, idx) => (
                    <p key={idx}>
                      {entrada.nombre} (x{entrada.cantidad})
                    </p>
                  ))
                : "No hay entradas"}
            </div>
            <div className="col-12">
              <p>
                <strong>Total:</strong> S/.{pedido.total || 0}
              </p>
            </div>
            <p className={`estado ${pedido.estado}`}>{pedido.estado}</p>
          </div>
          <div className="botones">
            <button
              onClick={() => marcarEntregado(pedido.id)}
              className="btnEntregado"
            >
              <BtnEntregadoIcon />
            </button>
            <button
              onClick={() => eliminarPedido(pedido.id)}
              className="btnEliminar"
            >
              <BtnEliminarIcon />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);
