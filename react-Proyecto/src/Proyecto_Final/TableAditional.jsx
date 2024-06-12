import React from "react";

const TableAditional = ({ items }) => {
  if (!items || items.length === 0) {
    return <p>No se registraron articulos.</p>;
  }

  return (
    <div>
      <h2>Tabla de Articulos para Mascotas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAditional;
