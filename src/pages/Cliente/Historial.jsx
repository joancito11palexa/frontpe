import React, { useEffect, useState } from "react";
import axios from "axios";

export const Historial = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedidosEntregados = async () => {
      const clienteId = localStorage.getItem("clienteId");

      if (!clienteId) {
        setError("No se encontró un ID de cliente en el localStorage.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `https://socketserver-u5si.onrender.com/api/pedidos/${clienteId}/pedidosClienteEntregados`
        );
        setPedidos(response.data); // Establece los pedidos entregados
      } catch (error) {
        console.error("Error al obtener pedidos entregados:", error);
        setError("No se pudieron obtener los pedidos entregados.");
      } finally {
        setLoading(false);
      }
    };

    fetchPedidosEntregados();
  }, []);

  return (
    <div className="clienteHistorialPage">
      <div className="header">
        <h2 className="text-center titulo">Historial de Pedidos</h2>
      </div>
      {loading && (
        <div className="loading">
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

      {/* Mostrar pedidos o mensaje de historial vacío */}
      {!loading && !error && (
        <>
          {pedidos.length > 0 ? (
            <>
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
            </>
          ) : (
            <div className="alerta">
              No hay pedidos entregados en el historial.
            </div>
          )}
        </>
      )}
    </div>
  );
};
