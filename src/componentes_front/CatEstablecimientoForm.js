import React, { useState, useEffect } from "react";
import ResultadoEval from "./ResultadoEval";
import { useLocation, useNavigate } from "react-router-dom";


const CatEstablecimientoForm = ({ onSubmit }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { totalScore = 0, totalPossible = 0 } = location.state || {};


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
                const response = await fetch("http://localhost:3001/api/scores");
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

        // Convertir valores de los campos seleccionados a números
        const weights = [
            parseFloat(formData.volume || 0),
            parseFloat(formData.systemImplementation || 0),
            parseFloat(formData.bpmCompliance || 0),
            parseFloat(formData.inabieProvider || 0),
            parseFloat(formData.sanitaryRejections || 0),
            parseFloat(formData.samplingPlans || 0),
        ];

        // Multiplicar cada valor por sus respectivos factores de ponderación
        const factors = [0.16, 0.09, 0.56, 0.05, 0.06, 0.08];
        const weightedSum = weights.reduce(
            (sum, value, index) => sum + value * factors[index],
            0
        );

        // Determinar el riesgo del establecimiento
        let riskLevel = "Riesgo Bajo";
        if (weightedSum >= 3.6 && weightedSum <= 6.3) {
            riskLevel = "Riesgo Medio";
        } else if (weightedSum > 6.3) {
            riskLevel = "Riesgo Alto";
        }

        // Navegar al componente ResultadoEval con los datos calculados
        navigate("/ResultadoEval", {
            state: {
                riskLevel,
                weightedSum: weightedSum.toFixed(2),
                comments: formData.comments,
            },
        });
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
        width: "1060px",  // Ancho fijo para el contenedor
        alignItems: "center",  // Centra los elementos dentro del contenedor
        height: "100vh",  // Ocupa toda la altura de la ventana
        margin: 0,  // Elimina cualquier margen adicional
        position: "fixed",  // Fija el contenedor en la pantalla
        top: "0",  // Asegura que esté en la parte superior de la página
        left: "340px",  // Alinea el contenedor a la izquierda
        zIndex: 9999,  // Asegura que esté por encima de otros elementos
        overflow: "hidden",  // Evita que el contenedor se desplace al cambiar de sección
    },
    card: {
        width: "100%",  // Asegura que el card ocupe todo el ancho del contenedor
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
        fontWeight: "620",
        marginTop: "0",
        color: "#11325b",
        marginBottom: "20px",
    },
    resultsBox: {
        backgroundColor: "#d3fdff",
        color: "#11325b",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.15)",
        marginBottom: "20px",
    },
    error: {
        color: "#d32f2f",
        fontWeight: "bold",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
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