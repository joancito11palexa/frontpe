import React, { useRef } from "react";
import { Link } from "react-router-dom"; // Importar Link para las rutas
import BtnBarIcon from './../assets/btnBar.svg?react';

export const NavBar = () => {
  const offcanvasRef = useRef(null);

  const closeOffcanvas = () => {
    const bootstrapOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
    bootstrapOffcanvas.hide();
  };

  return (
    <div className="navBarComponent">
      <button
        className="btn botonParaAbrir"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#navBarComponent"
        aria-controls="navBarComponent"
      >
        <BtnBarIcon />
      </button>

      <div
        className="offcanvas offcanvas-start"
        data-bs-backdrop="static"
        tabIndex="-1"
        id="navBarComponent"
        aria-labelledby="navBarComponentLabel"
        ref={offcanvasRef} // Asignar la referencia
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="navBarComponentLabel">
            Navegación
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul>
            <li>
              <Link to="/mesera" className="btn btn-link" onClick={closeOffcanvas}>
                Mesera
              </Link>
            </li>
            <li>
              <Link to="/cocina" className="btn btn-link" onClick={closeOffcanvas}>
                Cocina
              </Link>
            </li>
            <li>
              <Link to="/estadisticas" className="btn btn-link" onClick={closeOffcanvas}>
                Estadísticas
              </Link>
            </li>
            <li>
              <Link to="/ventas" className="btn btn-link" onClick={closeOffcanvas}>
                Ventas
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
