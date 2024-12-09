import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Mesera } from "./pages/Mesera/Mesera";
import { Cocina } from "./pages/Cocina";
import { Ganancias } from "./pages/Ganancias/Ganancias";
import { NavBar } from "./pages/NavBar";
import { Footer } from "./pages/Footer";
import { Calculos } from "./pages/Calculos/Calculos";
import { Ventas } from "./pages/Ventas/Ventas";
import { Login } from "./pages/Cliente/Login";
import { Menu } from "./pages/Menu/Menu";

// Componente de ruta protegida
const ProtectedRoute = ({ children }) => {
  const clienteId = localStorage.getItem("clienteId");
  const clienteEmail = localStorage.getItem("clienteEmail");

  // Si no hay clienteId ni clienteEmail, redirige al login
  if (!clienteId || !clienteEmail) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const location = useLocation();
  
  // Obtener clienteId y clienteEmail desde localStorage
  const clienteId = localStorage.getItem("clienteId");
  const clienteEmail = localStorage.getItem("clienteEmail");

  return (
    <div>
      {/* Mostrar NavBar y Footer solo si no estás en la página de login ni en /ver-menu */}
      {location.pathname !== "/login" && location.pathname !== "/ver-menu" && location.pathname !== "/" && <NavBar />}
      
      <Routes>
        {/* Rutas protegidas */}
        <Route path="/estadisticas" element={
          <ProtectedRoute>
            <Ganancias />
          </ProtectedRoute>
        } />
        <Route path="/mesera" element={
          <ProtectedRoute>
            <Mesera />
          </ProtectedRoute>
        } />
        <Route path="/cocina" element={
          <ProtectedRoute>
            <Cocina />
          </ProtectedRoute>
        } />
        <Route path="/calculos" element={
          <ProtectedRoute>
            <Calculos />
          </ProtectedRoute>
        } />
        <Route path="/ventas" element={
          <ProtectedRoute>
            <Ventas />
          </ProtectedRoute>
        } />

        {/* Ruta principal con protección */}
        <Route path="/" element={clienteId && clienteEmail ? <Menu /> : <Navigate to="/login" />} />
        
        {/* Ruta de login */}
        <Route path="/login" element={clienteId && clienteEmail ? <Navigate to="/" /> : <Login />} />

        {/* Ruta para ver el menú sin necesidad de estar logueado */}
        <Route path="/ver-menu" element={<Menu />} />
      </Routes>

      {/* Mostrar Footer solo si no estás en la página de login ni en /ver-menu */}
      {location.pathname !== "/login" && location.pathname !== "/ver-menu" && location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default App;
