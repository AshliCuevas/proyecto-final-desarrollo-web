import React, { useState, useEffect } from "react";

// Estilos del componente (sin cambios)
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100vh",
        backgroundColor: "#e3f2fd",
        padding: "20px",
    },
    card: {
        display: "flex",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        width: "90%",
        maxWidth: "1200px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "20px",
    },
    formContainer: {
        flex: 3,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    title: {
        fontSize: "36px",
        fontWeight: "600",
        color: "#11325b",
        marginBottom: "20px",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
    },
    label: {
        fontSize: "18px",
        color: "#11325b",
        fontFamily: "'Poppins', sans-serif",
        marginBottom: "10px",
    },
    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #11325b",
        fontSize: "16px",
        outline: "none",
        fontFamily: "'Poppins', sans-serif",
        width: "100%",
    },
    dropdowns: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
    },
    tableContainer: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        maxHeight: "250px",
        overflowY: "auto",  // Agregado para scroll en la tabla
        width: "100%",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left",
        fontSize: "16px",
    },
    tableHeader: {
        backgroundColor: "#f1f1f1",
        fontWeight: "bold",
    },
    tableRow: {
        borderBottom: "1px solid #ddd",
    },
    checkbox: {
        marginRight: "10px",
    },
    hyperlink: {
        color: "#1e88e5",
        textDecoration: "underline",
        fontSize: "16px",
        cursor: "pointer",
    },
    rightColumn: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
        borderLeft: "1px solid #ddd",
    },
    button: {
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "#0a78b9",
        color: "#fff",
        border: "none",
        fontSize: "18px",
        cursor: "pointer",
        fontFamily: "'Poppins', sans-serif",
    },
};

