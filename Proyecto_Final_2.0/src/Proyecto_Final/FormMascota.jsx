import React, { useState, useEffect } from 'react';

const FormMascota = () => {
    const [nombre, setNombre] = useState('');
    const [edad, setedad] = useState('');
    const [estado, setEstado] = useState('');
    const [dueno, setdueno] = useState('');
    
    const [MascotaEditar, setMascotaEditar] = useState(null);

    useEffect(() => {
        cargarMascotaes();
    }, []);

    const cargarMascotaes = () => {
        fetch('http://localhost/php/listarMascota.php')
            .then(response => response.json())
            .then(data => {
                setMascotaes(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const Mascota = {
            nombre,
            edad,
            estado,
            dueno,
            
        };

        const url = modoEdicion ? 'http://localhost/php/EditMascota.php' : 'http://localhost/php/InsertMascota.php';

        fetch(url, {
            method: modoEdicion ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Mascota),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.message === (modoEdicion ? 'Mascota actualizado correctamente' : 'Mascota insertado correctamente')) {
                setMensaje(`Mascota ${data.id} ${modoEdicion ? 'actualizado' : 'insertado'} correctamente.`);
                cargarMascotaes();
                cancelarEdicion();
            } else {
                setMensaje(`Error al intentar ${modoEdicion ? 'actualizar' : 'guardar'} el Mascota.`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMensaje('Error en la conexión o servidor.');
        });
    };

    const handleEliminarMascota = (id) => {
        fetch(`http://localhost/php/DeleteMascota.php?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Mascota eliminada correctamente') {
                setMensaje(`Mascota con ID ${id} eliminada correctamente.`);
                cargarMascotaes();
            } else {
                setMensaje('Error al intentar eliminar la Mascota.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMensaje('Error en la conexión o servidor.');
        });
    };

    const iniciarEdicion = (Mascota) => {
        setModoEdicion(true);
        setMascotaEditar(Mascota);
        setNombre(Mascota.nombre);
        setedad(Mascota.edad);
        setEstado(Mascota.estado);
        setdueno(Mascota.dueno);
        
    };

    const cancelarEdicion = () => {
        setModoEdicion(false);
        setMascotaEditar(null);
        setNombre('');
        setedad('');
        setEstado('');
        setdueno('');
       
    };

    return (
        <div>
        <h2>Formulario de Mascota</h2>
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
                <label htmlFor="edad">edad:</label>
                <input
                    type="text"
                    id="edad"
                    name="edad"
                    value={edad}
                    onChange={(e) => setedad(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="estado">Estado:</label>
                <input
                    type="text"
                    id="estado"
                    name="estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="dueno">dueno:</label>
                <textarea
                    id="dueno"
                    name="dueno"
                    value={dueno}
                    onChange={(e) => setdueno(e.target.value)}
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
                <label htmlFor="edad">edad:</label>
                <input
                    type="text"
                    id="edad"
                    name="edad"
                    value={edad}
                    onChange={(e) => setedad(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                 <label htmlFor="estado">Estado:</label>
                <input
                    type="text"
                    id="estado"
                    name="estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                <label htmlFor="dueno">dueno:</label>
                <textarea
                    id="dueno"
                    name="dueno"
                    value={dueno}
                    onChange={(e) => setdueno(e.target.value)}
                    required
                    className="w3-input"
                /><br />
                
                <br />
                <button type="submit" className="w3-button w3-block w3-section w3-red w3-ripple">Guardar Mascota</button>
            </form>
        )}

        {mensaje && <p>{mensaje}</p>}

        <h2>Lista de Mascotas</h2>
        <table className="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">
            <thead>
                <tr className="w3-red">
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Estado</th>
                    <th>Dueño</th>
                    
                </tr>
            </thead>
            <tbody>
                {Mascotaes.map(Mascota => (
                    <tr key={Mascota.id}>
                        <td>{Mascota.id}</td>
                        <td>{Mascota.nombre}</td>
                        <td>{Mascota.edad}</td>
                        <td>{Mascota.estado}</td>
                        <td>{Mascota.dueno}</td>
                        
                        <td>
                            <button className="w3-button w3-red w3-hover-pink" onClick={() => handleEliminarMascota(Mascota.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};

export default FormMascota;