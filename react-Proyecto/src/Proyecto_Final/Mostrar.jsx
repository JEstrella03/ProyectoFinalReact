import React, { useState, useEffect } from "react";
import TableMaskota from "./TableMaskota";
import TableAmo from "./TableAmo";
import TableAditional from "./TableAditional";

export const Mostrar = () => {
  const [mascotas, setMascotas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    const mascotaData = localStorage.getItem("mascotas");
    if (mascotaData) {
      setMascotas(JSON.parse(mascotaData));
    }

    const clientesData = localStorage.getItem("clientes");
    if (clientesData) {
      setClientes(JSON.parse(clientesData));
    }

    const articuloData = localStorage.getItem("articulos");
    if (articuloData) {
      setArticulos(JSON.parse(articuloData));
    }
  }, []);

  return (
    <div>
      <div className="w3-container w3-margin" style={{ backgroundColor: "#1f5e04", color: "white" }}>
        <h2 className="w3-text-white">Mascotas</h2>
        <TableMaskota mascotas={mascotas} />
      </div>
      <div className="w3-container w3-margin" style={{ backgroundColor: "#1f5e04", color: "white" }}>
        <h2 className="w3-text-white">Clientes</h2>
        <TableAmo clientes={clientes} />
      </div>
      <div className="w3-container w3-margin" style={{ backgroundColor: "#1f5e04", color: "white" }}>
        <h2 className="w3-text-white">Articulos</h2>
        <TableAditional articulos={articulos} />
      </div>
    </div>
  );
};
