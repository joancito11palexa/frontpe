import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombre, setNombre] = useState("");

  const clienteId = localStorage.getItem("clienteId");
  const clienteEmail = localStorage.getItem("clienteEmail");

  useEffect(() => {
    // Si ya está autenticado, redirige automáticamente a mesera
    if (clienteId && clienteEmail) {
      return <Navigate to="/mesera" />;
    }
  }, [clienteId, clienteEmail]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://socketserver-u5si.onrender.com/api/login/", {
        email,
        password,
      });
      localStorage.setItem("clienteId", response.data.id);
      localStorage.setItem("clienteEmail", response.data.email);
      // Redirigir al usuario después de un login exitoso
      return <Navigate to="/mesera" />;
    } catch (error) {
      console.error("Error durante el login", error);
      alert("Error en el login");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await axios.post("https://socketserver-u5si.onrender.com/api/clientes/", {
        nombre,
        email,
        password,
      });
      localStorage.setItem("clienteId", response.data.id);
      localStorage.setItem("clienteEmail", response.data.email);
      // Redirigir al usuario después de un registro exitoso
      return <Navigate to="/mesera" />;
    } catch (error) {
      console.error("Error durante el registro", error);
      alert("Error en el registro");
    }
  };

  return (
    <div className="loginPage">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">

              <button className="btn-menu" onClick={() => (window.location.href = "/ver-menu")}>
                Solo ver menú
              </button>

            <div className="card">
              <div className="card-body">
                <h2 className="text-center">
                  {isLogin ? "Login" : "Crear Cuenta"}
                </h2>

                {isLogin ? (
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Iniciar sesión
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegister}>
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirmar Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                      Crear cuenta
                    </button>
                  </form>
                )}

                <div className="text-center mt-3">
                  <button className="btn btn-link" onClick={toggleForm}>
                    {isLogin
                      ? "¿No tienes una cuenta? Crear una cuenta"
                      : "¿Ya tienes cuenta? Iniciar sesión"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
