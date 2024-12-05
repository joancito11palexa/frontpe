import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import CountUp from "react-countup";
import BtnAdd from "../assets/btnAdd.svg?react";
import { useDispatch, useSelector } from "react-redux";
import socketService from "../services/socketService";

const socket = io("https://socketserver-u5si.onrender.com/");


export const Cocina = () => {
  const dispatch = useDispatch();
 const pedidos = useSelector((state)=>state.pedidos)
  const platos = useSelector((state)=>state.platos)
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [tipo, setTipo] = useState("entrada"); // Estado para el tipo de plato
  const [ganancias, setGanancias] = useState(0); // Estado para las ganancias totales

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

  useEffect(() => {
    const totalGanancias = pedidos
      .filter((pedido) => pedido.estado === "entregado")
      .reduce((acc, pedido) => acc + pedido.total, 0); // Usar 'total' en lugar de 'precio'
    setGanancias(totalGanancias);
  }, [pedidos]);

  const handleCrearPlato = (e) => {
    e.preventDefault();

    // Validar datos
    if (!nombre || !precio) {
      alert("Por favor, ingresa el nombre y precio del plato.");
      return;
    }

    const nuevoPlato = {
      nombre,
      precio: parseFloat(precio),
      imagen: imagen || null, // Si no se ingresa una imagen, enviar null
      tipo, // Agregar el tipo de plato
    };

    // Emitir el evento para crear un nuevo plato
    socket.emit("crear-plato", nuevoPlato);

    // Limpiar el formulario
    setNombre("");
    setPrecio("");
    setImagen("");
    setTipo("entrada"); // Resetear el tipo a "entrada" por defecto
  };

  const handleEliminarPlato = (id) => {
    // Emitir el evento para eliminar el plato
    socket.emit("eliminar-plato", id);
  };

  return (
    <div className="CocinaPage">
      <h1>Panel de Cocina</h1> 

      <h2>Ganancias Totales:</h2>
      <p>
        S/.
        <CountUp
          start={0}
          end={ganancias}
          duration={2} // Duración de la animación en segundos
          separator=","
          decimals={2}
          decimal="."
        />
      </p>

      <h2>Pedidos en Cola:</h2>
      <div className="pedidos">
  <div className="pedidoLista row">
    {pedidos
      .filter((pedido) => pedido.estado === "pendiente") // Filtrar pedidos pendientes
      .map((pedido, index) => (
        <div key={index} className="pedidoItem">
          <div className="col-12">
            <strong>Plato Principal:</strong>
            {pedido.descripcion?.platoPrincipal?.length > 0 ? (
              <div className="subLista">
                {pedido.descripcion.platoPrincipal.map((plato, idx) => (
                  <p key={idx} className="subListaItem">
                    {plato.nombre} (x{plato.cantidad})
                  </p>
                ))}
              </div>
            ) : (
              "No hay platos principales"
            )}
            <br />
          </div>

          <div className="col-12">
            <strong>Entradas:</strong>
            {pedido.descripcion?.entradas?.length > 0 ? (
              <div className="subLista">
                {pedido.descripcion.entradas.map((entrada, idx) => (
                  <p key={idx} className="subListaItem">
                    {entrada.nombre} (x{entrada.cantidad})
                  </p>
                ))}
              </div>
            ) : (
              "No hay entradas"
            )}
          </div>

          <p className={`pedidoEstado ${pedido.estado}`}>{pedido.estado}</p>
        </div>
      ))}
  </div>
</div>


      <div
        className="modal fade"
        id="crearPlatoModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Crear menú
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={handleCrearPlato}>
                <div>
                  <label>
                    Nombre:
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Precio:
                    <input
                      type="number"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Tipo:
                    <select
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value)}
                    >
                      <option value="entrada">Entrada</option>
                      <option value="platoPrincipal">Plato Principal</option>
                    </select>
                  </label>
                </div>
                <button type="submit">Crear Plato</button>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2>Platos Disponibles:</h2>

      <div class="row g-2 platosDisponibles">
        {platos.map((plato, index) => (
          <div key={index} class="col-12 col-md-3 boxPlato">
            <div className="nombrePrecio">
              <strong>{plato.nombre}</strong> S/.{plato.precio}
              <p>{plato.tipo === "entrada" ? "Entrada" : "Plato Principal"}</p>
            </div>

            <button onClick={() => handleEliminarPlato(plato.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className=" btn btn-modalCrearPlato "
        data-bs-toggle="modal"
        data-bs-target="#crearPlatoModal"
      >
        <BtnAdd />
      </button>
    </div>
  );
};
