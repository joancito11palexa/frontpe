import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  // Guardar datos del usuario autenticado con Auth0
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User:", user); // Log del usuario
      // Verificar que los datos del usuario estén presentes antes de almacenarlos
      if (user?.sub && user?.email) {
        localStorage.setItem("clienteId", user.sub);
        localStorage.setItem("clienteEmail", user.email);
        localStorage.setItem("isA", user.isAdmin ? "true" : "false");
        // Verifica que los datos se guardaron correctamente
        console.log("Datos guardados en localStorage:", {
          clienteId: localStorage.getItem("clienteId"),
          clienteEmail: localStorage.getItem("clienteEmail"),
          isAdmin: localStorage.getItem("isA"),
        });
        // Redirigir a la página deseada después de guardar los datos
        navigate("/mi-cuenta");
      } else {
        console.error("Error: los datos del usuario no están completos.");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleAuth0Login = async () => {
    if (!isAuthenticated) {
      console.log("Usuario no autenticado, redirigiendo...");
      loginWithRedirect();
      return;
    }
    if (user) {
      localStorage.setItem("clienteId", user?.sub);
      localStorage.setItem("clienteEmail", user?.email);
      localStorage.setItem("isA", user?.isAdmin);

      // Verificamos que los datos se guardaron correctamente
      console.log("Datos guardados en localStorage:", {
        clienteId: localStorage.getItem("clienteId"),
        clienteEmail: localStorage.getItem("clienteEmail"),
        isAdmin: localStorage.getItem("isA"),
      });
    }

    // Redirigir a la página deseada
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