const MedicamentoForm = () => {
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [complejidades, setComplejidades] = useState([]);  // Asegúrate de inicializar como un array vacío
    const [medicamentos, setMedicamentos] = useState([]);  // Estado para almacenar los medicamentos
    const [selectedCategoria, setSelectedCategoria] = useState("");
    const [selectedSubcategoria, setSelectedSubcategoria] = useState("");
    const [showNewMedForm, setShowNewMedForm] = useState(false);
    const [selectedMedicamento, setSelectedMedicamento] = useState(null);

    useEffect(() => {
        // Fetch categorías
        fetch("http://localhost:3001/categoria-med", {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Categorias recibidas:", data);
                setCategorias(data);  // Asignar las categorías al estado
            })
            .catch((error) => console.error("Error fetching categorias:", error));

        // Fetch complejidades
        fetch("http://localhost:3001/complejidad-med", {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Complejidades recibidas:", data);
                if (Array.isArray(data)) {
                    setComplejidades(data);  // Asignar las complejidades al estado solo si es un array
                } else {
                    console.error("La respuesta de complejidades no es un array:", data);
                }
            })
            .catch((error) => console.error("Error fetching complejidades:", error));

    }, []);

    useEffect(() => {
        if (selectedSubcategoria) {
            // Fetch medicamentos filtrados por subcategoría
            fetch(`http://localhost:3001/medicamento/subcategoria/${selectedSubcategoria}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Medicamentos recibidos:", data);
                    setMedicamentos(data);  // Asignar los medicamentos al estado
                })
                .catch((error) => console.error("Error fetching medicamentos:", error));
        }
    }, [selectedSubcategoria]);

    const handleCategoriaChange = (e) => {
        const categoriaId = e.target.value;
        setSelectedCategoria(categoriaId);
        setSelectedSubcategoria("");

        // Fetch subcategorías por categoría
        fetch(`http://localhost:3001/subcategoria-med/categoria/${categoriaId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Subcategorías recibidas:", data);
                setSubcategorias(data);  // Asignar las subcategorías al estado
            })
            .catch((error) => console.error("Error fetching subcategorias:", error));
    };

    const handleMedicamentoSelect = (id) => {
        setSelectedMedicamento(id);
    };

    const handleRegisterClick = () => {
        setShowNewMedForm(true);
    };

    const handleCancelClick = () => {
        setShowNewMedForm(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Formulario principal */}
                <div style={styles.formContainer}>
                    <h1 style={styles.title}>Formulario de Medicamentos</h1>

                    {/* Dropdowns de categoría y subcategoría */}
                    <div style={styles.dropdowns}>
                        <div>
                            <label style={styles.label}>Categoría</label>
                            <select
                                style={styles.input}
                                value={selectedCategoria}
                                onChange={handleCategoriaChange}
                            >
                                <option value="">Selecciona una categoría</option>
                                {Array.isArray(categorias) && categorias.map((cat) => (
                                    <option key={cat.id_categoria_med} value={cat.id_categoria_med}>
                                        {cat.nombre_categoria}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={styles.label}>Subcategoría</label>
                            <select
                                style={styles.input}
                                value={selectedSubcategoria}
                                onChange={(e) => setSelectedSubcategoria(e.target.value)}
                                disabled={!selectedCategoria}
                            >
                                <option value="">Selecciona una subcategoría</option>
                                {subcategorias.map((subcat) => (
                                    <option key={subcat.id_subcategoria} value={subcat.id_subcategoria}>
                                        {subcat.nombre_subcategoria}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Tabla de medicamentos */}
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead style={styles.tableHeader}>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Función</th>
                                    <th>Complejidad</th>
                                    <th>Efectos Secundarios</th>
                                    <th>Seleccionar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicamentos.map((med) => (
                                    <tr style={styles.tableRow} key={med.id_medicamento}>
                                        <td>{med.id_medicamento}</td>
                                        <td>{med.nombre_med}</td>
                                        <td>{med.funcion_med}</td>
                                        <td>{med.nombre_complejidad}</td>
                                        <td>{med.efectos_secundarios}</td>
                                        <td>
                                            <input
                                                type="radio"
                                                name="medicamento"
                                                style={styles.checkbox}
                                                onChange={() => handleMedicamentoSelect(med.id_medicamento)}
                                                checked={selectedMedicamento === med.id_medicamento}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Hipervínculo para registrar nuevo medicamento */}
                    {!showNewMedForm && (
                        <p
                            style={styles.hyperlink}
                            onClick={handleRegisterClick}
                        >
                            ¿No encuentras tu medicamento? Regístralo
                        </p>
                    )}

                    {/* Formulario para nuevo medicamento */}
                    {showNewMedForm && (
                        <div>
                            <div>
                                <label style={styles.label}>Nombre del Medicamento</label>
                                <input type="text" style={styles.input} />
                            </div>
                            <div>
                                <label style={styles.label}>Función</label>
                                <input type="text" style={styles.input} />
                            </div>
                            <div>
                                <label style={styles.label}>Efectos Secundarios</label>
                                <input type="text" style={styles.input} />
                            </div>
                            <div>
                                <label style={styles.label}>Complejidad</label>
                                <select style={styles.input}>
                                    <option value="">Selecciona una complejidad</option>
                                    {Array.isArray(complejidades) && complejidades.map((comp) => (
                                        <option key={comp.id_complejidad} value={comp.id_complejidad}>
                                            {comp.nombre_complejidad}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <p
                                style={{ ...styles.hyperlink, color: "gray" }}
                                onClick={handleCancelClick}
                            >
                                Cancelar registro
                            </p>
                        </div>
                    )}
                </div>

                {/* Columna derecha */}
                <div style={styles.rightColumn}>
                    <div>
                        <label style={styles.label}>Método de Producción</label>
                        <input type="text" style={styles.input} />
                    </div>
                    <div>
                        <label style={styles.label}>Cantidad por Paquete</label>
                        <input type="text" style={styles.input} />
                    </div>
                    <button style={styles.button}>Enviar solicitud</button>
                </div>
            </div>
        </div>
    );
};

export default MedicamentoForm;
