import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");

  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();
  const navigate = useNavigate();

  // Guardar datos del usuario autenticado con Auth0
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User:", user); // Log del usuario
      localStorage.setItem("clienteId", user?.sub || "default_id");
      localStorage.setItem("clienteEmail", user?.email || "default_email");
      localStorage.setItem("isA", user?.isAdmin ? "true" : "false"); // Asumiendo que 'isAdmin' es un campo del usuario

      // Verifica si los datos se guardaron correctamente
      console.log("Datos guardados en localStorage:", {
        clienteId: localStorage.getItem("clienteId"),
        clienteEmail: localStorage.getItem("clienteEmail"),
        isAdmin: localStorage.getItem("isA"),
      });
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const clienteId = localStorage.getItem("clienteId");
    const clienteEmail = localStorage.getItem("clienteEmail");
    const isAdmin = localStorage.getItem("isAdmin");
    if (clienteId && clienteEmail && isAdmin) {
      navigate("/mesera");
    }
  }, [navigate]);
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(""); // Limpiar error al cambiar de formulario
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:4000/api/clientes", {
        email,
        password,
      });

      localStorage.setItem("clienteId", response.data.id);
      localStorage.setItem("clienteEmail", response.data.email);
      localStorage.setItem("isA", response.data.esAdministrador);
      navigate("/mi-cuenta");
    } catch (error) {
      console.error("Error durante el login", error);
      setError(
        "Error en el login: credenciales incorrectas o servidor no disponible."
      );
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Formato de email no válido.");
      return;
    }

    try {
      const response = await axios.post(
        "https://socketserver-u5si.onrender.com/api/clientes/",
        {
          nombre,
          email,
          password,
        }
      );

      localStorage.setItem("clienteId", response.data.id);
      localStorage.setItem("clienteEmail", response.data.email);
      navigate("/mesera");
    } catch (error) {
      console.error("Error durante el registro", error);
      setError(
        "Error en el registro: usuario ya registrado o servidor no disponible."
      );
    }
  };

  const goToMenu = () => {
    navigate("/");
  };

  const handleAuth0Login = async () => {
    if (!isAuthenticated) {
      console.log("Usuario no autenticado, redirigiendo...");
      loginWithRedirect();
      return;
    }
  
    // Cuando el usuario esté autenticado, guardamos los datos en localStorage
    if (user) {
      localStorage.setItem("clienteId", user?.sub || "default_id");
      localStorage.setItem("clienteEmail", user?.email || "default_email");
      localStorage.setItem("isA", user?.isAdmin ? "true" : "false");
  
      // Verificamos que los datos se guardaron correctamente
      console.log("Datos guardados en localStorage:", {
        clienteId: localStorage.getItem("clienteId"),
        clienteEmail: localStorage.getItem("clienteEmail"),
        isAdmin: localStorage.getItem("isA"),
      });
    }
  
    // Redirigir a la página deseada (por ejemplo, /mi-cuenta)
    navigate("/mi-cuenta");
  };
  

  const handleAuth0Logout = () => {
    logout({ returnTo: window.location.origin });
    localStorage.clear(); // Limpiar datos del localStorage al cerrar sesión
  };

  return (
    <div className="loginPage">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <button className="btn-menu" onClick={goToMenu}>
              Solo ver menú
            </button>

            <div className="card">
              <div className="card-body">
                <h2 className="text-center">
                  {isLogin ? "Login" : "Crear Cuenta"}
                </h2>

                {error && <div className="alert alert-danger">{error}</div>}

                {isLogin ? (
                  <>
                    <button
                      className="btn btn-primary w-100 mb-3"
                      onClick={handleAuth0Login}
                    >
                      Iniciar sesión con Auth0
                    </button>

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
                  </>
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

                {isAuthenticated && (
                  <div className="mt-3">
                    <p>Bienvenido, {user?.name}</p>
                    <button
                      className="btn btn-danger w-100"
                      onClick={handleAuth0Logout}
                    >
                      Cerrar sesión
                    </button>
                  </div>
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
