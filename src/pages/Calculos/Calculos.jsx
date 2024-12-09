import React, { useState, useEffect } from 'react';

export const Calculos = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const obtenerListaProductos = async () => {
      try {
        const response = await fetch('http://localhost:4000/obtener-lista-productos');
        if (!response.ok) throw new Error('Error al obtener la lista de productos');
        const data = await response.json();
        setProductos(data);
        setProductosFiltrados(data.slice(0, 10)); // Mostrar solo los primeros 10 inicialmente
      } catch (error) {
        console.error(error);
      }
    };

    obtenerListaProductos();
  }, []);

  const manejarBusqueda = (e) => {
    const valor = e.target.value.toLowerCase();
    setBusqueda(valor);
    setProductosFiltrados(
      productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(valor)
      )
    );
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setProductosSeleccionados((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const obtenerDatos = async () => {
    try {
      const response = await fetch('http://localhost:4000/obtener-precio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productosSeleccionados }),
      });
      if (!response.ok) throw new Error('Error al obtener datos.');
      const data = await response.json();
      setResultados(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Selecciona los productos</h3>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={manejarBusqueda}
      />
      <form>
        {productosFiltrados.map((producto) => (
          <div key={producto.value}>
            <input
              type="checkbox"
              id={producto.value}
              value={producto.value}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={producto.value}>{producto.nombre}</label>
          </div>
        ))}
      </form>
      <button onClick={obtenerDatos}>Obtener Precios</button>

      <div>
        <h4>Resultados</h4>
        {resultados.length > 0 ? (
          resultados.map((item, index) => (
            <div key={index}>
              <p>Producto: {item.variedad}</p>
              <p>Precio: {item.precio}</p>
            </div>
          ))
        ) : (
          <p>No hay resultados disponibles.</p>
        )}
      </div>
    </div>
  );
};
