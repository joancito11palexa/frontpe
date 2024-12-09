import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  removePedido,
  updatePedidoEstado,
} from "../../redux/actions/pedidosActions";
import socketService from "../../services/socketService";
import { PlatoButton } from "./components/PlatoButton";
import { PedidoForm } from "./components/PedidoForm";
import { PedidoList } from "./components/PedidoList";
import { usePedidoActual } from "./hooks/usePedidoActual";

export const Mesera = () => {
  const dispatch = useDispatch();
  const platos = useSelector((state) => state.platos);
  const pedidos = useSelector((state) => state.pedidos);

  const { pedidoActual, agregarAlPedido, resetPedido } = usePedidoActual();

  useEffect(() => {
    socketService.connect();
    socketService.sincronizarPedidos(dispatch);
    socketService.sincronizarPlatos(dispatch);

    return () => {
      socketService.limpiarPedidos();
      socketService.limpiarPlatos();
      socketService.disconnect();
    };
  }, [dispatch]);

  const enviarPedido = () => {
    const { principales, entradas, total } = pedidoActual;
    const descripcion = {
      clienteId: 2004, // Agregar el ID del cliente por defecto
      platoPrincipal: principales.map((p) => ({
        nombre: p.nombre,
        cantidad: p.cantidad,
        precio: p.precio,
      })),
      entradas: entradas.map((e) => ({
        nombre: e.nombre,
        cantidad: e.cantidad,
        precio: e.precio,
      })),
    };
  
    socketService.emit("nuevo-pedido", descripcion); // Enviar la descripción con el ID del cliente
    resetPedido();
  };
  

  const handleMarcarEntregado = (pedidoId) =>
    dispatch(updatePedidoEstado(pedidoId));
  const handleEliminarPedido = (pedidoId) => dispatch(removePedido(pedidoId));

  return (
    <div className="MeseraPage">
      <h3>Menú</h3>
      <div className="platos-buttons ">
        {platos.length > 0 ? (
          <div className="row g-2 container-menu">
            <div className="col-6 padding">
              <div className=" box">
                <h3>Entradas</h3>
                {platos
                  .filter((p) => p.tipo === "entrada")
                  .map((plato) => (
                    <PlatoButton
                      key={plato.id}
                      plato={plato}
                      agregarAlPedido={agregarAlPedido}
                    />
                  ))}
              </div>
            </div>

            <div className="col-6 padding">
              <div className=" box">
                <h3>Principales</h3>
                {platos
                  .filter((p) => p.tipo === "platoPrincipal")
                  .map((plato) => (
                    <PlatoButton
                      key={plato.id}
                      plato={plato}
                      agregarAlPedido={agregarAlPedido}
                    />
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <p>No hay platos disponibles</p>
        )}
      </div>

      <h3>Resumen del pedido</h3>
      <PedidoForm pedidoActual={pedidoActual} enviarPedido={enviarPedido} />
      <h3>Pedidos en cola</h3>
      <PedidoList
        pedidos={pedidos}
        marcarEntregado={handleMarcarEntregado}
        eliminarPedido={handleEliminarPedido}
      />
    </div>
  );
};
