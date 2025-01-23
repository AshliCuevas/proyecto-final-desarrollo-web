import { fontSize, height, maxHeight } from "@mui/system";
import { useState, useEffect } from "react";

const ListaSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([
    {
      id: 1,
      proveedor: {
        nombre: "Proveedor A",
        rnc: "123456789",
        email: "proveedora@example.com",
        ubicacion: "Ciudad A",
        status: "Activo",
        nivel_riesgo: "Bajo",
        frecuencia: "Mensual",
        categoria: "Categoría 1",
        subcategoria: "Subcategoría 1A",
        medicamento: "Medicina A",
        nombre_riesgo: "Riesgo Bajo",
        metodo_produccion: "Método A",
        fecha_ultima_evaluacion: "2024-01-01",
        fecha_proxima_evaluacion: "2024-07-01",
      },
      estatus: "Pendiente",
    },
    {
      id: 2,
      proveedor: {
        nombre: "Proveedor B",
        rnc: "987654321",
        email: "proveedorb@example.com",
        ubicacion: "Ciudad B",
        status: "Inactivo",
        nivel_riesgo: "Medio",
        frecuencia: "Trimestral",
        categoria: "Categoría 2",
        subcategoria: "Subcategoría 2A",
        medicamento: "Medicina B",
        nombre_riesgo: "Riesgo Medio",
        metodo_produccion: "Método B",
        fecha_ultima_evaluacion: "2024-02-01",
        fecha_proxima_evaluacion: "2024-08-01",
      },
      estatus: "Pendiente",
    },
    {
      id: 3,
      proveedor: {
        nombre: "Proveedor C",
        rnc: "456789123",
        email: "proveedorc@example.com",
        ubicacion: "Ciudad C",
        status: "Activo",
        nivel_riesgo: "Alto",
        frecuencia: "Semestral",
        categoria: "Categoría 3",
        subcategoria: "Subcategoría 3A",
        medicamento: "Medicina C",
        nombre_riesgo: "Riesgo Alto",
        metodo_produccion: "Método C",
        fecha_ultima_evaluacion: "2024-03-01",
        fecha_proxima_evaluacion: "2024-09-01",
      },
      estatus: "Pendiente",
    },
  ]);  

  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [comentarioRechazo, setComentarioRechazo] = useState("");
  const [showRejectOverlay, setShowRejectOverlay] = useState(false);
  const [estatus, setEstatus] = useState("");
  const [filtroEstatus, setFiltroEstatus] = useState("Todos");

  const [proveedor, setProveedor] = useState({
    nombre: '',
    rnc: '',
    email: '',
    ubicacion: '',
    status: '',
    nivel_riesgo: '',
    frecuencia: '',
    categoria: '',
    subcategoria: '',
    medicamento: '',
    nombre_riesgo: '',
    metodo_produccion: '',
    fecha_ultima_evaluacion: '',
    fecha_proxima_evaluacion: '',
  });
  

  const handleRowSelect = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setProveedor(solicitud.proveedor); // Actualiza el proveedor con los datos de la solicitud seleccionada
  };

  const handleOpenReviewModal = () => {
    setEstatus(selectedSolicitud?.estatus);
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setComentarioRechazo("");
  };

  const handleOpenRejectOverlay = () => {
    setShowRejectOverlay(true);
  };

  const handleCloseRejectOverlay = () => {
    setShowRejectOverlay(false);
    setComentarioRechazo("");
  };

  const handleReject = async () => {
    if (selectedSolicitud.estatus !== "Pendiente") {
      alert("No puedes cambiar el estatus de una solicitud ya revisada.");
      return;
    }
  
    if (!comentarioRechazo) {
      alert("Por favor, ingrese un comentario para rechazar.");
      return;
    }
  
    const updatedSolicitudes = solicitudes.map((solicitud) =>
      solicitud.id === selectedSolicitud.id
        ? { ...solicitud, estatus: "Rechazada", comentarioRechazo }
        : solicitud
    );
    setSolicitudes(updatedSolicitudes);
    setShowRejectOverlay(false);
    setShowReviewModal(false);
  };

  const handleApprove = async () => {
    if (selectedSolicitud.estatus !== "Pendiente") {
      alert("No puedes cambiar el estatus de una solicitud ya revisada.");
      return;
    }
  
    const updatedSolicitudes = solicitudes.map((solicitud) =>
      solicitud.id === selectedSolicitud.id
        ? { ...solicitud, estatus: "Aprobada" }
        : solicitud
    );
    setSolicitudes(updatedSolicitudes);
    setShowReviewModal(false);  

    
    const solicitudesFiltradas =
        filtroEstatus === "Todos"
        ? solicitudes
        : solicitudes.filter((solicitud) => solicitud.estatus === filtroEstatus); 
    };
    
    const handleFiltroChange = (e) => {
        setFiltroEstatus(e.target.value);

  };  
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lista de Solicitudes</h1>

    {/* Filtro */}
      <div style={styles.filterContainer}>
            <label htmlFor="filtroEstatus" style={styles.filterLabel}>
              Filtrar por estatus:
            </label>
            <select
              id="filtroEstatus"
              value={filtroEstatus}
              onChange={handleFiltroChange}
              style={styles.dropdown}
            >
              <option value="Todos">Todos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobada">Aprobada</option>
              <option value="Rechazada">Rechazada</option>
            </select>
          </div>   

      {/* Filtro por nombre */}
      <div style={styles.filters}>
        <label style={styles.filterLabel}>Buscar por nombre:</label>
        <input
          type="text"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          style={styles.filterInput}
        />
      </div>

      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Proveedor</th>
            <th style={styles.th}>Medicamento</th>
            <th style={styles.th}>Categoria</th>
            <th style={styles.th}>Estatus</th>
          </tr>
        </thead>
        <tbody style={styles.tbody}>
        {solicitudes
          .filter((solicitud) => 
              (filtroEstatus === "Todos" || solicitud.estatus === filtroEstatus) && 
              solicitud.proveedor.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) // Cambio aquí
          )
          .map((solicitud) => (
              <tr
                  key={solicitud.id}
                  style={selectedSolicitud?.id === solicitud.id ? styles.selectedRow : styles.row}
                  onClick={() => handleRowSelect(solicitud)}
              >
                  <td style={styles.td}>{solicitud.id}</td>
                  <td style={styles.td}>{solicitud.proveedor.nombre}</td> {/* Cambio aquí */}
                  <td style={styles.td}>{solicitud.proveedor.medicamento}</td>
                  <td style={styles.td}>{solicitud.proveedor.categoria}</td>
                  <td style={styles.td}>{solicitud.estatus}</td>

              </tr>
          ))}
            {solicitudes.filter((solicitud) => 
              (filtroEstatus === "Todos" || solicitud.estatus === filtroEstatus) && 
              solicitud.proveedor.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) // Cambio aquí
            ).length === 0 && (
                <tr>
                <td colSpan="5" style={styles.td}>
                    No se encuentran solicitudes
                </td>
                </tr>
            )}
            </tbody>
      </table>

      <button
        style={styles.reviewButton}
        onClick={handleOpenReviewModal}
        disabled={!selectedSolicitud}
        >
            Revisar
        </button>

      {/* Modal de revisión */}
      {showReviewModal && (
        <div style={styles.overlay}>
          <div style={styles.overlayContent}>
            <h2>Revisar Solicitud</h2>
            <div>
          </div>
          <div style={styles.column}>
          <p><strong>Nombre:</strong> {proveedor.nombre}</p>
            <p><strong>RNC:</strong> {proveedor.rnc}</p>
            <p><strong>Email:</strong> {proveedor.email}</p>
            <p><strong>Ubicación:</strong> {proveedor.ubicacion}</p>
            <p><strong>Status:</strong> {proveedor.status}</p>
            <p><strong>Nivel de Riesgo:</strong> {proveedor.nivel_riesgo}</p>
            <p><strong>Frecuencia:</strong> {proveedor.frecuencia}</p>
          <h2 style={styles.subtitle}>Datos de la solicitud</h2>
            <p><strong>Categoría:</strong> {proveedor.categoria}</p>
            <p><strong>Subcategoría:</strong> {proveedor.subcategoria}</p>
            <p><strong>Medicamento:</strong> {proveedor.medicamento}</p>
            <p><strong>Nombre de Riesgo:</strong> {proveedor.nombre_riesgo}</p>
            <p><strong>Metodo de Producción:</strong> {proveedor.metodo_produccion}</p>
            <p><strong>Fecha de Última Evaluación:</strong> {proveedor.fecha_ultima_evaluacion}</p>
            <p><strong>Fecha de Próxima Evaluación:</strong> {proveedor.fecha_proxima_evaluacion}</p>
            </div>

            <div style={styles.buttonContainer}>
              <button onClick={handleCloseReviewModal} style={styles.cancelButton}>
                Cancelar
              </button>
              <button onClick={handleOpenRejectOverlay} style={styles.rejectButton}>
                Rechazar
              </button>
              <button onClick={handleApprove} style={styles.approveButton}>
                Aprobar
              </button>
              
            </div>
            {showRejectOverlay && (
            <div style={styles.overlay}>
                <div style={styles.overlayContent}>
                <h2>Comentario de Rechazo</h2>
                <textarea
                    value={comentarioRechazo}
                    onChange={(e) => setComentarioRechazo(e.target.value)}
                    style={styles.textArea}
                />
                <div style={styles.buttonContainer}>
                    <button onClick={handleCloseRejectOverlay} style={styles.cancelButton}>
                    Cancelar
                    </button>
                    <button onClick={handleReject} style={styles.confirmButton}>
                    Confirmar Rechazo
                    </button>
                    
                </div>
                </div>
            </div>
            )}
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
      justifyContent: "center",
      marginLeft: "0",
    },
    container: {
      margin: "0 auto",
      marginLeft: "-258px",
      maxWidth: "1200px",
      Height: "300px",
      fontFamily: "Poppins, sans-serif",
      color: "#333",
      position: "relative", // Asegura que el contenedor no se vea afectado por desplazamientos globales
    },
   filterContainer: {
    display: "right",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: "750px",
    marginBottom: "-2.5rem",
    gap: "1rem",
  },
   filterLabel: {
    fontSize: "1rem",
    color: "#333",
    marginRight: "0.5rem",
  },
   dropdown: {
    padding: "0.5rem",
    fontSize: "1rem",
    border: "1.5px solid #333",
    borderRadius: "0px",
    marginLeft: "2.25rem",
    width: "200px",
  },
    filters: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "1.5rem",
        alignItems: "center",
        marginLeft: "20px",
      },
      filterLabel: {
        fontSize: "1rem", // Tamaño reducido
        marginLeft: "0.5rem",
        alignSelf: "center",
      },
      filterInput: {
        padding: "0.5rem",
        fontSize: "0.9rem", // Tamaño reducido
        marginRight: "40rem",
        width: "200px",
      },
      table: {
        width: "130%", // Asegura que la tabla ocupe el 100% del contenedor
        maxWidth: "1150px",
        borderCollapse: "collapse",
        marginTop: "0rem",
        marginLeft: "20px",
        marginRight: "auto", // Centra la tabla
        position: "relative", // Hace que la tabla sea pegajosa
        top: 0, // Mantiene la tabla fija en la parte superior cuando se hace scroll
        zIndex: 10, // Asegura que la tabla quede encima de otros elementos al hacer scroll
        backgroundColor: "#fff", // Para evitar que el fondo se mezcle con el contenido de abajo
        maxHeight: "480px",
      },
    thead: {
      tablelayout: "fixed",
      display: "table",
      width: "1137px",
    },
    tbody: {
      tablelayout: "fixed",
      display: "table",
      display:"inline-block",
      maxHeight: "400px", // Establece la altura máxima
      overflowY: "scroll", // Activa el scroll vertical
      minWidth: "1150px",
    },
    th: {
      padding: "0.8rem",
      fontSize: "0.9rem", // Tamaño de letra reducido
      textAlign: "center",
      justifyContent: "center",
      backgroundColor: "#f4f4f4",
      fontWeight: "bold",
      wordBreak: "break-word",
      width: "10%", // Establece un ancho fijo para cada columna
    },
    td: {
      padding: "0.9rem",
      fontSize: "0.9rem",
      textAlign: "center",
      justifyContent: "center",
      borderBottom: "1px solid #ddd",
      wordBreak: "break-word",
      width: "9%", // Establece un ancho fijo para cada columna
    },
    reviewButton: {
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#2196F3",
        color: "white",
        fontSize: "0.9rem",
        border: "none",
        borderRadius: "5px",
        width: "150px",
        height: "40px",
        marginRight: "-999px"
    },
    editButton: {
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        fontSize: "1rem",
        border: "none",
        borderRadius: "5px",
        color: "white",
        marginLeft: "1040px"
      },
    row: {
      cursor: "pointer",
    },
    selectedRow: {
      backgroundColor: "#f0f8ff",
      cursor: "pointer",
    },
    column: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      marginTop: '10px',
      textAlign: 'left',
      padding: '25px',
      gap: '0px',
      border: '2px solid #11325b',
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
      maxWidth: "500px",
      width: "100%",
      textAlign: "center",
      height: "600px",  // Altura fija (ajustar según lo que necesites)
      overflowY: "auto", // Permite el desplazamiento vertical
    },    
    closeButton: {
      marginTop: "1rem",
      padding: "0.5rem 1rem",
      backgroundColor: "#2196F3",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    label: { display: "block", marginTop: "10px", marginBottom: "5px" },
    input: { 
      fixedwidth: "500px", 
      padding: "8px", 
      borderRadius: "4px", 
      border: "1px solid #ccc" 
    },
    buttonContainer: { 
      marginTop: "20px", 
      display: "flex", 
      justifyContent: "space-evenly" 
    },
    confirmButton: { 
      backgroundColor: "#4CAF50", 
      color: "white", 
      padding: "10px 20px", 
      border: "none", 
      borderRadius: "5px", 
      cursor: "pointer" 
    },
    cancelButton: { 
      backgroundColor: "#f44336", 
      color: "white", 
      padding: "10px 20px", 
      border: "none", 
      borderRadius: "5px", 
      cursor: "pointer" 
    },
  };  

export default ListaSolicitudes;