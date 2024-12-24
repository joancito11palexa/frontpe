import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socketService from "../../services/socketService";
import Food1Icon from "../../assets/food1Icon.svg?react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import loading1 from "../../assets/gifs/loading1.gif";
import MenuIcon1 from "../../assets/menuIcon1.svg?react";
import UserIcon1 from "../../assets/userIcon1.svg?react";

export const SoloMenu = () => {
  const dispatch = useDispatch();
  const platos = useSelector((state) => state.platos.platos);
  const mensaje = useSelector((state) => state.platos.mensaje);
  const [fechaHoy, setFechaHoy] = useState("");

  useEffect(() => {

    const obtenerFechaHoy = () => {
      const fecha = new Date();
      setFechaHoy(format(fecha, "EEEE dd 'de' MMMM", { locale: es }));
    };
    obtenerFechaHoy();
    socketService.connect();
    socketService.sincronizarPlatos(dispatch);

    return () => {
      socketService.limpiarPlatos();
      socketService.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="clienteMenuPage">
      <button
        className="cuentaBtn"
        onClick={() => (window.location.href = "/login")}
      >
        <UserIcon1 />
      </button>
      <div className="encabezado">
        <h3>Menú</h3>
        <p className="fecha">{fechaHoy}</p>
      </div>

      <Food1Icon className="iconFood1" />
      <div className="platos-list">
        {platos.length === 0 ? (
          <div className="loader">
            {mensaje !== null ? (
              <>
                Aun no se registran platos en el menú de hoy
                <MenuIcon1 />
              </>
            ) : (
              <>
                <img src={loading1} alt="" />
                <p>Cargando. . .</p>
              </>
            )}
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
