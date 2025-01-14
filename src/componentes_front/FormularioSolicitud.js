import { borderBottom, borderRight, margin, textAlign, width } from "@mui/system";
import React, { useState, useEffect } from "react";

// Estilos del componente (sin cambios)
const styles = {
    container: {
        display: "flex",
        justifyContent: "left",
        margintop: "25px",
        alignItems: "flex-start",
        position: "relative",
        marginLeft: "-240px",
        maxWidth: "1900px",
        height: "94vh",
        backgroundColor: "#ffffff",
        padding: "0px",
    },
    card: {
        display: "flex",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        margintop: "25px",
        width: "100%",
        height: "94vh",
        maxWidth: "1200px",
        marginleft: "-1000px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "20px",
    },
    formContainer: {
        flex: 3,
        display: "flex",
        marginleft: "-250px",
        flexDirection: "column",
        gap: "20px",
    },
    title: {
        fontSize: "32px",
        fontWeight: "600",
        color: "#11325b",
        marginBottom: "20px",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
    },
    label: {
        fontSize: "16px",
        color: "#11325b",
        fontFamily: "'Poppins', sans-serif",
        marginBottom: "10px",
    },
    input: {
        padding: "7px",
        borderRadius: "8px",
        border: "1px solid #11325b",
        fontSize: "16px",
        outline: "none",
        fontFamily: "'Poppins', sans-serif",
        width: "89%",
    },
    dropdowns: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2px",
    },
    tableContainer: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        maxHeight: "90%",
        marginLeft: "5px",
        overflowY: "auto",  // Agregado para scroll en la tabla
        width: "100%",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "center",
        fontSize: "14px",
    },
    tableHeader: {
        backgroundColor: "#f1f1f1",
        padding: "1rem",
        wordBreak: "break-word",
        fontWeight: "bold",
    },
    tableRow: {
        borderBottom: "1px solid #ddd",
        padding: "1rem",
    },
    checkbox: {
        marginRight: "10px",
    },
    hyperlink: {
        color: "#1e88e5",
        textDecoration: "underline",
        marginLeft: "10px",
        textAlign: "Left",
        fontSize: "16px",
        cursor: "pointer",
    },
    rightColumn: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
        paddingTop: "22rem", // Agregado para mover el contenido hacia abajo
        marginTop: "5rem", // Posición del borde
        marginLeft: "20px",
        borderLeft: "1px solid #ddd",
    },    
    button: {
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "#0a78b9",
        color: "#fff",
        border: "none",
        fontSize: "16px",
        cursor: "pointer",
        fontFamily: "'Poppins', sans-serif",
    },
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        alignItems: "center", 
        flexDirection: "column",  // Asegura que los elementos dentro estén en columna
        width: "600px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    },
    modalHeader: {
        fontSize: "22px",
        fontWeight: "bold",
        justifyContent: "center",
        marginBottom: "2.5px",
    },
    modalBody: {
        display: "flex",
        marginBottom: "5px",
        alignItems: "center",  
        flexDirection: "column",
        gap: "15px",
    },
    
    closeButton: {
        backgroundColor: "#f44336",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        width: "150px",
        padding: "12px",
        marginTop: "20px",
        marginRight: "10px",
        fontSize: "14px",
        cursor: "pointer",
        alignSelf: "flex-end",
    },
    SendButton: {
        backgroundColor: "#0a78b9",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        marginLeft: "10px",
        width: "150px",
        padding: "12px",
        marginTop: "20px",
        fontSize: "14px",
        cursor: "pointer",
        alignSelf: "flex-end",
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

    const handleCloseModal = () => {
        setShowNewMedForm(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Formulario principal */}
                <div style={styles.formContainer}>
                    <h1 style={styles.title}>Formulario de Solicitud</h1>

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

                    {/* Modal para nuevo medicamento */}
                    {showNewMedForm && (
                    <div style={styles.overlay}>
                        <div style={styles.modal}>
                            <div style={styles.modalHeader}>Registrar Medicamento</div>
                            <div style={styles.modalBody}>
                                <label style={styles.label}>Nombre del Medicamento</label>
                                <input type="text" style={styles.input} placeholder="Nombre" />

                                {/* Dropdowns de categoría y subcategoría dentro del modal */}
                                <div style={styles.dropdowns}>
                                    <div>
                                        <label style={styles.label}>Categoría</label>
                                        <select
                                            style={styles.input}
                                            value={selectedCategoria}
                                            onChange={handleCategoriaChange}
                                        >
                                            <option value="">Selecciona una categoría</option>
                                            {categorias.map((cat) => (
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
        
                                <label style={styles.label}>Función</label>
                                <input type="text" style={styles.input} placeholder="Función" />
                                
                                <label style={styles.label}>Efectos Secundarios</label>
                                <input type="text" style={styles.input} placeholder="Efectos Secundarios" />
                                
                                <label style={styles.label}>Complejidad</label>
                                <select style={styles.input}>
                                    <option value="">Selecciona una complejidad</option>
                                    {complejidades.map(c => (
                                        <option key={c.id_complejidad} value={c.id_complejidad}>{c.nombre_complejidad}</option>
                                    ))}
                                </select>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                    <div>
                                        <label style={styles.label}>Método de Producción</label>
                                        <input type="text" style={styles.input} placeholder="Método" />
                                    </div>
                                    <div>
                                        <label style={styles.label}>Cantidad por Paquete</label>
                                        <input type="text" style={styles.input} placeholder="Cantidad" />
                                    </div>
                                </div>
                            </div>
                            <button style={styles.closeButton} onClick={handleCancelClick}>Cancelar registro</button>
                            <button style={styles.SendButton}>Enviar Solicitud</button>
                        </div>
                    </div>
                    )}
                </div>

                {/* Columna derecha */}
                <div style={styles.rightColumn}>
                <div>
                            <label style={styles.label}>Método de Producción</label>
                            <input
                                type="text"
                                style={{
                                    ...styles.input, 
                                    backgroundColor: !selectedMedicamento ? "#e5e6e6" : "#ffffff"
                                }}
                                disabled={!selectedMedicamento}
                            />
                        </div>
                        <div>
                            <label style={styles.label}>Cantidad por Paquete</label>
                            <input
                                type="text"
                                style={{
                                    ...styles.input, 
                                    backgroundColor: !selectedMedicamento ? "#e5e6e6" : "#ffffff"
                                }}
                                disabled={!selectedMedicamento}
                            />
                        </div>
                        <button
                            style={styles.button}
                            disabled={!selectedMedicamento}
                        >
                            Enviar solicitud
                        </button>
                </div>
            </div>
        </div>
    );
};

export default MedicamentoForm;