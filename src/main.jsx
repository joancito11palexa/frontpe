import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";

import "./css/custom.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.esm.js"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import * as bootstrap from "bootstrap";
import App from "./App.jsx";
import Auth0ProviderWithHistory from "./Auth0ProviderWithHistory.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </StrictMode>
);
