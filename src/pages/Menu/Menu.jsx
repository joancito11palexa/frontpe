import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import socketService from "../../services/socketService";
import Food1Icon from "../../assets/food1Icon.svg?react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import loading1 from "../../assets/gifs/loading1.gif";

export const Menu = () => {
  const dispatch = useDispatch();
  const platos = useSelector((state) => state.platos.platos);
  const [fechaHoy, setFechaHoy] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [platoSeleccionado, setPlatoSeleccionado] = useState(null);
  const [pedidoActual, setPedidoActual] = useState([]);

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

  const abrirModal = (plato) => {
    setPlatoSeleccionado(plato);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setCantidad(1);
    setPlatoSeleccionado(null);
  };

  const agregarAPedido = () => {
    const nuevoItem = {
      id: platoSeleccionado.id,
      nombre: platoSeleccionado.nombre,
      precio: platoSeleccionado.precio,
      cantidad: parseInt(cantidad, 10),
      tipo: platoSeleccionado.tipo,
    };

    setPedidoActual((prev) => [...prev, nuevoItem]);
    cerrarModal();
  };

  const realizarPedido = async () => {
    const clienteId = localStorage.getItem("clienteId");

    if (!clienteId) {
      alert(
        "No se encontró información del cliente. Por favor, inicia sesión."
      );
      return;
    }

    const descripcion = {
      entradas: pedidoActual.filter((item) => item.tipo === "entrada"),
      platoPrincipal: pedidoActual.filter(
        (item) => item.tipo === "platoPrincipal"
      ),
      clienteId,
    };

    try {
      const response = await axios.post(
        `http://localhost:4000/api/pedidos/${clienteId}/crear`,
        descripcion
      );

      alert("Pedido realizado con éxito");
      setPedidoActual([]); // Limpiar el pedido actual
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
      alert("Hubo un error al procesar tu pedido.");
    }
  };

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
                        <button onClick={() => abrirModal(plato)}>+</button>
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
                        <button onClick={() => abrirModal(plato)}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="text-center mt-4">
        <Button
          variant="success"
          onClick={realizarPedido}
          disabled={pedidoActual.length === 0}
        >
          Realizar Pedido
        </Button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={cerrarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar {platoSeleccionado?.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="cantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={agregarAPedido}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
