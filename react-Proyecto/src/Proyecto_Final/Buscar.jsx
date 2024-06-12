import React, { useState } from "react";

export const Buscar = () => {
  const [clienteQuery, setClienteQuery] = useState("");
  const [mascotaQuery, setMascotaQuery] = useState("");
  const [productoQuery, setProductoQuery] = useState("");
  const [result, setResult] = useState(null);
  const [queryType, setQueryType] = useState("");

  const handleClienteQueryChange = (event) => {
    setClienteQuery(event.target.value);
  };

  const handleMascotaQueryChange = (event) => {
    setMascotaQuery(event.target.value);
  };

  const handleProductoQueryChange = (event) => {
    setProductoQuery(event.target.value);
  };

  const handleClienteSubmit = (event) => {
    event.preventDefault();
    const cliente = buscarCliente(clienteQuery);
    setQueryType("cliente");
    setResult(cliente);
  };

  const handleMascotaSubmit = (event) => {
    event.preventDefault();
    const mascota = buscarMascota(mascotaQuery);
    setQueryType("mascota");
    setResult(mascota);
  };

  const handleProductoSubmit = (event) => {
    event.preventDefault();
    const producto = buscarProducto(productoQuery);
    setQueryType("producto");
    setResult(producto);
  };

  const buscarCliente = (nombre) => {
    // Lógica para buscar clientes en el almacenamiento local
    // Ejemplo de búsqueda en localStorage
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    return clientes.find(cliente => cliente.nombre === nombre) || null;
  };

  const buscarMascota = (nombre) => {
    // Lógica para buscar mascotas en el almacenamiento local
    // Ejemplo de búsqueda en localStorage
    const mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];
    return mascotas.find(mascota => mascota.nombre === nombre) || null;
  };

  const buscarProducto = (id) => {
    // Lógica para buscar productos en el almacenamiento local
    // Ejemplo de búsqueda en localStorage
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    return productos.find(producto => producto.id === id) || null;
  };

  return (
    <div className="w3-container">
      <div className="w3-center">
      
      </div>
      <h2 className="w3-center">Buscar</h2>

      <div className="w3-row">
        <div className="w3-half">
          <form onSubmit={handleClienteSubmit} className="w3-container w3-card-4" style={{ backgroundColor: "#667a00", color: "white", margin: "10px" }}>
            <h3>Buscar Cliente</h3>
            <label htmlFor="clienteQuery" className="w3-label">Nombre del cliente:</label>
            <input
              id="clienteQuery"
              type="text"
              value={clienteQuery}
              onChange={handleClienteQueryChange}
              className="w3-input w3-border"
            />
            <button type="submit" className="w3-btn" style={{ backgroundColor: "#667a00", color: "white", marginTop: "10px" }}>Buscar</button>
          </form>
        </div>

        <div className="w3-half">
          <form onSubmit={handleMascotaSubmit} className="w3-container w3-card-4" style={{ backgroundColor: "#667a00", color: "white", margin: "10px" }}>
            <h3>Buscar Mascota</h3>
            <label htmlFor="mascotaQuery" className="w3-label">Nombre de la mascota:</label>
            <input
              id="mascotaQuery"
              type="text"
              value={mascotaQuery}
              onChange={handleMascotaQueryChange}
              className="w3-input w3-border"
            />
            <button type="submit" className="w3-btn" style={{ backgroundColor: "#667a00", color: "white", marginTop: "10px" }}>Buscar</button>
          </form>
        </div>
      </div>

      <div className="w3-row">
        <div className="w3-half">
          <form onSubmit={handleProductoSubmit} className="w3-container w3-card-4" style={{ backgroundColor: "#667a00", color: "white", margin: "10px" }}>
            <h3>Buscar Producto</h3>
            <label htmlFor="productoQuery" className="w3-label">ID del producto:</label>
            <input
              id="productoQuery"
              type="text"
              value={productoQuery}
              onChange={handleProductoQueryChange}
              className="w3-input w3-border"
            />
            <button type="submit" className="w3-btn" style={{ backgroundColor: "#667a00", color: "white", marginTop: "10px" }}>Buscar</button>
          </form>
        </div>
      </div>

      {result && (
        <div>
          {queryType === "cliente" && <TableAmo clientes={[result]} />}
          {queryType === "mascota" && <TableMaskota mascota={[result]} />}
          {queryType === "producto" && <TableAditional productos={[result]} />}
        </div>
      )}

      {!result && (
        <div>
          {queryType === "cliente" && <p>No se encontró el cliente.</p>}
          {queryType === "mascota" && <p>No se encontró la mascota.</p>}
          {queryType === "producto" && <p>No se encontró el producto.</p>}
        </div>
      )}
    </div>
  );
};
