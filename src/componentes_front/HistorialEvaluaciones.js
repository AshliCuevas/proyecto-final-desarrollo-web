import { textAlign } from "@mui/system";
import React, { useState, useEffect } from "react";

const HistorialEvaluaciones = ({ proveedorId }) => {
  const [historial, setHistorial] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // Datos de simulación
  const solicitudesSimuladas = [
    {
      id_solicitud: 1,
      id_proveedor: "101",
      id_medicamento: "Ibuprofeno",
      id_subcategoria: "Antibióticos",
      metodo_produccion: "Sintético",
      cantidad_med: 100,
      status_solicitud: "En proceso",
      comentario: "Solicitud pendiente revisión.",
      nivel_riesgo: "N/A",
      riesgo_tipo: "N/A",
      fecha_evaluacion: "2025-01-10",
      fecha_proxima: "2025-04-10",
    },
    {
      id_solicitud: 2,
      id_proveedor: "101",
      id_medicamento: "Paracetamol",
      id_subcategoria: "Analgésicos",
      metodo_produccion: "Biológico",
      cantidad_med: 200,
      status_solicitud: "Aprobado",
      comentario: "Aprobado por el administrador.",
      nivel_riesgo: "Bajo",
      riesgo_tipo: "Semestral",
      fecha_evaluacion: "2025-01-15",
      fecha_proxima: "2025-07-15",
    },
  ];

  const getProximaEvaluacion = (riesgoTipo, status) => {
    if (status === "En proceso") {
      return "Pendiente";
    }
  
    if (!selectedSolicitud || !selectedSolicitud.fecha_evaluacion) {
      return "Fecha inválida";
    }
  
    const fechaEvaluacion = new Date(selectedSolicitud.fecha_evaluacion);
    if (isNaN(fechaEvaluacion)) {
      return "Fecha inválida";
    }
  
    let nuevaFecha = new Date(fechaEvaluacion);
  
    switch (riesgoTipo) {
      case "Trimestral":
        nuevaFecha.setMonth(nuevaFecha.getMonth() + 3);
        break;
      case "Semestral":
        nuevaFecha.setMonth(nuevaFecha.getMonth() + 6);
        break;
      default:
        nuevaFecha.setMonth(nuevaFecha.getMonth() + 4);
        break;
    }
  
    const day = String(nuevaFecha.getDate()).padStart(2, '0');
    const month = String(nuevaFecha.getMonth() + 1).padStart(2, '0');
    const year = nuevaFecha.getFullYear();
  
    return `${year}-${month}-${day}`;
  };   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (proveedorId) queryParams.append("id_proveedor", proveedorId);
        if (fechaInicio) queryParams.append("fecha_inicio", fechaInicio);
        if (fechaFin) queryParams.append("fecha_fin", fechaFin);

        const response = await fetch(
          `http://localhost:3001/api/evaluacion?${queryParams.toString()}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Error al cargar los datos");
        const data = await response.json();
        setHistorial(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Si ocurre un error, usa datos simulados
        const filtradas = solicitudesSimuladas.filter((solicitud) => {
          const fecha = new Date(solicitud.fecha_evaluacion);
          const inicio = fechaInicio ? new Date(fechaInicio) : null;
          const fin = fechaFin ? new Date(fechaFin) : null;
          return (
            (!inicio || fecha >= inicio) && (!fin || fecha <= fin) && solicitud.id_proveedor === proveedorId
          );
        });
        setHistorial(filtradas);
      }
    };

    fetchData();
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
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>ID Solicitud</th>
            <th style={styles.th}>Medicamento</th>
            <th style={styles.th}>Método de Producción</th>
            <th style={styles.th}>Cantidad Solicitada</th>
            <th style={styles.th}>Estado</th>
            <th style={styles.th}></th> {/* Asegúrate de que esta columna esté siempre presente */}
           {/* Columna para el resumen */}
          </tr>
        </thead>
        <tbody style={styles.tbody}>
        {historial.length === 0 ? (
          <tr>
            <td colSpan="6" style={styles.td}>
              <div style={styles.noDataContainer}>
                <span>No hay solicitudes para mostrar.</span>
              </div>
            </td>
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
            <p><strong>Nivel de Riesgo:</strong> {selectedSolicitud.status_solicitud === "En proceso" ? "Pendiente" : selectedSolicitud.nivel_riesgo}</p>
            <p><strong>Metodo de producción:</strong> {selectedSolicitud.metodo_produccion}</p>
            <p><strong>Frecuencia de Inspección:</strong> {selectedSolicitud.status_solicitud === "En proceso" ? "Pendiente" : selectedSolicitud.riesgo_tipo}</p>
            <p><strong>Fecha de Evaluación:</strong> {selectedSolicitud.fecha_evaluacion}</p>
            <p><strong>Próxima Evaluación:</strong> {getProximaEvaluacion(selectedSolicitud.riesgo_tipo, selectedSolicitud.status_solicitud)}</p>
            <p><strong>Comentario:</strong> {selectedSolicitud.comentario}</p>
            <button onClick={handleCloseOverlay} style={styles.closeButton}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  title: {
    fontSize: "1.75rem",
    marginBottom: "2.5rem",
    marginTop: "1.5rem",
    textAlign: "center",
    marginLeft: "160px",
  },
  container: {
    margin: "0 auto",
    marginLeft: "-242px",
    maxWidth: "1000px",
    fontFamily: "Poppins, sans-serif",
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
    alignItems: "center",
    marginLeft: "60px",
  },
  filterLabel: {
    fontSize: "1rem",
    marginLeft: "1.5rem",
    marginRight: "0.9rem",
    alignSelf: "center",
  },
  filterInput: {
    padding: "0.4rem",
    borderRadius: "8px",
    fontSize: "1rem",
    width: "200px",
  },
  table: {
    width: "112%", // Ajustar el ancho para evitar desbordes
    borderCollapse: "collapse",
    marginTop: "1rem",
    marginLeft: "18px",
    marginRight: "auto",
    tableLayout: "fixed", // Establece un diseño fijo para la tabla
  },
  thead: {
    backgroundColor: "#f4f4f4",
  },
  tbody: {
    overflowY: "scroll", // Habilita el desplazamiento
    maxHeight: "400px",
  },
  th: {
    padding: "1rem",
    fontSize: "0.9rem",
    textAlign: "center",
    fontWeight: "bold",
    wordBreak: "break-word",
  },
  td: {
    padding: "0.9rem",
    fontSize: "0.9rem",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    wordBreak: "break-word",
    width: "16%", // Asegura que las celdas tengan un ancho adecuado
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