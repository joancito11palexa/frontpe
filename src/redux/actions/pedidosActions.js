// pedidosActions.js
import socket from '../../services/socketService.js';  // Asegúrate de importar correctamente tu servicio de socket

export const SET_PEDIDOS = "SET_PEDIDOS";
export const ADD_PEDIDO = "ADD_PEDIDO";
export const REMOVE_PEDIDO = "REMOVE_PEDIDO";
export const UPDATE_PEDIDO_ESTADO = "UPDATE_PEDIDO_ESTADO";

// Action creators
export const setPedidos = (pedidos) => ({
  type: SET_PEDIDOS,
  payload: pedidos,
});

export const addPedido = (pedido) => ({
  type: ADD_PEDIDO,
  payload: pedido,
});

export const removePedido = (pedidoId) => {
  return (dispatch) => {
    // Emitir el evento al backend para eliminar el pedido
    socket.emit("eliminar-pedido", pedidoId);

    // Opcional: puedes despachar una acción para actualizar el estado local antes de recibir la respuesta del servidor
    // dispatch({
    //   type: REMOVE_PEDIDO,
    //   payload: pedidoId,
    // });
  };
};

// Acción asíncrona para emitir el socket y actualizar el estado
export const updatePedidoEstado = (pedidoId) => {
  return (dispatch) => {
    // Emitir el evento al backend para marcar como entregado
    socket.emit("marcar-entregado", pedidoId);

    // Después de emitir, despachamos la acción para actualizar el estado local en Redux
    dispatch({
      type: UPDATE_PEDIDO_ESTADO,
      payload: { pedidoId },
    });
  };
};
