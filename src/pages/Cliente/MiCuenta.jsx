import axios from "axios";
import React, { useEffect, useState } from "react";
import TupperIcon from "../../assets/iconsCuentaPage/iconTupper.svg?react";
import MenuIcon from "../../assets/iconsCuentaPage/iconMenu.svg?react";
import HistorialIcon from "../../assets/iconsCuentaPage/historialIcon.svg?react";
import UserIcon from "../../assets/iconsCuentaPage/userIcon2.svg?react";
import PrevIcon from "../../assets/iconsCuentaPage/prevIcon.svg?react";
import NextIcon from "../../assets/iconsCuentaPage/nextIcon.svg?react";
import { Link } from "react-router-dom";
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
                <h3 className="name">
                  Bienvenido <span>{userData.nombre}</span>{" "}
                </h3>
              </div>
            ) : (
              <p className="loader">Cargando datos del usuario...</p>
            )}
          </div>
        </div>
        <div className="contenedorBox">
          <Link to={"/ver-menu"} className="col-3">
            <div className="box">
              <MenuIcon />
            </div>
            <p>Menú</p>
          </Link>
          <Link className="col-3">
            <div className="box">
              <TupperIcon />
            </div>
            <p>Pedidos</p>
          </Link>

          <Link className="col-3">
            <div className="box">
              <HistorialIcon />
            </div>
            <p>Historial</p>
          </Link>
          <Link className="col-3">
            <div className="box">
              <UserIcon />
            </div>
            <p>Mi cuenta</p>
          </Link>
        </div>
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-pause="false"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="col-12 box-ad menu">
                <div className="content">
                  <h4>¿Te da hambre?</h4>
                  <p>Mira lo que tenemos para ti.</p>
                  <Link to={"/ver-menu"}>Ver menú</Link>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="col-12 box-ad pedidos">
                <div className="content">
                  <h4>Gestión de pedidos</h4>
                  <p>
                    Consulta el estado de tus pedidos actuales y asegúrate de
                    que todo esté en orden.
                  </p>
                  <Link to={"/ver-menu"}>Ver pedidos</Link>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="col-12 box-ad registro">
                <div className="content">
                  <h4>Registro de órdenes anteriores</h4>
                  <p>
                    Accede a un historial detallado de tus pedidos realizados,
                    incluyendo fechas y montos totales.
                  </p>
                  <Link to={"/ver-menu"}>Ver registro</Link>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="col-12 box-ad cuenta">
                <div className="content">
                  <h4>Configuración de tu cuenta</h4>
                  <p>
                    Administra tu información personal y preferencias de usuario
                    para mejorar tu experiencia.
                  </p>
                  <Link to={"/ver-menu"}>Ver mi cuenta</Link>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span className="carousel-control" aria-hidden="true">
              <PrevIcon />
            </span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span className="carousel-control" aria-hidden="true">
              <NextIcon />
            </span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};
