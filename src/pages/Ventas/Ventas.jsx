import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socketService from "../../services/socketService";
import { Card } from "./Components/Card.jsx";
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { es } from "date-fns/locale";
import CountUp from "react-countup";

export const Ventas = () => {
  const dispatch = useDispatch();
  const [totalGeneral, setTotalGeneral] = useState(0);
  const [selectedRange, setSelectedRange] = useState("dia");
  const [dateRange, setDateRange] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [filteredPedidos, setFilteredPedidos] = useState([]);

  const pedidoz = useSelector((state) => state.pedidos);
  const pedidos = pedidoz.filter((p) => p.estado === "entregado");

  const calcularTotalGeneral = (pedidosFiltrados) => {
    const total = pedidosFiltrados.reduce(
      (acc, pedido) =>
        acc +
        pedido.descripcion.platoPrincipal.reduce(
          (sum, plato) => sum + plato.cantidad * plato.precio,
          0
        ) +
        pedido.descripcion.entradas.reduce(
          (sum, entrada) => sum + entrada.cantidad * entrada.precio,
          0
        ),
      0
    );
    setTotalGeneral(total);
  };

  useEffect(() => {
    let pedidosFiltrados = pedidos;
    const today = new Date();

    switch (selectedRange) {
      case "dia":
        pedidosFiltrados = pedidos.filter((p) => {
          const pedidoDate = new Date(p.fecha);
          return (
            pedidoDate >= startOfDay(today) && pedidoDate <= endOfDay(today)
          );
        });
        setDateRange(`Hoy ${format(startOfDay(today), "EEEE dd 'de' MMMM yyyy", { locale: es })}`);
        break;

      case "semana":
        pedidosFiltrados = pedidos.filter((p) => {
          const pedidoDate = new Date(p.fecha);
          return (
            pedidoDate >= startOfWeek(today, { weekStartsOn: 1 }) &&
            pedidoDate <= endOfWeek(today, { weekStartsOn: 1 })
          );
        });
        setDateRange(`De ${format(startOfWeek(today, { weekStartsOn: 1 }), "EEEE dd 'de' MMMM yyyy", { locale: es })} a ${format(endOfWeek(today, { weekStartsOn: 1 }), "EEEE dd 'de' MMMM yyyy", { locale: es })}`);
        break;

      case "mes":
        if (selectedMonth !== null) {
          const startOfSelectedMonth = startOfMonth(new Date(today.getFullYear(), selectedMonth, 1));
          const endOfSelectedMonth = endOfMonth(startOfSelectedMonth);
          pedidosFiltrados = pedidos.filter((p) => {
            const pedidoDate = new Date(p.fecha);
            return pedidoDate >= startOfSelectedMonth && pedidoDate <= endOfSelectedMonth;
          });
          setDateRange(`De ${format(startOfSelectedMonth, "EEEE dd 'de' MMMM yyyy", { locale: es })} 
          a  ${format(endOfSelectedMonth, "EEEE dd 'de' MMMM yyyy", { locale: es })}`);
        }
        break;

      case "ano":
        pedidosFiltrados = pedidos.filter((p) => {
          const pedidoDate = new Date(p.fecha);
          return (
            pedidoDate >= startOfYear(today) && pedidoDate <= endOfYear(today)
          );
        });
        setDateRange(`De ${format(startOfYear(today), "EEEE dd 'de' MMMM yyyy", { locale: es })} a ${format(endOfYear(today), "EEEE dd 'de' MMMM yyyy", { locale: es })}`);
        break;

      default:
        break;
    }

    setFilteredPedidos(pedidosFiltrados);
    calcularTotalGeneral(pedidosFiltrados);
  }, [pedidoz, selectedRange, selectedMonth]);

  useEffect(() => {
    socketService.connect();
    socketService.sincronizarPedidos(dispatch);
    socketService.sincronizarPlatos(dispatch);

    return () => {
      socketService.limpiarPedidos();
      socketService.limpiarPlatos();
      socketService.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="ventasPage">
      <div className="encabezado">
        <h3>Ventas</h3>
        <div className="row justify-content-center align-items-center g-2">
          <div className="col-12 text-center">

            <div className="filtros">
              <button onClick={() => setSelectedRange("dia")} className="btn btn-outline-primary m-1">
                Día
              </button>
              <button onClick={() => { setSelectedRange("semana"); }} className="btn btn-outline-primary m-1">
                Semana
              </button>
              <div className="dropdown">
                <button className="btn btn-outline-primary dropdown-toggle m-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Mes
                </button>
                <ul className="dropdown-menu">
                  {Array.from({ length: 12 }, (_, index) => (
                    <li key={index}>
                      <a className="dropdown-item" onClick={() => { setSelectedMonth(index); setSelectedRange("mes"); }}>
                        {format(new Date(2024, index), "MMMM", { locale: es })}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => { setSelectedRange("ano"); }} className="btn btn-outline-primary m-1">
                Año
              </button>
            </div>

            <h4 className="dataRange">{dateRange}</h4>
            <div className="row justify-content-center align-items-center g-2">
              <div className="col-6">
                <h4>
                  <CountUp
                    start={0}
                    end={filteredPedidos.length}
                    duration={3}
                    separator=","
                    decimals={0}
                    decimal="."
                  />
                </h4>
                <p>Total vendidos</p>
              </div>
              <div className="col-6">
                <h4>
                  S/
                  <CountUp
                    start={0}
                    end={totalGeneral}
                    duration={3}
                    separator=","
                    decimals={2}
                    decimal="."
                  />
                </h4>
                <p>Total recaudado</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      {filteredPedidos.map((p, index) => (
        <Card key={index} data={p} />
      ))}
    </div>
  );
};
