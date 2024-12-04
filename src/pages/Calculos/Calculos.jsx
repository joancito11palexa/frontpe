import React, { useState, useEffect } from 'react';

export const Calculos = () => {
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    // Obtener lista de productos cuando el componente se monta
    const obtenerListaProductos = async () => {
      try {
        const response = await fetch('http://localhost:4000/obtener-lista-productos');
        if (!response.ok) {
          throw new Error('Error al obtener la lista de productos');
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
      }
    };

    obtenerListaProductos();
  }, []);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setProductosSeleccionados(prev => [...prev, value]);
    } else {
      setProductosSeleccionados(prev => prev.filter(id => id !== value));
    }
  };

  const obtenerDatos = async () => {

    try {
      const response = await fetch('http://localhost:4000/obtener-precio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  productosSeleccionados })
      });

  
      if (!response.ok) {
        throw new Error('Error al obtener datos.');
      }
  
      const data = await response.json();
  
      if (!data || !Array.isArray(data)) {
        throw new Error('Datos no válidos recibidos del servidor');
      }
  
      setResultados(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };
  

  return (
    <div>
      <h3>Selecciona los productos</h3>
      <form>
        {productos.map((producto) => (
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
              <p>Producto: {item.producto}</p>
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
