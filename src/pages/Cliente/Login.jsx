import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const Login = () => {
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
    const sincronizarConServidor = async () => {
      if (isAuthenticated && user) {
        console.log("Usuario autenticado:", user);
        try {
          const token = await getAccessTokenSilently();
          const response = await axios.post(
            "http://localhost:4000/api/clientes/auth0",
            {
              auth0Id: user.sub,
              email: user.email,
              name: user.name,
              isA: user.esAdministrador,
              nickname: user.nickname,
              picture: user.picture,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, // Incluir el token de autorización
              },
            }
          );

          console.log("Respuesta del servidor:", response.data);
          localStorage.setItem("clienteId", response.data.id);
          localStorage.setItem("clienteName", response.data.nombre);
          localStorage.setItem("clienteEmail", response.data.email);
          localStorage.setItem("picture", response.data.picture);
          localStorage.setItem(
            "isAdmin",
            response.data.esAdministrador ? "true" : "false"
          );

          // Redirigir al usuario
          navigate("/mi-cuenta");
        } catch (error) {
          console.error("Error al sincronizar con el servidor:", error);
        }
      }
    };

    sincronizarConServidor();
  }, [isAuthenticated, user, navigate, getAccessTokenSilently]);

  const handleAuth0Login = async () => {
    if (!isAuthenticated) {
      console.log("Usuario no autenticado, redirigiendo...");
      loginWithRedirect();
    }
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
            <button className="btn-menu" onClick={() => navigate("/")}>
              Solo ver menú
            </button>

            <div className="card">
              <div className="card-body">
                <h2 className="text-center">Login</h2>

                <button
                  className="btn btn-primary w-100 mb-3"
                  onClick={handleAuth0Login}
                >
                  Iniciar sesión con Auth0
                </button>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
