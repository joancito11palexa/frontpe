import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
<<<<<<< HEAD
import "bootstrap/dist/js/bootstrap.bundle.js";

import  './css/custom.min.css'
=======
import * as bootstrap from 'bootstrap';
import  './css/custom.min.css';
>>>>>>> 8dff8d6507eb722e7f54f82d54f0e2b2e8838af1
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
