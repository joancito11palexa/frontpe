import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socketService from "../../services/socketService";
import Food1Icon from "../../assets/food1Icon.svg?react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import loading1 from '../../assets/gifs/loading1.gif';


export const Menu = () => {
  const dispatch = useDispatch();
  const platos = useSelector((state) => state.platos.platos);
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
    <div className="clienteMenuPage">

      <div className="encabezado">
        <h3>Menú</h3>
        <p className="fecha">{fechaHoy}</p>
      </div>

      <Food1Icon className="iconFood1" />
      <div className="platos-list">
        {platos.length === 0 ? (
          <div className="loader">
            <img src={loading1} alt="" />
            <p>Cargando. . .</p>
          </div>
        ) : (
          <div>
            <h4>Entradas</h4>
            <div className="platos-section">
              {platos
                .filter((plato) => plato.tipo === "entrada")
                .map((plato) => (
                  <div key={plato.id} className="plato-item">
                    <div className="row justify-content-center align-items-center g-2">
                      <div className="col-7">
                        <p>{plato.nombre}</p>
                      </div>
                      <div className="col-3">
                        <p>S/{plato.precio}</p>
                      </div>
                      <div className="col-2">
                        <button>+</button>
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
                    <div className="col-7">
                        <p>{plato.nombre}</p>
                      </div>
                      <div className="col-3">
                        <p>S/{plato.precio}</p>
                      </div>
                      <div className="col-2">
                        <button>+</button>
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
