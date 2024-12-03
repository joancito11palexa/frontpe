import { SET_PLATOS, ADD_PLATO, REMOVE_PLATO, UPDATE_PLATO } from '../actions/platosActions.js';

const initialState = [];

const platosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLATOS:
      return action.payload; // Reemplaza el estado de platos con los datos recibidos

    case ADD_PLATO:
      return [...state, action.payload]; // Añade un nuevo plato a la lista

    case REMOVE_PLATO:
      return state.filter((plato) => plato.id !== action.payload); // Elimina un plato por ID

    case UPDATE_PLATO:
      return state.map((plato) =>
        plato.id === action.payload.id
          ? { ...plato, ...action.payload } // Actualiza el plato con el nuevo valor
          : plato
      );

    default:
      return state; // Devuelve el estado actual si no se reconoce la acción
  }
};

export default platosReducer;
