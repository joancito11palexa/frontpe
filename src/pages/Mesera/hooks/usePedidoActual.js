import { useState } from "react";

export const usePedidoActual = () => {
  const [pedidoActual, setPedidoActual] = useState({
    principales: [],
    entradas: [],
    total: 0,
  });

  const agregarAlPedido = (plato) => {
    setPedidoActual((prev) => {
      const tipo = plato.tipo === "platoPrincipal" ? "principales" : "entradas";
      const platoExistente = prev[tipo].find((p) => p.id === plato.id);
      return platoExistente
        ? {
            ...prev,
            [tipo]: prev[tipo].map((p) =>
              p.id === plato.id ? { ...p, cantidad: p.cantidad + 1 } : p
            ),
            total: prev.total + plato.precio,
          }
        : {
            ...prev,
            [tipo]: [...prev[tipo], { ...plato, cantidad: 1 }],
            total: prev.total + plato.precio,
          };
    });
  };

  const resetPedido = () => {
    setPedidoActual({ principales: [], entradas: [], total: 0 });
  };

  return { pedidoActual, agregarAlPedido, resetPedido };
};
