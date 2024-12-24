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
          `http://localhost:4000/api/pedidos/${clienteId}/pedidosClienteEntregados`
        );
        setPedidos(response.data); // Establece los pedidos entregados
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener pedidos entregados:", error);
        setError("No se pudieron obtener los pedidos entregados.");
        setLoading(false);
      }
    };

    fetchPedidosEntregados();
  }, []);

  if (loading) {
    return <div>Cargando historial...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Historial de Pedidos</h2>
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
        <div className="alert alert-info">
          No hay pedidos entregados en el historial.
        </div>
      )}
    </div>
  );
};
