import React, { useState, useEffect } from 'react';

const FormMedicina = () => {
    const [nombre, setNombre] = useState('');
    const [stock, setstock] = useState('');
    const [precio, setprecio] = useState('');
    
    const [MedicinaEditar, setMedicinaEditar] = useState(null);

    useEffect(() => {
        cargarMedicinaes();
    }, []);

    const cargarMedicinaes = () => {
        fetch('http://localhost/php/listarMedicina.php')
            .then(response => response.json())
            .then(data => {
                setMedicinaes(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const Medicina = {
            nombre,
            stock,
            precio,
            
        };

        const url = modoEdicion ? 'http://localhost/php/EditMedicina.php' : 'http://localhost/php/InsertMedicina.php';

        fetch(url, {
            method: modoEdicion ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Medicina),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.message === (modoEdicion ? 'Medicina actualizada correctamente' : 'Medicina insertada correctamente')) {
                setMensaje(`Medicina ${data.id} ${modoEdicion ? 'actualizado' : 'insertado'} correctamente.`);
                cargarMedicinaes();
                cancelarEdicion();
            } else {
                setMensaje(`Error al intentar ${modoEdicion ? 'actualizar' : 'guardar'} el Medicina.`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMensaje('Error en la conexión o servidor.');
        });
    };

    const handleEliminarMedicina = (id) => {
        fetch(`http://localhost/php/DeleteMedicina.php?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Medicina eliminado correctamente') {
                setMensaje(`Medicina con ID ${id} eliminado correctamente.`);
                cargarMedicinaes();
            } else {
                setMensaje('Error al intentar eliminar el Medicina.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMensaje('Error en la conexión o servidor.');
        });
    };

    const iniciarEdicion = (Medicina) => {
        setModoEdicion(true);
        setMedicinaEditar(Medicina);
        setNombre(Medicina.nombre);
        setstock(Medicina.stock);
        setprecio(Medicina.precio);
        
    };

    const cancelarEdicion = () => {
        setModoEdicion(false);
        setMedicinaEditar(null);
        setNombre('');
        setstock('');
        setprecio('');
       
    };

    return (
        <div>
        <h2>Formulario de Medicina</h2>
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
                <label htmlFor="stock">stock:</label>
                <input
                    type="text"
                    id="stock"
                    name="stock"
                    value={stock}
                    onChange={(e) => setstock(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="precio">precio:</label>
                <textarea
                    id="precio"
                    name="precio"
                    value={precio}
                    onChange={(e) => setprecio(e.target.value)}
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
                <label htmlFor="stock">stock:</label>
                <input
                    type="text"
                    id="stock"
                    name="stock"
                    value={stock}
                    onChange={(e) => setstock(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="precio">precio:</label>
                <textarea
                    id="precio"
                    name="precio"
                    value={precio}
                    onChange={(e) => setprecio(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                
                <br />
                <button type="submit" className="w3-button w3-block w3-section w3-red w3-ripple">Guardar Medicina</button>
            </form>
        )}

        {mensaje && <p>{mensaje}</p>}

        <h2>Lista de Medicinaes</h2>
        <table className="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">
            <thead>
                <tr className="w3-red">
                    <th>ID</th>
                    <th>stock</th>
                    <th>Nombre</th>
                    <th>precio</th>
                    
                </tr>
            </thead>
            <tbody>
                {Medicinaes.map(Medicina => (
                    <tr key={Medicina.id}>
                        <td>{Medicina.id}</td>
                        <td>{Medicina.nombre}</td>
                        <td>{Medicina.stock}</td>
                        <td>{Medicina.precio}</td>
                        
                        <td>
                            <button className="w3-button w3-red w3-hover-pink" onClick={() => handleEliminarMedicina(Medicina.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};

export default FormMedicina;