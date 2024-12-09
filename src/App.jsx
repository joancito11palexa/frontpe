import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Mesera } from "./pages/Mesera/Mesera";
import { Cocina } from "./pages/Cocina";
import { Ganancias } from "./pages/Ganancias/Ganancias";
import { NavBar } from "./pages/NavBar";
import { Footer } from "./pages/Footer";
import { Calculos } from "./pages/Calculos/Calculos";
import { Ventas } from "./pages/Ventas/Ventas";
import { Cliente } from "./pages/Cliente/Cliente";

function App() {
  const location = useLocation();

  return (
    <div>
      {/* Condicional para no renderizar el NavBar en /cliente */}
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/estadisticas" element={<Ganancias />} />
        <Route path="/mesera" element={<Mesera />} />
        <Route path="/cocina" element={<Cocina />} />
        <Route path="/calculos" element={<Calculos />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/" element={<Cliente />} />
      </Routes>
      
      {/* Condicional para no renderizar el Footer en /cliente */}
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default App;
