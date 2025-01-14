import React, { useState, useEffect } from "react";

const HistorialEvaluaciones = ({ proveedorId, usuarioRol }) => {
  const [historial, setHistorial] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  useEffect(() => {
    // Simula la carga de datos desde una API
    const solicitudes = [
      {
        id_solicitud: 1,
        id_medicamento: "Ibuprofeno",
        id_subcategoria: "Antibióticos",
        metodo_produccion: "Sintético",
        cantidad_med: 100,
        status_solicitud: "En proceso",
        comentario: "Solicitud pendiente revisión.",
        nivel_riesgo: "Alto",
        riesgo_tipo: "Trimestral",
        fecha_evaluacion: "2025-01-10",
        fecha_proxima: "2025-04-10"
      },
      {
        id_solicitud: 2,
        id_medicamento: "Paracetamol",
        id_subcategoria: "Analgésicos",
        metodo_produccion: "Biológico",
        cantidad_med: 200,
        status_solicitud: "Aprobado",
        comentario: "Aprobado por el administrador.",
        nivel_riesgo: "Bajo",
        riesgo_tipo: "Semestral",
        fecha_evaluacion: "2025-01-15",
        fecha_proxima: "2025-04-10"
      }
    ];

    // Filtra las solicitudes del proveedor que inició sesión
    const solicitudesProveedor = solicitudes.filter(
      (solicitud) => solicitud.id_proveedor === proveedorId
    );

    // Filtrar por fechas si las fechas de inicio y fin están definidas
    const filteredSolicitudes = solicitudesProveedor.filter((solicitud) => {
      const fechaEvaluacion = new Date(solicitud.fecha_evaluacion);
      const fechaInicioObj = fechaInicio ? new Date(fechaInicio) : null;
      const fechaFinObj = fechaFin ? new Date(fechaFin) : null;

      return (
        (!fechaInicioObj || fechaEvaluacion >= fechaInicioObj) &&
        (!fechaFinObj || fechaEvaluacion <= fechaFinObj)
      );
    });

    setHistorial(filteredSolicitudes);
  }, [proveedorId, fechaInicio, fechaFin]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "En proceso":
        return { backgroundColor: "#2196F3", color: "white" };
      case "Aprobado":
        return { backgroundColor: "#4CAF50", color: "white" };
      case "Reprobado":
        return { backgroundColor: "#f44336", color: "white" };
      default:
        return {};
    }
  };

  const handleOpenOverlay = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setSelectedSolicitud(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Historial de Evaluaciones</h1>

      {/* Filtros de fecha */}
      <div style={styles.filters}>
        <label style={styles.filterLabel}>Fecha de Inicio:</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          style={styles.filterInput}
        />
        <label style={styles.filterLabel}>Fecha de Fin:</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          style={styles.filterInput}
        />
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID Solicitud</th>
            <th style={styles.th}>Medicamento</th>
            <th style={styles.th}>Método de Producción</th>
            <th style={styles.th}>Cantidad Solicitada</th>
            <th style={styles.th}>Estado</th>
            {usuarioRol === "admin" && (
              <>
                <th style={styles.th}>Proveedor</th>
                <th style={styles.th}>Inspector</th>
              </>
            )}
            {usuarioRol === "inspector" && <th style={styles.th}>Proveedor</th>}
            <th style={styles.th}></th> {/* Columna para el resumen */}
          </tr>
        </thead>
        <tbody>
          {historial.length === 0 ? (
            <tr>
              <td colSpan="7" style={styles.td}>No hay solicitudes para mostrar.</td>
            </tr>
          ) : (
            historial.map((solicitud) => (
              <tr key={solicitud.id_solicitud}>
                <td style={styles.td}>{solicitud.id_solicitud}</td>
                <td style={styles.td}>{solicitud.id_medicamento}</td>
                <td style={styles.td}>{solicitud.metodo_produccion}</td>
                <td style={styles.td}>{solicitud.cantidad_med}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.status,
                      ...getStatusStyle(solicitud.status_solicitud),
                    }}
                  >
                    {solicitud.status_solicitud}
                  </span>
                </td>
                <td style={styles.td}>
                  <span
                    style={styles.resumen}
                    onClick={() => handleOpenOverlay(solicitud)}
                  >
                    Ver resumen
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Overlay con el resumen de la solicitud */}
      {showOverlay && selectedSolicitud && (
        <div style={styles.overlay}>
          <div style={styles.overlayContent}>
            <h2>Resumen de la Evaluación</h2>
            <p><strong>Medicamento:</strong> {selectedSolicitud.id_medicamento}</p>
            <p><strong>Categoría:</strong> {selectedSolicitud.id_subcategoria}</p>
            <p><strong>Subcategoría:</strong> {selectedSolicitud.id_subcategoria}</p>
            <p><strong>Comentario:</strong> {selectedSolicitud.comentario}</p>
            <p><strong>Nivel de Riesgo:</strong> {selectedSolicitud.nivel_riesgo}</p>
            <p><strong>Frecuencia de Inspección:</strong> {selectedSolicitud.riesgo_tipo}</p>
            <p><strong>Fecha de Evaluación:</strong> {selectedSolicitud.fecha_evaluacion}</p>
            <p><strong>Próxima Evaluación:</strong> {selectedSolicitud.riesgo_tipo === "Trimestral" ? "Dentro de 3 meses" : selectedSolicitud.riesgo_tipo === "Semestral" ? "Dentro de 6 meses" : "Dentro de 4 meses"}</p>
            <button onClick={handleCloseOverlay} style={styles.closeButton}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  title: {
    fontSize: "1.75rem", // Tamaño de letra reducido
    marginBottom: "2.5rem",
    marginTop: "1.5rem",
    textAlign: "center",
    marginLeft: "155px",
  },
  container: {
    margin: "0 auto",
    marginLeft: "-240px",
    maxWidth: "900px",
    fontFamily: "Poppins, sans-serif",
    color: "#333",
    position: "relative", // Asegura que el contenedor no se vea afectado por desplazamientos globales
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
    alignItems: "center",
    marginLeft: "60px",
  },
  filterLabel: {
    fontSize: "1rem", // Tamaño reducido
    marginLeft: "0.9rem",
    marginRight: "0.9rem",
    alignSelf: "center",
  },
  filterInput: {
    padding: "0.5rem",
    fontSize: "0.9rem", // Tamaño reducido
    width: "200px",
  },
  table: {
    width: "130%", // Cambié el 130% para evitar que la tabla sobresalga
    maxWidth: "1200px",
    borderCollapse: "collapse",
    marginTop: "1rem",
    overflowX: "auto", // Añade desplazamiento horizontal solo si es necesario
    marginLeft: "auto",
    marginRight: "auto", // Centra la tabla
  },
  th: {
    padding: "1rem",
    fontSize: "0.9rem", // Tamaño de letra reducido
    textAlign: "center",
    backgroundColor: "#f4f4f4",
    fontWeight: "bold",
    wordBreak: "break-word",
  },
  td: {
    padding: "0.8rem",
    fontSize: "0.9rem",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    wordBreak: "break-word",
  },
  status: {
    padding: "0.3rem 1rem",
    textAlign: "center",
    borderRadius: "20px",
    textTransform: "capitalize",
  },
  resumen: {
    color: "lightblue",
    textDecoration: "underline",
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  overlayContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "600px",
    width: "100%",
    textAlign: "left",
  },
  closeButton: {
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default HistorialEvaluaciones;