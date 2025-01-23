//AQUI HAY QUE PASARLE EL TIPO DE USER (SI ES INSPECTOR O PROVEEDOR) Y SU ID

import React, { useState, useEffect } from "react";

const ResultadoEval = ({ userType, userId }) => {
    const [evaluacion, setEvaluacion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvaluacion = async () => {
            setLoading(true);
            try {
                let url = "http://localhost:3001/evaluacion";
                if (userType === "inspector") {
                    url += `?id_inspector=${userId}`;
                } else if (userType === "proveedor") {
                    url += `?id_proveedor=${userId}`;
                } else {
                    throw new Error("Tipo de usuario no válido.");
                }

                const response = await fetch(url, {
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al obtener las evaluaciones.");
                }

                const data = await response.json();

                // Ordenar las evaluaciones por fecha descendente y tomar la última
                const ultimaEvaluacion = data.sort(
                    (a, b) => new Date(b.fecha) - new Date(a.fecha)
                )[0];

                setEvaluacion(ultimaEvaluacion || null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvaluacion();
    }, [userType, userId]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!evaluacion) return <p>No hay evaluaciones disponibles.</p>;

    return (
        <div style={styles.overlay}>
            <h2>Resultado de la Última Evaluación</h2>
            <p><strong>Inspector:</strong> {evaluacion.nombre_inspector}</p>
            <p><strong>Riesgo del Establecimiento:</strong> {evaluacion.riesgo_establecimiento}</p>
            <p><strong>Resultado:</strong> {evaluacion.resultado}</p>
            <p><strong>Observación:</strong> {evaluacion.observacion}</p>
        </div>
    );
};

const styles = {
    overlay: {
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        maxWidth: "400px",
        margin: "20px auto",
        textAlign: "left",
    },
};

export default ResultadoEval;