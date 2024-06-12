import React from "react";

const TableMaskota = ({ mascotas }) => {
  if (!mascotas || mascotas.length === 0) {
    return <p>No se encontraron mascota.</p>;
  }

  return (
    <div>
      <h2>Tabla de Mascotas registradas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Estado</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((mascota) => (
            <tr key={mascota.id}>
              <td>{mascota.id}</td>
              <td>{mascota.nombre}</td>
              <td>{mascota.edad}</td>
              <td>{mascota.estado}</td>
              <td>{mascota.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableMaskota;
