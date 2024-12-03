import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlatos, addPlato, removePlato } from "./../redux/actions/platosActions";
import socketService from "../services/socketService";

export const Aea = () => {
  const platos = useSelector((state) => state.platos);
  const dispatch = useDispatch();

  useEffect(() => {
    socketService.on("platos-actualizados", (data) => {
      dispatch(setPlatos(data)); // Actualizar la lista de platos desde el socket
    });

    return () => {
      socketService.off("platos-actualizados");
    };
  }, [dispatch]);

  const handleAddPlato = (plato) => {
    dispatch(addPlato(plato));
  };

  const handleRemovePlato = (platoId) => {
    dispatch(removePlato(platoId));
  };

  return (
    <div>
      <h3>Platos</h3>
      <ul>
        {platos.map((plato) => (
          <li key={plato.id}>
            {plato.nombre} (${plato.precio})
            <button onClick={() => handleRemovePlato(plato.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleAddPlato({ id: 5, nombre: "Nuevo Plato", precio: 12 })}>
        Agregar Plato
      </button>
    </div>
  );
};


