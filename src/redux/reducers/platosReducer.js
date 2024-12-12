import {
  SET_PLATOS,
  ADD_PLATO,
  REMOVE_PLATO,
  UPDATE_PLATO,
} from '../actions/platosActions.js';

const initialState = {
  platos: [],
  mensaje: null,
  cargando: false, // Nuevo estado para indicar si se está cargando
};

const platosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLATOS:
      return {
        platos: action.payload,
        mensaje: action.payload.length === 0 ? "Aún no se registran platos" : null,
      };
    case ADD_PLATO:
      return {
        platos: [...state.platos, action.payload],
        mensaje: null, // Elimina el mensaje al agregar un plato
      };
    case REMOVE_PLATO:
      return {
        platos: state.platos.filter((plato) => plato.id !== action.payload),
        mensaje: state.platos.length === 1 ? "Aún no se registran platos" : null, // Actualiza el mensaje solo si queda 1 plato
      };
    case UPDATE_PLATO:
      return {
        platos: state.platos.map((plato) =>
          plato.id === action.payload.id
            ? { ...plato, ...action.payload }
            : plato
        ),
        mensaje: null, // Elimina el mensaje al actualizar un plato
      };
    default:
      return state;
  }
};

export default platosReducer;