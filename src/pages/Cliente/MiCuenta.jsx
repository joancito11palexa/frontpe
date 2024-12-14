import axios from "axios";
import React, { useEffect, useState } from "react";

export const MiCuenta = () => {
  const [userData, setUserData] = useState(null); // Estado para almacenar datos del usuario
  const idUser = localStorage.getItem("clienteId");

  useEffect(() => {
    const getUser = async () => {
      if (!idUser) {
        console.error("El ID de usuario no está disponible.");
        return;
      }

      try {
        const response = await axios.get(
          `https://socketserver-u5si.onrender.com/api/clientes/${idUser}`
        );
        setUserData(response.data); // Actualizamos el estado con los datos del usuario
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    getUser();
  }, [idUser]);

  return (
    <div className="miCuentaPage">
      <div className="row justify-content-center align-items-center g-2">
        <div className="col-12">
          <div className="perfilData">
            {userData ? (
              <div>
                <h3 className="name">Bienvenido, {userData.nombre}</h3>
                <p className="email">Email: {userData.email}</p>
                <p className="telefono">
                  Teléfono: {userData.telefono || "No proporcionado"}
                </p>
              </div>
            ) : (
              <p className="loader">Cargando datos del usuario...</p>
            )}
          </div>
        </div>
        <div className="contenedorBox">
          <div className="col-4">
            <div className="box">Ver mis pedidos</div>
          </div>
          <div className="col-4">
            <div className="box">Ver el menú</div>
          </div>
          <div className="col-4">
            <div className="box">Historial</div>
          </div>
        </div>
        <div className="col-12">
          <button onClick={() => {
            localStorage.removeItem("clienteId")
            localStorage.removeItem("clienteEmail")
          }}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};
