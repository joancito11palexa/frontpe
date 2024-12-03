import React, { useEffect, useState } from "react";

// Función para obtener la semana de una fecha (semanas dentro de un mes)
const getSemanaDelMes = (fecha) => {
  const primerDiaDelMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
  const diaDelMes = fecha.getDate();
  const semanaDelMes = Math.ceil((diaDelMes + primerDiaDelMes.getDay()) / 7);
  return semanaDelMes;
};

// Función para parsear la fecha desde 'dd/mm/yyyy' a un objeto Date
const parseFecha = (fechaString) => {
  const [dia, mes, año] = fechaString.split('/');
  return new Date(año, mes - 1, dia); // Mes es 0-indexado
};
  
export const Tabla = ({ tablaData, manejarFilaClick, timeFrame }) => {
  // Estado para manejar la selección de semana o mes
  const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);

  // Efecto para imprimir los datos y el timeFrame
  useEffect(() => {
    console.log(tablaData, timeFrame);
  }, [tablaData, timeFrame]);

  // Filtrar los datos según la selección de la semana dentro de un mes
  const filtrarPorSemana = (semana, mes) => {
    const datosFiltrados = tablaData.filter((row) => {
      const fecha = parseFecha(row.fecha);
      // Filtrar por mes primero y luego por semana dentro de ese mes
      const mesDeLaFecha = fecha.getMonth();
      const semanaDelMes = getSemanaDelMes(fecha);
      return mesDeLaFecha === mes && semanaDelMes === semana;
    });
    return datosFiltrados;
  };

  // Filtrar los datos según el mes dentro de un año
  const filtrarPorMes = (mes) => {
    const datosFiltrados = tablaData.filter((row) => {
      const fecha = parseFecha(row.fecha);
      return fecha.getMonth() === mes;
    });
    return datosFiltrados;
  };

  // Función para manejar los botones de filtrado por semana o mes
  const manejarFiltro = (tipo) => {
    setFiltroSeleccionado(tipo);
  };

  // Función para renderizar los botones de filtrado
  const renderFiltros = () => {
    if (timeFrame === "mes") {
      // Si es mes, mostramos los botones de semana
      const semanas = [1, 2, 3, 4]; // Asumimos que hay 4 semanas en un mes
      return (
        <div>
          {semanas.map((semana) => (
            <button key={semana} onClick={() => setFiltroSeleccionado(semana)}>
              Semana {semana}
            </button>
          ))}
        </div>
      );
    } else if (timeFrame === "año") {
      // Si es año, mostramos los botones de meses
      const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      return (
        <div>
          {meses.map((mes, index) => (
            <button key={mes} onClick={() => setFiltroSeleccionado(index)}>
              {mes}
            </button>
          ))}
        </div>
      );
    }
    return null;
  };

  // Aplicar el filtro a los datos según la selección del filtro
  const obtenerDatosFiltrados = () => {
    if (filtroSeleccionado !== null) {
      if (timeFrame === "mes") {
        // Si estamos filtrando por semana dentro de un mes, obtenemos el mes correctamente.
        const fechaPrimeraFila = parseFecha(tablaData[0].fecha);
        const mesSeleccionado = fechaPrimeraFila.getMonth();
        console.log("Filtro por semana:", filtroSeleccionado);
        
        return filtrarPorSemana(filtroSeleccionado, mesSeleccionado);
      } else if (timeFrame === "año") {
        return filtrarPorMes(filtroSeleccionado);
      }
    }
    return tablaData; // Si no hay filtro seleccionado, mostrar todos los datos
  };

  // Ordenar los datos por semana dentro del mes
  const ordenarPorSemanaDelMes = (data) => {
    return data.sort((a, b) => {
      const fechaA = parseFecha(a.fecha);
      const fechaB = parseFecha(b.fecha);
      const semanaA = getSemanaDelMes(fechaA);
      const semanaB = getSemanaDelMes(fechaB);
      return semanaA - semanaB; // Orden ascendente por semana
    });
  };

  // Obtenemos los datos filtrados y ordenados
  const datosAMostrar = ordenarPorSemanaDelMes(obtenerDatosFiltrados());

  return (
    <div>
      {renderFiltros()}
      <table className="sales-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Platos Vendidos</th>
            <th>Plato Más Vendido</th>
            <th>Plato Menos Vendido</th>
            <th>Total Recaudado</th>
          </tr>
        </thead>
        <tbody>
          {datosAMostrar.map((row, index) => (
            <tr key={index} onClick={() => manejarFilaClick(row.fecha)}>
              <td>{row.fecha}</td>
              <td>{row.platosVendidos}</td>
              <td>{row.platoMasVendido}</td>
              <td>{row.platoMenosVendido}</td>
              <td>{row.totalRecaudado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
