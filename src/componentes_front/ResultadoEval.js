import React from "react";

const ResultadoEval = ({ riskLevel, weightedSum, comments }) => {
    if (!riskLevel || !weightedSum || comments === undefined) {
        return <p style={styles.error}>Faltan datos para mostrar los resultados.</p>;
    }

    return (
        <div style={styles.overlay}>
            <h2>Resultado de la Evaluación</h2>
            <p><strong>Riesgo del Establecimiento:</strong> {riskLevel}</p>
            <p><strong>Resultado Calculado:</strong> {weightedSum.toFixed(2)}</p>
            <p><strong>Observaciones:</strong> {comments}</p>
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
    error: {
        color: "red",
        fontWeight: "bold",
        textAlign: "center",
    },
};

export default ResultadoEval;
