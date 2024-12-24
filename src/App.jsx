import React from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Mesera } from "./pages/Mesera/Mesera";
import { Cocina } from "./pages/Cocina/Cocina";
import { Ganancias } from "./pages/Ganancias/Ganancias";
import { NavBar } from "./pages/NavBar";
import { Footer } from "./pages/Footer";
import { Calculos } from "./pages/Calculos/Calculos";
import { Ventas } from "./pages/Ventas/Ventas";
import { Login } from "./pages/Cliente/Login";
import { Menu } from "./pages/Menu/Menu";
import { SoloMenu } from "./pages/Menu/SoloMenu";
import { NavBarClient } from "./pages/Cliente/NavBarClient";
import { NotFound } from "./pages/NotFound";
import { MiCuenta } from "./pages/Cliente/MiCuenta";
import { MisPedidos } from "./pages/Cliente/MisPedidos";
import { LoaderPage } from "./pages/LoaderPage/LoaderPage";
import { ClienteCuenta } from "./pages/Cliente/ClienteCuenta";
import { Historial } from "./pages/Cliente/Historial";
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

const ProtectedRouteAdmin = ({ children }) => {
  const clienteId = localStorage.getItem("clienteId");
  const clienteEmail = localStorage.getItem("clienteEmail");
  const isAdmin = localStorage.getItem("isAdmin");

  if (!clienteId || !clienteEmail || isAdmin !== "true") {
    return <Navigate to="/*" />; // Replace '/not-found' with your actual NotFound route
  }

  return children;
};

function App() {
  const location = useLocation();

  // Obtener clienteId y clienteEmail desde localStorage
  const clienteId = localStorage.getItem("clienteId");
  const clienteEmail = localStorage.getItem("clienteEmail");
  const isAdmin = localStorage.getItem("isAdmin");

  const mostrarNavBar = () => {
    if (isAdmin === "true") {
      return <NavBar />;
    }
    return <NavBarClient />;
  };

  return (
    <div>
      {location.pathname !== "/login" &&
        location.pathname !== "/" &&
        mostrarNavBar()}

      <Routes>
        {/* Rutas protegidas */}
        <Route
          path="/ver-menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estadisticas"
          element={
            <ProtectedRouteAdmin>
              <Ganancias />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/mesera"
          element={
            <ProtectedRouteAdmin>
              <Mesera />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/cocina"
          element={
            <ProtectedRouteAdmin>
              <Cocina />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/calculos"
          element={
            <ProtectedRouteAdmin>
              <Calculos />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/ventas"
          element={
            <ProtectedRouteAdmin>
              <Ventas />
            </ProtectedRouteAdmin>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/mis-pedidos"
          element={
            clienteId && clienteEmail ? (
              <MisPedidos />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/historialPedidos"
          element={
            clienteId && clienteEmail ? <Historial /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/mi-cuenta"
          element={
            clienteId && clienteEmail ? <MiCuenta /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/cuenta-cliente"
          element={
            clienteId && clienteEmail ? (
              <ClienteCuenta />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/cliente-pedidos"
          element={
            clienteId && clienteEmail ? (
              <MisPedidos />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={
            clienteId && clienteEmail ? (
              <Navigate to="/mi-cuenta" />
            ) : (
              <SoloMenu />
            )
          }
        />
        <Route
          path="/login"
          element={
            clienteId && clienteEmail ? <Navigate to="/mi-cuenta" /> : <Login />
          }
        />
      </Routes>

      {/* Mostrar Footer solo si no estás en la página de login ni en /ver-menu */}
      {location.pathname !== "/login" &&
        location.pathname !== "/ver-menu" &&
        location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default App;
