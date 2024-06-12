import React, { useState } from "react";

export const Delete = () => {
  const [mascota, setMascota] = useState("");
  const [cliente, setCliente] = useState("");
  const [articulo, setArticulo] = useState("");
  const [message, setMessage] = useState("");

  const handleMascotaChange = (event) => {
    setMascota(event.target.value);
  };

  const handleClienteChange = (event) => {
    setCliente(event.target.value);
  };

  const handleArticuloChange = (event) => {
    setArticulo(event.target.value);
  };

  const eliminarItem = (tipo, valor) => {
    setMessage(`${tipo} con valor "${valor}" eliminado.`);
  };

  const handleMascotaSubmit = (event) => {
    event.preventDefault();
    eliminarItem("Mascota", mascota);
    setMascota("");
  };

  const handleClienteSubmit = (event) => {
    event.preventDefault();
    eliminarItem("Cliente", cliente);
    setCliente("");
  };

  const handleArticuloSubmit = (event) => {
    event.preventDefault();
    eliminarItem("Artículo", articulo);
    setArticulo("");
  };

  return (
    <div className="w3-container">
      <div className="w3-row-padding">
        <div className="w3-half">
          <form
            onSubmit={handleClienteSubmit}
            className="w3-container w3-card-4"
            style={{ backgroundColor: "#7a181d", color: "white", width: "100%" }} // Azul claro
          >
            <h3>Eliminar Cliente</h3>
            <label htmlFor="clienteNombre" className="w3-label">Nombre del cliente:</label>
            <input
              id="clienteNombre"
              type="text"
              value={cliente}
              onChange={handleClienteChange}
              className="w3-input w3-border"
            />
            <button
              type="submit"
              className="w3-btn"
              style={{ backgroundColor: "#808080", color: "white", marginTop: "10px" }} // Botón gris
            >
              Eliminar
            </button>
          </form>

          <form
            onSubmit={handleMascotaSubmit}
            className="w3-container w3-card-4"
            style={{ backgroundColor: "#7a181d", color: "white", width: "100%", marginTop: "20px" }} // Azul claro
          >
            <h3>Eliminar Mascota</h3>
            <label htmlFor="mascotaId" className="w3-label">ID de la mascota:</label>
            <input
              id="mascotaId"
              type="text"
              value={mascota}
              onChange={handleMascotaChange}
              className="w3-input w3-border"
            />
            <button
              type="submit"
              className="w3-btn"
              style={{ backgroundColor: "#808080", color: "white", marginTop: "10px" }} // Botón gris
            >
              Eliminar
            </button>
          </form>
        </div>

        <div className="w3-half">
          <form
            onSubmit={handleArticuloSubmit}
            className="w3-container w3-card-4"
            style={{ backgroundColor: "#7a181d", color: "white", width: "100%" }} // Azul claro
          >
            <h3>Eliminar Artículo</h3>
            <label htmlFor="articuloId" className="w3-label">ID del artículo:</label>
            <input
              id="articuloId"
              type="text"
              value={articulo}
              onChange={handleArticuloChange}
              className="w3-input w3-border"
            />
            <button
              type="submit"
              className="w3-btn"
              style={{ backgroundColor: "#808080", color: "white", marginTop: "10px" }} // Botón gris
            >
              Eliminar
            </button>
          </form>
        </div>
      </div>

      {message && <p className="w3-panel w3-pale-yellow w3-leftbar w3-border-yellow w3-margin-top">{message}</p>}
    </div>
  );
};
