import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socketService from "../../services/socketService";
import Food1Icon from "../../assets/food1Icon.svg?react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const Menu = () => {
  const dispatch = useDispatch();
  const platos = useSelector((state) => state.platos);
  const [fechaHoy, setFechaHoy] = useState("");

  useEffect(() => {
    // Obtener fecha actual en formato "Lunes 12 de noviembre"
    const obtenerFechaHoy = () => {
      const fecha = new Date();
      setFechaHoy(format(fecha, "EEEE dd 'de' MMMM", { locale: es }));
    };

    obtenerFechaHoy();

    // Conexión al servidor para sincronizar los platos
    socketService.connect();
    socketService.sincronizarPlatos(dispatch);

    return () => {
      socketService.limpiarPlatos();
      socketService.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="clientePage">
      <button
        className="cuentaBtn"
        onClick={() => (window.location.href = "/login")}
      >
        Cuenta
      </button>
      <div className="encabezado">
        <h3>Menú</h3>
        <p className="fecha">{fechaHoy}</p>
      </div>

      <Food1Icon className="iconFood1" />
      <div className="platos-list">
        {platos.length === 0 ? (
          <div className="skeleton-loader">
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
          </div>
        ) : (
          <div>
            {/* Entradas */}
            <h4>Entradas</h4>
            <div className="platos-section">
              {platos
                .filter((plato) => plato.tipo === "entrada")
                .map((plato) => (
                  <div key={plato.id} className="plato-item">
                    <div className="row justify-content-center align-items-center g-2">
                      <div className="col-8">
                        <p>{plato.nombre}</p>
                      </div>
                      <div className="col-4">
                        <p>S/{plato.precio}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <h4>Principales</h4>
            <div className="platos-section">
              {platos
                .filter((plato) => plato.tipo === "platoPrincipal")
                .map((plato) => (
                  <div key={plato.id} className="plato-item">
                    <div className="row justify-content-center align-items-center g-2">
                      <div className="col-8">
                        <p>{plato.nombre}</p>
                      </div>
                      <div className="col-4">
                        <p>S/{plato.precio}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};