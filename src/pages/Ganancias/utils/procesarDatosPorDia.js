// src/utils/procesarDatosPorDia.js
export const procesarDatosPorDia = (pedidosFiltrados) => {
    const datosPorDia = {};
    pedidosFiltrados.forEach((pedido) => {
      const fecha = new Date(pedido.fecha).toLocaleDateString();
      if (!datosPorDia[fecha]) {
        datosPorDia[fecha] = { ventasPorPlato: {}, total: 0 };
      }
  
      const { platoPrincipal, entradas } = pedido.descripcion;
      [...platoPrincipal, ...entradas].forEach((item) => {
        if (!datosPorDia[fecha].ventasPorPlato[item.nombre]) {
          datosPorDia[fecha].ventasPorPlato[item.nombre] = { cantidad: 0, total: 0 };
        }
  
        datosPorDia[fecha].ventasPorPlato[item.nombre].cantidad += item.cantidad;
        datosPorDia[fecha].ventasPorPlato[item.nombre].total += item.cantidad * item.precio;
      });
  
      datosPorDia[fecha].total += pedido.total;
    });
  
    const tablaData = Object.entries(datosPorDia).map(([fecha, { ventasPorPlato, total }]) => {
      const platos = Object.entries(ventasPorPlato);
      const masVendido = platos.reduce(
        (prev, curr) => (curr[1].cantidad > prev[1].cantidad ? curr : prev),
        ["N/A", { cantidad: 0, total: 0 }]
      );
  
      const menosVendido = platos.reduce(
        (prev, curr) => (curr[1].cantidad < prev[1].cantidad ? curr : prev),
        ["N/A", { cantidad: Infinity, total: 0 }]
      );
  
      return {
        fecha,
        platosVendidos: platos.reduce((sum, [, data]) => sum + data.cantidad, 0),
        platoMasVendido: `${masVendido[0]} ($${masVendido[1].total.toFixed(2)})`,
        platoMenosVendido: `${menosVendido[0]} ($${menosVendido[1].total.toFixed(2)})`,
        totalRecaudado: `$${total.toFixed(2)}`,
        ventasPorPlato,
      };
    });
  
    const totalRecaudado = tablaData.reduce(
      (sum, row) => sum + parseFloat(row.totalRecaudado.slice(1)),
      0
    );
  
    return { tablaData, totalRecaudado };
  };
  