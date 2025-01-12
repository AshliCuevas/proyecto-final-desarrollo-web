import React, { useState, useEffect } from "react";

const FormularioMedicamento = () => {
    const [formData, setFormData] = useState({
        categoria: "",
        subcategoria: "",
        medicamento: "",
        metodoProduccion: "",
        cantidad: "",
    });
    const [nuevoMedicamento, setNuevoMedicamento] = useState(false);
    const [registroMedicamento, setRegistroMedicamento] = useState({
        nombre: "",
        efectosSecundarios: "",
        funcionMedica: "",
        complejidadMedica: "",
    });
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [complejidades, setComplejidades] = useState([]);

    useEffect(() => {
        fetch("/api/categorias")
            .then((response) => response.json())
            .then((data) => setCategorias(data))
            .catch((error) => console.error("Error al cargar categorías:", error));

        fetch("/api/complejidades")
            .then((response) => response.json())
            .then((data) => setComplejidades(data))
            .catch((error) => console.error("Error al cargar complejidades:", error));
    }, []);

    useEffect(() => {
        if (formData.categoria) {
            fetch(`/api/subcategorias?categoriaId=${formData.categoria}`)
                .then((response) => response.json())
                .then((data) => setSubcategorias(data))
                .catch((error) => console.error("Error al cargar subcategorías:", error));
        } else {
            setSubcategorias([]);
        }
    }, [formData.categoria]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegistroChange = (e) => {
        const { name, value } = e.target;
        setRegistroMedicamento({ ...registroMedicamento, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response1 = await fetch("/api/formulario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response1.ok) throw new Error("Error al enviar el formulario principal");

            if (nuevoMedicamento) {
                const response2 = await fetch("/api/registroMedicamento", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(registroMedicamento),
                });

                if (!response2.ok) throw new Error("Error al registrar el nuevo medicamento");
            }

            alert("Formulario enviado exitosamente");
        } catch (error) {
            console.error(error);
            alert("Hubo un error al enviar el formulario");
        }
    };

    const cancelarRegistro = () => {
        setNuevoMedicamento(false);
        setRegistroMedicamento({
            nombre: "",
            efectosSecundarios: "",
            funcionMedica: "",
            complejidadMedica: "",
        });
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.fieldGroup}>
                    <label style={styles.label}>Categoría</label>
                    <select
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleInputChange}
                        style={styles.select}
                    >
                        <option value="">Seleccione una categoría</option>
                        {categorias.map((cat) => (
                            <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre_categoria}</option>
                        ))}
                    </select>
                </div>

                <div style={styles.fieldGroup}>
                    <label style={styles.label}>Subcategoría</label>
                    <select
                        name="subcategoria"
                        value={formData.subcategoria}
                        onChange={handleInputChange}
                        disabled={!formData.categoria}
                        style={styles.select}
                    >
                        <option value="">Seleccione una subcategoría</option>
                        {subcategorias.map((subcat) => (
                            <option key={subcat.id_subcategoria} value={subcat.id_subcategoria}>{subcat.nombre_subcategoria}</option>
                        ))}
                    </select>
                </div>

                <div style={styles.fieldGroup}>
                    <label style={styles.label}>Medicamento</label>
                    <select
                        name="medicamento"
                        value={formData.medicamento}
                        onChange={handleInputChange}
                        style={styles.select}
                    >
                        <option value="">Seleccione un medicamento</option>
                        {medicamentos.map((med) => (
                            <option key={med.id} value={med.id}>{med.nombre}</option>
                        ))}
                    </select>
                </div>

                <div style={styles.linkContainer}>
                    <a href="#" onClick={() => setNuevoMedicamento(true)} style={styles.link}>
                        ¿No encuentras tu medicamento? Regístralo
                    </a>
                </div>

                {nuevoMedicamento && (
                    <div style={styles.newMedicineContainer}>
                        <h3 style={styles.subtitle}>Registrar Nuevo Medicamento</h3>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Nombre del medicamento</label>
                            <input
                                type="text"
                                name="nombre"
                                value={registroMedicamento.nombre}
                                onChange={handleRegistroChange}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Efectos secundarios</label>
                            <input
                                type="text"
                                name="efectosSecundarios"
                                value={registroMedicamento.efectosSecundarios}
                                onChange={handleRegistroChange}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Función médica</label>
                            <input
                                type="text"
                                name="funcionMedica"
                                value={registroMedicamento.funcionMedica}
                                onChange={handleRegistroChange}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Complejidad médica</label>
                            <select
                                name="complejidadMedica"
                                value={registroMedicamento.complejidadMedica}
                                onChange={handleRegistroChange}
                                style={styles.select}
                            >
                                <option value="">Seleccione una opción</option>
                                {complejidades.map((comp) => (
                                    <option key={comp.id_complejidad} value={comp.id_complejidad}>{comp.nombre_complejidad}</option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.linkContainer}>
                            <a href="#" onClick={cancelarRegistro} style={styles.linkCancel}>Cancelar registro</a>
                        </div>
                    </div>
                )}

                <div style={styles.fieldGroup}>
                    <label style={styles.label}>Método de producción</label>
                    <input
                        type="text"
                        name="metodoProduccion"
                        value={formData.metodoProduccion}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.fieldGroup}>
                    <label style={styles.label}>Cantidad médica por paquete</label>
                    <input
                        type="number"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                </div>

                <button type="submit" style={styles.buttonSubmit}>Enviar</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f3f4f6",
    },
    form: {
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "500px",
    },
    fieldGroup: {
        marginBottom: "15px",
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontWeight: "600",
        color: "#333333",
    },
    input: {
        width: "100%",
        padding: "10px",
        border: "1px solid #cccccc",
        borderRadius: "5px",
        fontSize: "14px",
    },
    select: {
        width: "100%",
        padding: "10px",
        border: "1px solid #cccccc",
        borderRadius: "5px",
        fontSize: "14px",
        backgroundColor: "#ffffff",
    },
    buttonSubmit: {
        backgroundColor: "#0a78b9",
        color: "#ffffff",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "600",
        width: "100%",
        transition: "background-color 0.3s",
    },
    buttonSubmitHover: {
        backgroundColor: "#0d47a1",
    },
    linkContainer: {
        margin: "15px 0",
        textAlign: "center",
    },
    link: {
        color: "#007BFF",
        textDecoration: "none",
        cursor: "pointer",
        fontSize: "14px",
    },
    linkCancel: {
        color: "#888888",
        textDecoration: "none",
        cursor: "pointer",
        fontSize: "14px",
    },
    newMedicineContainer: {
        margin: "20px 0",
        padding: "20px",
        border: "1px solid #cccccc",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
    },
    subtitle: {
        marginBottom: "15px",
        fontSize: "18px",
        fontWeight: "600",
        color: "#333333",
    },
};
export default FormularioMedicamento;
