import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; 
import rootReducer from '../reducers/rootReducer.js'; 

// Crea el store con el middleware thunk
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

