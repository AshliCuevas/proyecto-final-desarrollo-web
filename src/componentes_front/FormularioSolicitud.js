import React, { useState, useEffect } from "react";

const FormularioMedicamento = () => {
    const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);
    const [registrandoNuevo, setRegistrandoNuevo] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [formulario, setFormulario] = useState({
        metodoProduccion: "",
        cantidadPorPaquete: "",
    });
    const [nuevoMedicamento, setNuevoMedicamento] = useState({
        nombre: "",
        funcion: "",
        complejidad: "",
        efectosSecundarios: "",
    });

    const medicamentos = [
        { id: 1, nombre: "Ibuprofeno", funcion: "Analgésico", complejidad: "Media", efectosSecundarios: "Náuseas, mareo" },
        { id: 2, nombre: "Paracetamol", funcion: "Antipirético", complejidad: "Baja", efectosSecundarios: "Dolor estomacal" },
        { id: 3, nombre: "Amoxicilina", funcion: "Antibiótico", complejidad: "Alta", efectosSecundarios: "Erupción cutánea" },
    ];

    useEffect(() => {
        // Simula la carga de categorías desde un API
        setCategorias([
            { id: 1, nombre: "Antibióticos" },
            { id: 2, nombre: "Analgésicos" },
        ]);
    }, []);

    const handleSelectMedicamento = (medicamento) => {
        if (!registrandoNuevo) {
            setMedicamentoSeleccionado(medicamento);
        }
    };

    const handleNuevoMedicamentoChange = (e) => {
        const { name, value } = e.target;
        setNuevoMedicamento({ ...nuevoMedicamento, [name]: value });
    };

    const iniciarRegistroNuevo = () => {
        setRegistrandoNuevo(true);
        setMedicamentoSeleccionado(null);
    };

    const cancelarRegistro = () => {
        setRegistrandoNuevo(false);
        setNuevoMedicamento({
            nombre: "",
            funcion: "",
            complejidad: "",
            efectosSecundarios: "",
        });
    };

    const handleCategoriaChange = (e) => {
        const categoriaId = e.target.value;
        setCategoriaSeleccionada(categoriaId);

        // Simula la carga de subcategorías basadas en la categoría seleccionada
        if (categoriaId === "1") {
            setSubcategorias([
                { id: 1, nombre: "Oral" },
                { id: 2, nombre: "Inyectable" },
            ]);
        } else if (categoriaId === "2") {
            setSubcategorias([
                { id: 3, nombre: "Tabletas" },
                { id: 4, nombre: "Cápsulas" },
            ]);
        } else {
            setSubcategorias([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (registrandoNuevo) {
            console.log("Registrando nuevo medicamento", nuevoMedicamento);
        } else {
            console.log("Medicamento seleccionado:", medicamentoSeleccionado);
        }
    };

    return (
        <div style={styles.container}>
            <h1>Formulario de Medicamentos</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.rowGroup}>
                    <div style={styles.fieldGroup}>
                        <label htmlFor="categoria" style={styles.label}>Categoría</label>
                        <select
                            id="categoria"
                            name="categoria"
                            value={categoriaSeleccionada}
                            onChange={handleCategoriaChange}
                            style={styles.select}
                        >
                            <option value="">Selecciona una categoría</option>
                            {categorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div style={styles.fieldGroup}>
                        <label htmlFor="subcategoria" style={styles.label}>Subcategoría</label>
                        <select
                            id="subcategoria"
                            name="subcategoria"
                            style={styles.select}
                            disabled={!categoriaSeleccionada}
                        >
                            <option value="">Selecciona una subcategoría</option>
                            {subcategorias.map((subcat) => (
                                <option key={subcat.id} value={subcat.id}>{subcat.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div style={styles.rowGroup}>
                    <div style={styles.tableContainer}>
                        <h2 style={styles.subtitle}>Tabla de Medicamentos</h2>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Función</th>
                                    <th>Complejidad</th>
                                    <th>Efectos Secundarios</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicamentos.map((med) => (
                                    <tr
                                        key={med.id}
                                        onClick={() => handleSelectMedicamento(med)}
                                        style={{
                                            cursor: registrandoNuevo ? "not-allowed" : "pointer",
                                            backgroundColor: medicamentoSeleccionado?.id === med.id ? "#e0e0e0" : "transparent",
                                        }}
                                    >
                                        <td>{med.id}</td>
                                        <td>{med.nombre}</td>
                                        <td>{med.funcion}</td>
                                        <td>{med.complejidad}</td>
                                        <td title={med.efectosSecundarios} style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{med.efectosSecundarios}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={styles.fieldGroupRight}>
                        <div style={styles.fieldGroup}>
                            <label htmlFor="metodoProduccion" style={styles.label}>Método de Producción</label>
                            <input
                                type="text"
                                id="metodoProduccion"
                                name="metodoProduccion"
                                value={medicamentoSeleccionado ? medicamentoSeleccionado.metodoProduccion : ""}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.fieldGroup}>
                            <label htmlFor="cantidadPorPaquete" style={styles.label}>Cantidad por Paquete</label>
                            <input
                                type="number"
                                id="cantidadPorPaquete"
                                name="cantidadPorPaquete"
                                value={medicamentoSeleccionado ? medicamentoSeleccionado.cantidadPorPaquete : ""}
                                style={styles.input}
                            />
                        </div>
                    </div>
                </div>

                {registrandoNuevo && (
                    <div style={styles.newMedicineContainer}>
                        <h2 style={styles.subtitle}>Registrar Nuevo Medicamento</h2>
                        <div style={styles.fieldGroup}>
                            <label htmlFor="nombre" style={styles.label}>Nombre del Medicamento</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={nuevoMedicamento.nombre}
                                onChange={handleNuevoMedicamentoChange}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.fieldGroup}>
                            <label htmlFor="funcion" style={styles.label}>Función</label>
                            <input
                                type="text"
                                id="funcion"
                                name="funcion"
                                value={nuevoMedicamento.funcion}
                                onChange={handleNuevoMedicamentoChange}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.fieldGroup}>
                            <label htmlFor="complejidad" style={styles.label}>Complejidad</label>
                            <select
                                id="complejidad"
                                name="complejidad"
                                value={nuevoMedicamento.complejidad}
                                onChange={
                                    handleNuevoMedicamentoChange
                                }
                                style={styles.select}
                            >
                                <option value="">Selecciona una complejidad</option>
                                <option value="Baja">Baja</option>
                                <option value="Media">Media</option>
                                <option value="Alta">Alta</option>
                            </select>
                        </div>
    
                        <div style={styles.fieldGroup}>
                            <label htmlFor="efectosSecundarios" style={styles.label}>Efectos Secundarios</label>
                            <textarea
                                id="efectosSecundarios"
                                name="efectosSecundarios"
                                value={nuevoMedicamento.efectosSecundarios}
                                onChange={handleNuevoMedicamentoChange}
                                style={styles.textarea}
                            />
                        </div>
    
                        <div style={styles.buttonGroup}>
                            <button type="button" onClick={cancelarRegistro} style={styles.cancelButton}>
                                Cancelar
                            </button>
                            <button type="submit" style={styles.submitButton}>
                                Guardar Medicamento
                            </button>
                        </div>
                    </div>
                    )}
    
                    {!registrandoNuevo && (
                        <div style={styles.buttonGroup}>
                            <button type="button" onClick={iniciarRegistroNuevo} style={styles.newButton}>
                                Registrar Nuevo Medicamento
                            </button>
                        </div>
                    )}
                </form>
            </div>
        );
    };
    
    const styles = {
        container: {
            margin: "0 auto",
            maxWidth: "900px",
            fontFamily: "Arial, sans-serif",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
        },
        rowGroup: {
            display: "flex",
            gap: "1rem",
        },
        fieldGroup: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
        },
        fieldGroupRight: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
        },
        tableContainer: {
            flex: 2,
        },
        label: {
            fontWeight: "bold",
            marginBottom: "0.5rem",
        },
        input: {
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
        },
        textarea: {
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            resize: "vertical",
        },
        select: {
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
        },
        th: {
            borderBottom: "1px solid #ddd",
            padding: "0.5rem",
            textAlign: "left",
        },
        td: {
            borderBottom: "1px solid #ddd",
            padding: "0.5rem",
        },
        buttonGroup: {
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
        },
        submitButton: {
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
        },
        cancelButton: {
            backgroundColor: "#f44336",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
        },
        newButton: {
            backgroundColor: "#2196F3",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
        },
        subtitle: {
            fontSize: "1.2rem",
            marginBottom: "0.5rem",
        },
    };
    
    export default FormularioMedicamento;
    