import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      const clienteId = localStorage.getItem("clienteId");

      if (!clienteId) {
        setError("No se encontró un ID de cliente en el localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://socketserver-u5si.onrender.com/api/pedidos/${clienteId}/pedidosCliente`
        );
        const pedidosPendientes = response.data.filter(
          (pedido) => pedido.estado === "pendiente"
        );
        setPedidos(pedidosPendientes);
      } catch (error) {
        setError("Error al obtener los pedidos: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <div className="pedidosClientePage">
      <div className="header">
        <h3 className="titulo">Mis Pedidos</h3>
      </div>

      {/* Mostrar estado de carga */}
      {loading && (
        <div className="loading d-flex justify-content-center">
          <div class="spinner-border " role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      )}

      {/* Mostrar mensaje de error */}
      {error && (
        <div className="error">
          <p>Error: {error}</p>
        </div>
      )}

      {/* Mostrar pedidos o mensaje de lista vacía */}
      {!loading && !error && (
        <>
          {pedidos.length > 0 ? (
            <div className="list-group">
              {pedidos.map((pedido) => (
                <div key={pedido.id} className="list-group-item">
                  <h5>Pedido #{pedido.id}</h5>
                  <p>
                    <strong>Fecha:</strong>{" "}
                    {new Date(pedido.fecha).toLocaleString()}
                  </p>
                  <p>
                    <strong>Total:</strong> S/{pedido.total.toFixed(2)}
                  </p>
                  <p>
                    <strong>Estado:</strong> {pedido.estado}
                  </p>
                  <p>
                    <strong>Descripción:</strong>
                  </p>
                  <ul>
                    {pedido.descripcion.platoPrincipal.map((plato, index) => (
                      <li key={index}>
                        {plato.nombre} - {plato.cantidad} x S/
                        {plato.precio.toFixed(2)}
                      </li>
                    ))}
                    {pedido.descripcion.entradas.map((entrada, index) => (
                      <li key={index}>
                        {entrada.nombre} - {entrada.cantidad} x S/
                        {entrada.precio.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert">
              <p>No tienes pedidos registrados.</p>
              <Link to={"/ver-menu"} className="button">
                Ir al menú
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};
