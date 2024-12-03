export const SET_PLATOS = "SET_PLATOS";
export const ADD_PLATO = "ADD_PLATO";
export const REMOVE_PLATO = "REMOVE_PLATO";
export const UPDATE_PLATO = "UPDATE_PLATO";

// Action creators
export const setPlatos = (platos) => ({
  type: SET_PLATOS,
  payload: platos,
});

export const addPlato = (plato) => ({
  type: ADD_PLATO,
  payload: plato,
});

export const removePlato = (platoId) => ({
  type: REMOVE_PLATO,
  payload: platoId,
});

export const updatePlato = (plato) => ({
  type: UPDATE_PLATO,
  payload: plato,
});
