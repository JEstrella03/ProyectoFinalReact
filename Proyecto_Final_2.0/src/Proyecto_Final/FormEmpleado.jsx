import React, { useState, useEffect } from 'react';

const FormEmpleado = () => {
    
    const [cedula, setcedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [puesto, setpuesto] = useState('');
    
    const [EmpleadoEditar, setEmpleadoEditar] = useState(null);

    useEffect(() => {
        cargarEmpleadoes();
    }, []);

    const cargarEmpleadoes = () => {
        fetch('http://localhost/php/listarEmpleado.php')
            .then(response => response.json())
            .then(data => {
                setEmpleadoes(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const Empleado = {
            nombre,
            cedula,
            puesto,
            
        };

        const url = modoEdicion ? 'http://localhost/php/EditEmpleado.php' : 'http://localhost/php/InsertEmpleado.php';

        fetch(url, {
            method: modoEdicion ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Empleado),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.message === (modoEdicion ? 'Empleado actualizado correctamente' : 'Empleado insertado correctamente')) {
                setMensaje(`Empleado ${data.id} ${modoEdicion ? 'actualizado' : 'insertado'} correctamente.`);
                cargarEmpleadoes();
                cancelarEdicion();
            } else {
                setMensaje(`Error al intentar ${modoEdicion ? 'actualizar' : 'guardar'} el Empleado.`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMensaje('Error en la conexión o servidor.');
        });
    };

    const handleEliminarEmpleado = (id) => {
        fetch(`http://localhost/php/DeleteEmpleado.php?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Empleado eliminado correctamente') {
                setMensaje(`Empleado con ID ${id} eliminado correctamente.`);
                cargarEmpleadoes();
            } else {
                setMensaje('Error al intentar eliminar el Empleado.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMensaje('Error en la conexión o servidor.');
        });
    };

    const iniciarEdicion = (Empleado) => {
        setModoEdicion(true);
        setEmpleadoEditar(Empleado);
        setNombre(Empleado.nombre);
        setcedula(Empleado.cedula);
        setpuesto(Empleado.puesto);
        
    };

    const cancelarEdicion = () => {
        setModoEdicion(false);
        setEmpleadoEditar(null);
        setNombre('');
        setcedula('');
        setpuesto('');
       
    };

    return (
        <div>
        <h2>Formulario de Empleado</h2>
        {modoEdicion ? (
            <form className="w3-container w3-card-4 w3-yellow w3-text-red w3-margin" onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="cedula">Cedula:</label>
                <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    value={cedula}
                    onChange={(e) => setcedula(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="puesto">Puesto:</label>
                <textarea
                    id="puesto"
                    name="puesto"
                    value={puesto}
                    onChange={(e) => setpuesto(e.target.value)}
                    required
                    className="w3-input"
                /><br />
              
                <br />
                <button type="submit" className="w3-button w3-block w3-section w3-red w3-ripple">Guardar Cambios</button>
                <button type="button" className="w3-button w3-block w3-section w3-red w3-ripple" onClick={cancelarEdicion}>Cancelar</button>
            </form>
        ) : (
            <form className="w3-container w3-card-4 w3-yellow w3-text-red w3-margin" onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="cedula">Cedula:</label>
                <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    value={cedula}
                    onChange={(e) => setcedula(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="puesto">Puesto:</label>
                <textarea
                    id="puesto"
                    name="puesto"
                    value={puesto}
                    onChange={(e) => setpuesto(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                
                <br />
                <button type="submit" className="w3-button w3-block w3-section w3-red w3-ripple">Guardar Empleado</button>
            </form>
        )}

        {mensaje && <p>{mensaje}</p>}

        <h2>Lista de Empleadoes</h2>
        <table className="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">
            <thead>
                <tr className="w3-red">
                    <th>ID</th>
                    <th>Cedula</th>
                    <th>Nombre</th>
                    <th>Puesto</th>
                    
                </tr>
            </thead>
            <tbody>
                {Empleadoes.map(Empleado => (
                    <tr key={Empleado.id}>
                        <td>{Empleado.id}</td>
                        <td>{Empleado.nombre}</td>
                        <td>{Empleado.cedula}</td>
                        <td>{Empleado.puesto}</td>
                        
                        <td>
                            <button className="w3-button w3-red w3-hover-pink" onClick={() => handleEliminarEmpleado(Empleado.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};

export default FormEmpleado;