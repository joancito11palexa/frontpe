import { combineReducers } from 'redux';
import pedidosReducer from "../reducers/pedidosReducer.js";
import platosReducer from "../reducers/platosReducer.js"; 

// Combina todos los reducers en uno solo
const rootReducer = combineReducers({
  pedidos: pedidosReducer,
  platos : platosReducer
});

export default rootReducer;
