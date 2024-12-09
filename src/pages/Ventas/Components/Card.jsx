import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const Card = ({ data }) => {
  const fechaFormateada = format(
    new Date(data.fecha),
    "EEEE dd 'de' MMMM 'a las' HH:mm",
    { locale: es }
  );

  return (
    <div className="cardComponent">
      <p>Fecha: {fechaFormateada}</p>
      <div>
        <h4>Platos principales:</h4>
        {data.descripcion?.platoPrincipal?.length > 0 ? (
          data.descripcion.platoPrincipal.map((plato, i) => (
            <div key={i}>
              <p>
                {plato.nombre}: {plato.cantidad} x {plato.precio} ={" "}
                {plato.cantidad * plato.precio}
              </p>
            </div>
          ))
        ) : (
          <p>No hay platos principales.</p>
        )}
      </div>
      <div>
        <h4>Entradas:</h4>
        {data.descripcion?.entradas?.length > 0 ? (
          data.descripcion.entradas.map((entrada, i) => (
            <div key={i}>
              <p>
                {entrada.nombre}: {entrada.cantidad} x {entrada.precio} ={" "}
                {entrada.cantidad * entrada.precio}
              </p>
            </div>
          ))
        ) : (
          <p>No hay entradas.</p>
        )}
      </div>
      <h4>Total: {data.total}</h4>
    </div>
  );
};
