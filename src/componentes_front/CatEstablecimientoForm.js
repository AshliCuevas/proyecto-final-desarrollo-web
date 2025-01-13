import React, { useState, useEffect } from "react";

const CatEstablecimientoForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        volume: "",
        systemImplementation: "",
        bpmCompliance: "",
        inabieProvider: "",
        sanitaryRejections: "",
        samplingPlans: "",
        comments: "",
    });

    const [backendData, setBackendData] = useState({
        totalScore: 0,
        maxScore: 1, // Evitar división por cero
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await fetch("http://tu-backend-url.com/api/scores");
                if (!response.ok) {
                    throw new Error("Error al obtener datos del backend");
                }
                const data = await response.json();
                setBackendData({
                    totalScore: data.totalScore || 0,
                    maxScore: data.maxScore || 1, // Predeterminado a 1 para evitar errores
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData });
    };

    const percentage = ((backendData.totalScore / backendData.maxScore) * 100).toFixed(2);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.formContainer}>
                    <div style={styles.resultsBox}>
                        <h3>Resultados del BPM</h3>
                        {loading ? (
                            <p>Cargando resultados...</p>
                        ) : error ? (
                            <p style={styles.error}>Error: {error}</p>
                        ) : (
                            <>
                                <p><strong>Total General:</strong> {backendData.totalScore}</p>
                                <p><strong>Total puntos posibles:</strong> {backendData.maxScore}</p>
                                <p><strong>Calificación final:</strong> {percentage}%</p>
                            </>
                        )}
                    </div>
                    <h2 style={styles.title}>Categorización del Establecimiento</h2>

                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label>Volumen de Producción:</label>
                            <select
                                name="volume"
                                value={formData.volume}
                                onChange={handleChange}
                                style={styles.input}
                            >
                                <option value="">Seleccione</option>
                                <option value="3">Grande (&gt;2,000,000 por mes)</option>
                                <option value="2.33">Mediano (800,000 - 2,000,000 por mes)</option>
                                <option value="1.67">Pequeño (200,000 - 800,000 por mes)</option>
                                <option value="1">Micro (&lt;200,000 por mes)</option>
                            </select>
                        </div>

                        <div style={styles.inputGroup}>
                            <label>Implementación del Sistema:</label>
                            <select
                                name="systemImplementation"
                                value={formData.systemImplementation}
                                onChange={handleChange}
                                style={styles.input}
                            >
                                <option value="">Seleccione</option>
                                <option value="3">No tiene implementado el sistema HACCP</option>
                                <option value="2.33">
                                    Tiene implementado el HACCP en el 25% de las líneas de producción
                                </option>
                                <option value="1.67">
                                    Tiene implementado el HACCP en el 75% de las líneas de producción
                                </option>
                                <option value="1">
                                    Tiene implementado el HACCP en todas las líneas de producción
                                </option>
                            </select>
                        </div>

                        <div style={styles.inputGroup}>
                            <label>Cumplimiento con las BPM:</label>
                            <select
                                name="bpmCompliance"
                                value={formData.bpmCompliance}
                                onChange={handleChange}
                                style={styles.input}
                            >
                                <option value="">Seleccione</option>
                                <option value="3">&le; 60%</option>
                                <option value="2.33">&gt; 60% - 70%</option>
                                <option value="1.67">&gt; 70% - 80%</option>
                                <option value="1">&gt; 80%</option>
                            </select>
                        </div>

                        <div style={styles.inputGroup}>
                            <label>Proveedor INABIE:</label>
                            <select
                                name="inabieProvider"
                                value={formData.inabieProvider}
                                onChange={handleChange}
                                style={styles.input}
                            >
                                <option value="">Seleccione</option>
                                <option value="3">
                                    Los productos que elaboran los sirven a nivel nacional
                                </option>
                                <option value="2.33">
                                    Los productos que elaboran los sirven a nivel regional
                                </option>
                                <option value="1.67">
                                    Los productos que elaboran los sirven a nivel local
                                </option>
                                <option value="1">No es suplidor del INABIE</option>
                            </select>
                        </div>

                        <div style={styles.inputGroup}>
                            <label>Rechazos Registros Sanitarios:</label>
                            <select
                                name="sanitaryRejections"
                                value={formData.sanitaryRejections}
                                onChange={handleChange}
                                style={styles.input}
                            >
                                <option value="">Seleccione</option>
                                <option value="3">Tiene más de 2 rechazos en los últimos 5 años</option>
                                <option value="2.33">Tiene 2 rechazos en los últimos 5 años</option>
                                <option value="1.67">Tiene 1 rechazo en los últimos 5 años</option>
                                <option value="1">No tiene ningún rechazo en los últimos 5 años</option>
                            </select>
                        </div>

                        <div style={styles.inputGroup}>
                            <label>Planes de Muestreo:</label>
                            <select
                                name="samplingPlans"
                                value={formData.samplingPlans}
                                onChange={handleChange}
                                style={styles.input}
                            >
                                <option value="">Seleccione</option>
                                <option value="3">No cuenta con plan de muestreo microbiológico</option>
                                <option value="2.33">Plan de muestreo en materias primas</option>
                                <option value="1.67">
                                    Plan de muestreo en áreas de proceso y producto terminado
                                </option>
                                <option value="1">
                                    Plan de muestreo en materias primas y áreas de proceso y producto
                                    terminado
                                </option>
                            </select>
                        </div>

                        <div style={styles.inputGroup}>
                            <label>Comentarios:</label>
                            <textarea
                                name="comments"
                                value={formData.comments}
                                onChange={handleChange}
                                style={styles.textarea}
                                placeholder="Escriba alguna observación o comentario adicional aquí."
                            />
                        </div>

                        <ButtonWithHover>Enviar</ButtonWithHover>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ButtonWithHover = ({ children, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            style={{
                ...styles.button,
                ...(isHovered && styles.buttonHover),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

const styles = {
    container: {
        display: "flex",
        width: "150%",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#e3f2fd",
        margin: 0,
    },
    card: {
        width: "150%",
        maxWidth: "1400px",
        height: "90vh",
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflowY: "auto",
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    title: {
        fontSize: "24px",
        fontWeight: "600",
        color: "#11325b",
        marginBottom: "20px",
    },
    resultsBox: {
        backgroundColor: "#f1f8e9",
        padding: "15px",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
    },
    error: {
        color: "#d32f2f",
        fontWeight: "bold",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },
    input: {
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "14px",
    },
    textarea: {
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "14px",
        minHeight: "100px",
    },
    button: {
        backgroundColor: "#1976d2",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
    buttonHover: {
        backgroundColor: "#1565c0",
    },
};

export default CatEstablecimientoForm;