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



  return (
    <div className="loginPage">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center">Login</h2>

                <button className="botonn btn-auth" onClick={handleAuth0Login}>
                  Iniciar sesión o registrarse
                </button>
                <button
                  className="botonn btn-menu"
                  onClick={() => navigate("/")}
                >
                  Ver menú
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAuthenticated && (
        <div className="redirect-text">
          <p>Redirigiendo...</p>
        </div>
      )}
    </div>
  );
};
