import { SET_PEDIDOS, ADD_PEDIDO, REMOVE_PEDIDO, UPDATE_PEDIDO_ESTADO } from '../actions/pedidosActions.js';

const initialState = [];

const pedidosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PEDIDOS:
      return action.payload; // Reemplaza la lista actual de pedidos con los nuevos datos

    case ADD_PEDIDO:
      return [...state, action.payload]; // Añade un nuevo pedido a la lista

    case REMOVE_PEDIDO:
      return state.filter((pedido) => pedido.id !== action.payload); // Filtra el pedido por ID

    case UPDATE_PEDIDO_ESTADO:
      return state.map((pedido) =>
        pedido.id === action.payload.pedidoId
          ? { ...pedido, estado: action.payload.estado }
          : pedido
      ); 

    default:
      return state; // Devuelve el estado actual si no se reconoce la acción
  }
};

export default pedidosReducer;
