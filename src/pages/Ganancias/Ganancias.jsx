// src/pages/ganancias/Ganancias.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import socketService from "../../services/socketService";
import { filtrarPedidos } from "./utils/filtrarPedidos.js";
import { procesarDatosPorDia } from "./utils/procesarDatosPorDia.js";
import {Grafico} from "./components/Grafico.jsx";
import {Tabla} from "./components/Tabla.jsx";

export const Ganancias = () => {
  const dispatch = useDispatch();
  const pedidos = useSelector((state) => state.pedidos);
  const [timeFrame, setTimeFrame] = useState("dia");
  const [graficoData, setGraficoData] = useState({});
  const [tablaData, setTablaData] = useState([]);
  const [totalRecaudado, setTotalRecaudado] = useState(0);
  const [platosVendidosDia, setPlatosVendidosDia] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");

  useEffect(() => {
    socketService.connect();
    socketService.sincronizarPedidos(dispatch);
    return () => {
      socketService.limpiarPedidos();
      socketService.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    const pedidosFiltrados = filtrarPedidos(pedidos, timeFrame);
    const { tablaData, totalRecaudado } = procesarDatosPorDia(pedidosFiltrados);
    setTablaData(tablaData);
    setGraficoData({
      labels: tablaData.map((row) => row.fecha),
      datasets: [
        {
          data: tablaData.map((row) => parseFloat(row.totalRecaudado.slice(1))),
          backgroundColor: [
            "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
          ],
        },
      ],
    });
    setTotalRecaudado(totalRecaudado);
  }, [pedidos, timeFrame]);
  const manejarFilaClick = (fecha) => {
    const filaSeleccionada = tablaData.find((row) => row.fecha === fecha);
    setFechaSeleccionada(fecha);
    const platosVendidos = Object.entries(filaSeleccionada.ventasPorPlato).map(([plato, { cantidad }]) => ({
      nombre: plato,
      cantidad,
    }));
    setPlatosVendidosDia(platosVendidos);
    setGraficoData({
      labels: platosVendidos.map((plato) => plato.nombre),
      datasets: [
        {
          data: platosVendidos.map((plato) => plato.cantidad),
          backgroundColor: [
            "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
          ],
        },
      ],
    });
  };

  return (
    <div className="gananciasPage">
      <div className="opcionesButtons">
        <button onClick={() => setTimeFrame("dia")}>Ganancias del Día</button>
        <button onClick={() => setTimeFrame("semana")}>Ganancias de la Semana</button>
        <button onClick={() => setTimeFrame("mes")}>Ganancias del Mes</button>
        <button onClick={() => setTimeFrame("año")}>Ganancias del Año</button>
      </div>
      {Object.keys(graficoData).length > 0 && (
        <div className="containerPie">
          <Grafico data={graficoData} />
        </div>
      )}
      <div className="data">
        <h4>Total recaudado ({timeFrame}): ${totalRecaudado.toFixed(2)}</h4>
        <Tabla tablaData={tablaData} manejarFilaClick={manejarFilaClick} timeFrame={timeFrame} />
      </div>
    </div>
  );
};
