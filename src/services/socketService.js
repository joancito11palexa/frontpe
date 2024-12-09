import { io } from "socket.io-client";
import { setPedidos } from "../redux/actions/pedidosActions";
import { setPlatos } from "../redux/actions/platosActions";

// Instancia del socket
const socket = io("localhost:4000");

const socketService = {
  connect: () => {
    socket.connect();
  },
  disconnect: () => {
    socket.disconnect();
  },
  on: (event, callback) => {
    socket.on(event, callback);
  },
  off: (event) => {
    socket.off(event);
  },
  emit: (event, data) => {
    socket.emit(event, data);
  },

  // Sincronización específica para pedidos
  sincronizarPedidos: (dispatch) => {
    socket.emit("solicitar-pedidos");

    socket.on("pedidos-actualizados", (data) => {
      dispatch(setPedidos(data));
    });
  },

  // Sincronización específica para platos
  sincronizarPlatos: (dispatch) => {
    socket.emit("solicitar-platos");

    socket.on("platos-actualizados", (data) => {
      dispatch(setPlatos(data));
    });
  },

  // Limpieza de eventos relacionados con pedidos
  limpiarPedidos: () => {
    socket.off("pedidos-actualizados");
  },

  // Limpieza de eventos relacionados con platos
  limpiarPlatos: () => {
    socket.off("platos-actualizados");
  },
};

export default socketService;
