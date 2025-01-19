import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const ClienteCuenta = () => {
  const { logout } = useAuth0();
  const [userData, setUserData] = useState({
    clienteId: "",
    clienteName: "",
    clienteEmail: "",
    picture: "",
  });

  useEffect(() => {
    // Cargar datos del localStorage al estado
    setUserData({
      clienteId: localStorage.getItem("clienteId") || "",
      clienteName: localStorage.getItem("clienteName") || "Usuario",
      clienteEmail: localStorage.getItem("clienteEmail") || "Sin correo",
      picture: localStorage.getItem("picture") || "",
    });
  }, []);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    localStorage.clear();
  };

  return (
    <div className="clienteCuentaPage">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body text-center">
          <h3 className="titulo" >{userData.clienteName}</h3>
          {userData.picture && (
            <img
              src={userData.picture}
              referrerPolicy="no-referrer"
              alt="Foto de perfil"
            />
          )}

          <p>{userData.clienteEmail}</p>

          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};
