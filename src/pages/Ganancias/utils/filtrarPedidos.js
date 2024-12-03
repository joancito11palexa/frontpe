// src/utils/filtrarPedidos.js
export const filtrarPedidos = (pedidos, timeFrame) => {
    const now = new Date();
    return pedidos.filter((pedido) => {
      if (pedido.estado !== "entregado") return false;
      const fechaPedido = new Date(pedido.fecha);
      if (timeFrame === "dia") {
        return fechaPedido.toDateString() === now.toDateString();
      } else if (timeFrame === "semana") {
        const inicioSemana = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
        const finSemana = new Date(inicioSemana);
        finSemana.setDate(inicioSemana.getDate() + 6);
        return fechaPedido >= inicioSemana && fechaPedido <= finSemana;
      } else if (timeFrame === "mes") {
        return fechaPedido.getMonth() === now.getMonth() && fechaPedido.getFullYear() === now.getFullYear();
      } else if (timeFrame === "año") {
        return fechaPedido.getFullYear() === now.getFullYear();
      }
      return false;
    });
  };
  