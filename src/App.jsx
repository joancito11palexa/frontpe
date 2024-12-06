import React from "react";
import { Routes, Route } from "react-router-dom";
import { Mesera } from "./pages/Mesera/Mesera";
import { Cocina } from "./pages/Cocina";
import { Ganancias } from "./pages/Ganancias/Ganancias";
import { NavBar } from "./pages/NavBar";
import { Footer } from "./pages/Footer";
import { Calculos } from "./pages/Calculos/Calculos";
function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/estadisticas" element={<Ganancias />} />
        <Route path="/" element={<Mesera />} />
        <Route path="/cocina" element={<Cocina />} />
        <Route path="/calculos" element={<Calculos />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
