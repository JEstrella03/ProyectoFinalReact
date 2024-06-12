import React, { useState, useEffect } from "react";
import TableMaskota from "./TableMaskota";
import TableAmo from "./TableAmo";
import TableAditional from "./TableAditional";

export const Alta = () => {
    const [mascota, setMascota] = useState({
        id: "",
        nombre: "",
        edad: "",
        estado: "",
        categoria: "",
    });
    const [cliente, setCliente] = useState({
        id: "",
        nombre: "",
        direccion: "",
        mascota: "",
        telefono: "",
    });

    const [articulo, setArticulo] = useState({
        id: "",
        nombre: "",
        stock: 0,
    });

    const [mensaje, setMensaje] = useState("");
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

    const guardarDatos = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    const handleMascotaChange = (event) => {
        const { name, value } = event.target;
        setMascota({ ...mascota, [name]: value });
    };

    const handleClienteChange = (event) => {
        const { name, value } = event.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleArticuloChange = (event) => {
        const { name, value } = event.target;
        setArticulo({ ...articulo, [name]: value });
    };

    const handleSubmitMascota = (event) => {
        event.preventDefault();
        const nuevaMascota = { ...mascota, id: Date.now().toString() };
        const nuevasMascotas = [...mascotas, nuevaMascota];
        setMascotas(nuevasMascotas);
        guardarDatos("mascotas", nuevasMascotas);
        setMascota({
            id: "",
            nombre: "",
            edad: "",
            estado: "",
            categoria: "",
        });
        setMensaje("Mascota registrada.");
    };

    const handleSubmitCliente = (event) => {
        event.preventDefault();
        const nuevoCliente = { ...cliente, id: Date.now().toString() };
        const nuevosClientes = [...clientes, nuevoCliente];
        setClientes(nuevosClientes);
        guardarDatos("clientes", nuevosClientes);
        setCliente({
            id: "",
            nombre: "",
            direccion: "",
            mascota: "",
            telefono: ""
        });
        setMensaje("Cliente agregado correctamente.");
    };

    const handleSubmitArticulo = (event) => {
        event.preventDefault();
        const nuevoArticulo = { ...articulo, id: Date.now().toString() };
        const nuevosArticulos = [...articulos, nuevoArticulo];
        setArticulos(nuevosArticulos);
        guardarDatos("articulos", nuevosArticulos);
        setArticulo({
            id: "",
            nombre: "",
            stock: 0,
        });
        setMensaje("Articulo agregado correctamente.");
    };

    return (
        <div className="w3-container">
            {mensaje && <p>{mensaje}</p>}
    
            <form
                className="w3-container w3-card-4"
                style={{ backgroundColor: "#4682B4", color: "#ffffff", margin: "10px" }}
                onSubmit={handleSubmitCliente}
            >
                <h2>Agregar Cliente</h2>
                <p>
                    <label className="w3-text-white">
                        <b>Nombre del cliente</b>
                    </label>
                    <input
                        name="nombre"
                        type="text"
                        value={cliente.nombre}
                        onChange={handleClienteChange}
                        className="w3-input w3-border"
                    />
                </p>
                <p>
                    <label className="w3-text-white">
                        <b>Teléfono</b>
                    </label>
                    <input
                        name="telefono"
                        type="text"
                        value={cliente.telefono}
                        onChange={handleClienteChange}
                        className="w3-input w3-border"
                    />
                </p>
                <p>
                    <label className="w3-text-white">
                        <b>Dirección</b>
                    </label>
                    <input
                        name="direccion"
                        type="text"
                        value={cliente.direccion}
                        onChange={handleClienteChange}
                        className="w3-input w3-border"
                    />
                </p>
                <p>
                    <label className="w3-text-white">
                        <b>Correo electrónico</b>
                    </label>
                    <input
                        name="correo"
                        type="email"
                        value={cliente.correo}
                        onChange={handleClienteChange}
                        className="w3-input w3-border"
                    />
                </p>
                <button type="submit" className="w3-btn w3-grey w3-margin-top">
                    Agregar Cliente
                </button>
            </form>
    
            <form
                className="w3-container w3-card-4"
                style={{ backgroundColor: "#4682B4", color: "#ffffff", margin: "10px" }}
                onSubmit={handleSubmitMascota}
            >
                <h2>Agregar Mascota</h2>
                <p>
                    <label className="w3-text-white">
                        <b>Nombre de la mascota</b>
                    </label>
                    <input
                        name="nombre"
                        type="text"
                        value={mascota.nombre}
                        onChange={handleMascotaChange}
                        className="w3-input w3-border"
                    />
                </p>
                <p>
                    <label className="w3-text-white">
                        <b>Edad</b>
                    </label>
                    <input
                        name="edad"
                        type="text"
                        value={mascota.edad}
                        onChange={handleMascotaChange}
                        className="w3-input w3-border"
                    />
                </p>
                <p>
                    <label className="w3-text-white">
                        <b>Estado</b>
                    </label>
                    <input
                        name="estado"
                        type="text"
                        value={mascota.estado}
                        onChange={handleMascotaChange}
                        className="w3-input w3-border"
                    />
                </p>
                <p>
                    <label className="w3-text-white">
                        <b>Categoría</b>
                    </label>
                    <input
                        name="categoria"
                        type="text"
                        value={mascota.categoria}
                        onChange={handleMascotaChange}
                        className="w3-input w3-border"
                    />
                </p>
                <button type="submit" className="w3-btn w3-grey w3-margin-top">
                    Agregar Mascota
                </button>
            </form>
    
            <form
                className="w3-container w3-card-4"
                style={{ backgroundColor: "#4682B4", color: "#ffffff", margin: "10px" }}
                onSubmit={handleSubmitArticulo}
            >
                <h2>Agregar Artículo</h2>
                <p>
                    <label className="w3-text-white">
                        <b>Nombre del artículo</b>
                    </label>
                    <input
                        name="nombre"
                        type="text"
                        value={articulo.nombre}
                        onChange={handleArticuloChange}
                        className="w3-input w3-border"
                    />
                </p>
                <p>
                    <label className="w3-text-white">
                        <b>Stock</b>
                    </label>
                    <input
                        name="stock"
                        type="number"
                        value={articulo.stock}
                        onChange={handleArticuloChange}
                        className="w3-input w3-border"
                    />
                </p>
                <button type="submit" className="w3-btn w3-grey w3-margin-top">
                    Agregar Artículo
                </button>
            </form>
        </div>
    );
}