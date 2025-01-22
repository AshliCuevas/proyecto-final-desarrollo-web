import { display, minWidth } from "@mui/system";
import { AlignCenter } from "lucide-react";
import React, { useState, useEffect } from "react";

const HistorialEvaluacionesIns = ({ usertype }) => {
  const [historial, setHistorial] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // Simulación del ID del inspector logueado
  const inspectorId = "INS001";

  useEffect(() => {
    // Datos simulados de solicitudes con ID del inspector
    const solicitudes = [
      {
        id_solicitud: 1,
        id_medicamento: "Ibuprofeno",
        id_subcategoria: "Antibióticos",
        metodo_produccion: "Sintético",
        cantidad_med: 100,
        status_solicitud: "En proceso",
        id_inspector: "INS001",
        proveedor: "Proveedor A",
        comentario: "Solicitud pendiente revisión.",
        nivel_riesgo: "Alto",
        riesgo_tipo: "Trimestral",
        fecha_evaluacion: "2025-01-10",
        fecha_proxima: "2025-04-10",
      },
      {
        id_solicitud: 2,
        id_medicamento: "Paracetamol",
        id_subcategoria: "Analgésicos",
        metodo_produccion: "Biológico",
        cantidad_med: 200,
        status_solicitud: "Completado",
        id_inspector: "INS002",
        proveedor: "Proveedor B",
        comentario: "Aprobado por el administrador.",
        nivel_riesgo: "Bajo",
        riesgo_tipo: "Semestral",
        fecha_evaluacion: "2025-01-15",
        fecha_proxima: "2025-07-15",
      },
      {
        id_solicitud: 3,
        id_medicamento: "Amoxicilina",
        id_subcategoria: "Antibióticos",
        metodo_produccion: "Sintético",
        cantidad_med: 300,
        status_solicitud: "Completado",
        id_inspector: "INS001",
        proveedor: "Proveedor A",
        comentario: "No cumple con los estándares mínimos.",
        nivel_riesgo: "Crítico",
        riesgo_tipo: "Mensual",
        fecha_evaluacion: "2025-01-20",
        fecha_proxima: "2025-02-20",
      },
      {
        id_solicitud: 2,
        id_medicamento: "Paracetamol",
        id_subcategoria: "Analgésicos",
        metodo_produccion: "Biológico",
        cantidad_med: 200,
        status_solicitud: "Completado",
        id_inspector: "INS002",
        proveedor: "Proveedor B",
        comentario: "Aprobado por el administrador.",
        nivel_riesgo: "Bajo",
        riesgo_tipo: "Semestral",
        fecha_evaluacion: "2025-01-15",
        fecha_proxima: "2025-07-15",
      },
      {
        id_solicitud: 3,
        id_medicamento: "Amoxicilina",
        id_subcategoria: "Antibióticos",
        metodo_produccion: "Sintético",
        cantidad_med: 300,
        status_solicitud: "Completado",
        id_inspector: "INS001",
        proveedor: "Proveedor A",
        comentario: "No cumple con los estándares mínimos.",
        nivel_riesgo: "Crítico",
        riesgo_tipo: "Mensual",
        fecha_evaluacion: "2025-01-20",
        fecha_proxima: "2025-02-20",
      },
      {
        id_solicitud: 2,
        id_medicamento: "Paracetamol",
        id_subcategoria: "Analgésicos",
        metodo_produccion: "Biológico",
        cantidad_med: 200,
        status_solicitud: "Completado",
        id_inspector: "INS002",
        proveedor: "Proveedor B",
        comentario: "Aprobado por el administrador.",
        nivel_riesgo: "Bajo",
        riesgo_tipo: "Semestral",
        fecha_evaluacion: "2025-01-15",
        fecha_proxima: "2025-07-15",
      },
      {
        id_solicitud: 3,
        id_medicamento: "Amoxicilina",
        id_subcategoria: "Antibióticos",
        metodo_produccion: "Sintético",
        cantidad_med: 300,
        status_solicitud: "Completado",
        id_inspector: "INS001",
        proveedor: "Proveedor A",
        comentario: "No cumple con los estándares mínimos.",
        nivel_riesgo: "Crítico",
        riesgo_tipo: "Mensual",
        fecha_evaluacion: "2025-01-20",
        fecha_proxima: "2025-02-20",
      },
      {
        id_solicitud: 2,
        id_medicamento: "Paracetamol",
        id_subcategoria: "Analgésicos",
        metodo_produccion: "Biológico",
        cantidad_med: 200,
        status_solicitud: "Completado",
        id_inspector: "INS002",
        proveedor: "Proveedor B",
        comentario: "Aprobado por el administrador.",
        nivel_riesgo: "Bajo",
        riesgo_tipo: "Semestral",
        fecha_evaluacion: "2025-01-15",
        fecha_proxima: "2025-07-15",
      },
      {
        id_solicitud: 3,
        id_medicamento: "Amoxicilina",
        id_subcategoria: "Antibióticos",
        metodo_produccion: "Sintético",
        cantidad_med: 300,
        status_solicitud: "Completado",
        id_inspector: "INS001",
        proveedor: "Proveedor A",
        comentario: "No cumple con los estándares mínimos.",
        nivel_riesgo: "Crítico",
        riesgo_tipo: "Mensual",
        fecha_evaluacion: "2025-01-20",
        fecha_proxima: "2025-02-20",
      },
      {
        id_solicitud: 2,
        id_medicamento: "Paracetamol",
        id_subcategoria: "Analgésicos",
        metodo_produccion: "Biológico",
        cantidad_med: 200,
        status_solicitud: "Completado",
        id_inspector: "INS002",
        proveedor: "Proveedor B",
        comentario: "Aprobado por el administrador.",
        nivel_riesgo: "Bajo",
        riesgo_tipo: "Semestral",
        fecha_evaluacion: "2025-01-15",
        fecha_proxima: "2025-07-15",
      },
      {
        id_solicitud: 3,
        id_medicamento: "Amoxicilina",
        id_subcategoria: "Antibióticos",
        metodo_produccion: "Sintético",
        cantidad_med: 300,
        status_solicitud: "Completado",
        id_inspector: "INS001",
        proveedor: "Proveedor A",
        comentario: "No cumple con los estándares mínimos.",
        nivel_riesgo: "Crítico",
        riesgo_tipo: "Mensual",
        fecha_evaluacion: "2025-01-20",
        fecha_proxima: "2025-02-20",
      },
      {
        id_solicitud: 2,
        id_medicamento: "Paracetamol",
        id_subcategoria: "Analgésicos",
        metodo_produccion: "Biológico",
        cantidad_med: 200,
        status_solicitud: "Completado",
        id_inspector: "INS002",
        proveedor: "Proveedor B",
        comentario: "Aprobado por el administrador.",
        nivel_riesgo: "Bajo",
        riesgo_tipo: "Semestral",
        fecha_evaluacion: "2025-01-15",
        fecha_proxima: "2025-07-15",
      },
      {
        id_solicitud: 3,
        id_medicamento: "Amoxicilina",
        id_subcategoria: "Antibióticos",
        metodo_produccion: "Sintético",
        cantidad_med: 300,
        status_solicitud: "Completado",
        id_inspector: "INS001",
        proveedor: "Proveedor A",
        comentario: "No cumple con los estándares mínimos.",
        nivel_riesgo: "Crítico",
        riesgo_tipo: "Mensual",
        fecha_evaluacion: "2025-01-20",
        fecha_proxima: "2025-02-20",
      },
      {
        id_solicitud: 2,
        id_medicamento: "Paracetamol",
        id_subcategoria: "Analgésicos",
        metodo_produccion: "Biológico",
        cantidad_med: 200,
        status_solicitud: "Completado",
        id_inspector: "INS002",
        proveedor: "Proveedor B",
        comentario: "Aprobado por el administrador.",
        nivel_riesgo: "Bajo",
        riesgo_tipo: "Semestral",
        fecha_evaluacion: "2025-01-15",
        fecha_proxima: "2025-07-15",
      },
      {
        id_solicitud: 3,
        id_medicamento: "Amoxicilina",
        id_subcategoria: "Antibióticos",
        metodo_produccion: "Sintético",
        cantidad_med: 300,
        status_solicitud: "Completado",
        id_inspector: "INS001",
        proveedor: "Proveedor A",
        comentario: "No cumple con los estándares mínimos.",
        nivel_riesgo: "Crítico",
        riesgo_tipo: "Mensual",
        fecha_evaluacion: "2025-01-20",
        fecha_proxima: "2025-02-20",
      },
      {
        id_solicitud: 2,
        id_medicamento: "Paracetamol",
        id_subcategoria: "Analgésicos",
        metodo_produccion: "Biológico",
        cantidad_med: 200,
        status_solicitud: "Completado",
        id_inspector: "INS002",
        proveedor: "Proveedor B",
        comentario: "Aprobado por el administrador.",
        nivel_riesgo: "Bajo",
        riesgo_tipo: "Semestral",
        fecha_evaluacion: "2025-01-15",
        fecha_proxima: "2025-07-15",
      },
      {
        id_solicitud: 3,
        id_medicamento: "Amoxicilina",
        id_subcategoria: "Antibióticos",
        metodo_produccion: "Sintético",
        cantidad_med: 300,
        status_solicitud: "Completado",
        id_inspector: "INS001",
        proveedor: "Proveedor A",
        comentario: "No cumple con los estándares mínimos.",
        nivel_riesgo: "Crítico",
        riesgo_tipo: "Mensual",
        fecha_evaluacion: "2025-01-20",
        fecha_proxima: "2025-02-20",
      },{
        id_solicitud: 2,
        id_medicamento: "Paracetamol",
        id_subcategoria: "Analgésicos",
        metodo_produccion: "Biológico",
        cantidad_med: 200,
        status_solicitud: "Completado",
        id_inspector: "INS002",
        proveedor: "Proveedor B",
        comentario: "Aprobado por el administrador.",
        nivel_riesgo: "Bajo",
        riesgo_tipo: "Semestral",
        fecha_evaluacion: "2025-01-15",
        fecha_proxima: "2025-07-15",
      },
      {
        id_solicitud: 3,
        id_medicamento: "Amoxicilina",
        id_subcategoria: "Antibióticos",
        metodo_produccion: "Sintético",
        cantidad_med: 300,
        status_solicitud: "Completado",
        id_inspector: "INS001",
        proveedor: "Proveedor A",
        comentario: "No cumple con los estándares mínimos.",
        nivel_riesgo: "Crítico",
        riesgo_tipo: "Mensual",
        fecha_evaluacion: "2025-01-20",
        fecha_proxima: "2025-02-20",
      },
    ];

    // Filtrar solicitudes realizadas por el inspector logueado
    const solicitudesInspector = solicitudes.filter(
      (solicitud) => solicitud.id_inspector === inspectorId
    );

    // Filtrar por estado y rango de fechas
    const filteredSolicitudes = solicitudesInspector.filter((solicitud) => {
      const fechaEvaluacion = new Date(solicitud.fecha_evaluacion);
      const fechaInicioObj = fechaInicio ? new Date(fechaInicio) : null;
      const fechaFinObj = fechaFin ? new Date(fechaFin) : null;

      // Filtrar solo los estados "En proceso" y "Completado"
      const estadoValido =
        solicitud.status_solicitud === "En proceso" ||
        solicitud.status_solicitud === "Completado";

      return (
        estadoValido &&
        (!fechaInicioObj || fechaEvaluacion >= fechaInicioObj) &&
        (!fechaFinObj || fechaEvaluacion <= fechaFinObj)
      );
    });

    setHistorial(filteredSolicitudes);
  }, [inspectorId, fechaInicio, fechaFin]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "En proceso":
        return { backgroundColor: "#2196F3", color: "white" };
      case "Completado":
        return { backgroundColor: "#4CAF50", color: "white" };
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
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Medicamento</th>
            <th style={styles.th}>Método de Producción</th>
            <th style={styles.th}>Cantidad Solicitada</th>
            <th style={styles.th}>Estado</th>
            <th style={styles.th}>Proveedor</th>
            <th style={styles.th}>     </th> {/* Columna para el resumen */}
          </tr>
        </thead>
        <tbody style={styles.tbody} >
          {historial.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ 
                textAlign: "center", 
                padding: "1rem", 
                color: "#666", 
                fontSize: "0.9rem", 
                backgroundColor: "#ffffff",
                borderBottom: "1.5px solid #ddd", 
                width: "1100px" 
              }}>
                No hay solicitudes para mostrar.
              </td>
            </tr>
          ) : (
            historial.map((solicitud, index) => (
              <tr key={solicitud.id_solicitud}>
                <tr key={index}></tr>
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
                <td style={styles.td}>{solicitud.proveedor}</td>
                <td style={styles.td}>
                  <span
                    style={styles.resumen}
                    onClick={() => handleOpenOverlay(solicitud)}
                  >
                    Resumen
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Overlay con el resumen */}
      {showOverlay && selectedSolicitud && (
        <div style={styles.overlay}>
          <div style={styles.overlayContent}>
            <h2>Resumen de la Evaluación</h2>
            <p><strong>Medicamento:</strong> {selectedSolicitud.id_medicamento}</p>
            <p><strong>Categoría:</strong> {selectedSolicitud.id_subcategoria}</p>
            <p><strong>Comentario:</strong> {selectedSolicitud.comentario}</p>
            <p><strong>Proveedor:</strong> {selectedSolicitud.proveedor}</p>
            <p><strong>Nivel de Riesgo:</strong> {selectedSolicitud.nivel_riesgo}</p>
            <p><strong>Frecuencia de Inspección:</strong> {selectedSolicitud.riesgo_tipo}</p>
            <p><strong>Fecha de Evaluación:</strong> {selectedSolicitud.fecha_evaluacion}</p>
            <p><strong>Próxima Evaluación:</strong> {selectedSolicitud.fecha_proxima}</p>
            <button onClick={handleCloseOverlay} style={styles.closeButton}>
              Cerrar
            </button>
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
    marginRight: "0.5rem",
    alignSelf: "center",
  },
  filterInput: {
    padding: "0.5rem",
    fontSize: "0.9rem", // Tamaño reducido
    width: "200px",
  },
  table: {
    width: "140%", // Asegura que la tabla ocupe el 100% del contenedor
    maxWidth: "1100px",
    borderCollapse: "collapse",
    marginTop: "1rem",
    marginLeft: "20px",
    marginRight: "auto", // Centra la tabla
    position: "relative", // Hace que la tabla sea pegajosa
    top: 0, // Mantiene la tabla fija en la parte superior cuando se hace scroll
    zIndex: 10, // Asegura que la tabla quede encima de otros elementos al hacer scroll
    backgroundColor: "#fff", // Para evitar que el fondo se mezcle con el contenido de abajo  
  },
  thead: {
    tablelayout: "fixed",
    display: "table",
    width: "99%",
  },
  tbody: {
    tablelayout: "fixed",
    display: "table",
    display:"inline-block",
    maxHeight: "400px", // Establece la altura máxima
    overflowY: "scroll", // Activa el scroll vertical
    minWidth: "1100px",
  },
  tbodyWithScroll: {
    // Esto se asegura de que no se sobrepase la altura cuando hay más de 9 filas
    maxHeight: "400px",
    overflowY: "hidden",
  },
  th: {
    padding: "0.8rem",
    fontSize: "0.9rem", // Tamaño de letra reducido
    textAlign: "center",
    backgroundColor: "#f4f4f4",
    fontWeight: "bold",
    wordBreak: "break-word",
    width: "10%", // Establece un ancho fijo para cada columna
  },
  td: {
    padding: "0.9rem",
    fontSize: "0.9rem",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    wordBreak: "break-word",
    width: "230px", // Establece un ancho fijo para cada columna
  },
  emptyRow: {
    width: "140%", // Mismo ancho que la tabla
    maxWidth: "1100px", // Alineado con la tabla
    textAlign: "center",
    margin: "0 auto",
    padding: "1rem",
    color: "#666", // Color más claro para diferenciarlo
    fontSize: "0.9rem",
    backgroundColor: "#f9f9f9", // Opcional, para resaltar el área vacía
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

  export default HistorialEvaluacionesIns;