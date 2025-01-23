import { fontSize, maxHeight } from "@mui/system";
import React, { useState, useEffect } from "react";
const ListaProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [showDetailsOverlay, setShowDetailsOverlay] = useState(false);
  const [showAssignOverlay, setShowAssignOverlay] = useState(false);
  const [inspectores, setInspectores] = useState([]);
  const [selectedInspector, setSelectedInspector] = useState("");
  const [fechaAsignacion, setFechaAsignacion] = useState(new Date().toISOString().slice(0, 10));
  const [selectedDate, setSelectedDate] = useState("");
  const [showOverlay, setShowOverlay] = useState(false); // Definir correctamente showOverlay y setShowOverlay

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/proveedor");
        const dataProveedores = await response.json();
        
        // Filtrar resultados según el filtro actual
        const filteredProveedores = dataProveedores.filter((proveedor) => 
          proveedor.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
        );
        
        setDataProveedores(dataProveedores); // Guardar todos los datos
        setProveedores(filteredProveedores); // Guardar los datos filtrados
      } catch (error) {
        console.error("Error al cargar proveedores:", error);
      }
    };

    fetchProveedores();
  }, [filtroNombre]); 


  // inspectores
useEffect(() => {
    const fetchInspectores = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/inspector/sin-evaluacion?fecha=${fechaAsignacion}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setInspectores(data);
        } else {
          console.error("Error al obtener inspectores");
        }
      } catch (error) {
        console.error("Error en la solicitud de inspectores:", error);
      }
    };
    fetchInspectores();
  }, [fechaAsignacion]);

  const handleRowSelect = (proveedor) => {
    setSelectedProveedor(proveedor);
  };

  const handleOpenDetailsOverlay = async () => {
    if (!selectedProveedor) return;
    try {
      const response = await fetch(
        `http://localhost:3001/api/proveedor/${selectedProveedor.id_proveedor}`
      );
      const data = await response.json();
      setProveedorDetalles(data);
      setShowDetailsOverlay(true);
      setShowAssignOverlay(false); 
    } catch (error) {
      console.error("Error al cargar detalles del proveedor:", error);
      alert("No se pudo cargar la información del proveedor.");
    }
  };
  const handleCloseDetailsOverlay = () => {
    setShowDetailsOverlay(false);
    setProveedorDetalles(null);
  };

  const handleOpenOverlay = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const handleFechaChange = (e) => {
    const nuevaFecha = e.target.value;
    const hoy = new Date();
    const rangoMin = new Date(hoy.setDate(hoy.getDate() - 7)).toISOString().slice(0, 10);
    const rangoMax = new Date(hoy.setDate(hoy.getDate() + 14)).toISOString().slice(0, 10);

    if (nuevaFecha >= rangoMin && nuevaFecha <= rangoMax) {
      setFechaAsignacion(nuevaFecha);
    } else {
      alert("Fecha fuera del rango permitido (1 semana antes o después).");
    }
  };

  const handleConfirm = async () => {
    if (!selectedInspector || !selectedDate) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const data = {
      id_proveedor: selectedProveedor.id_proveedor,
      id_categoria_nivel: selectedProveedor.id_categoria_nivel,
      id_inspector: inspectores.find((insp) => insp.nombre_inspector === selectedInspector)?.id_inspector,
      riesgo_establecimiento: 0, // Modificar según corresponda
      resultado: 0, // Modificar según corresponda
      observacion: "Sin observaciones", // Modificar según corresponda
      fecha: fechaAsignacion,
      status_evaluacion: "Pendiente", // Modificar según corresponda
    };

    try {
      const response = await fetch("http://localhost:3001/api/evaluacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Evaluación asignada exitosamente.");
        setShowOverlay(false);
      } else {
        alert("Hubo un error al asignar la evaluación.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lista de Proveedores</h1>

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
            <th style={styles.th}>ID Proveedor</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Medicamento</th>
            <th style={styles.th}>Categoría Riesgo</th>
            <th style={styles.th}>Próxima Evaluación</th>
            <th style={styles.th}></th>
          </tr>
        </thead>
        <tbody style={styles.tbody}>
          {proveedores.length === 0 ? (
            <tr>
              <td colSpan="5" style={styles.td}>No hay proveedores para mostrar.</td>
            </tr>
          ) : (
            proveedores.map((proveedor) => (
              <tr
                key={proveedor.id}
                style={selectedProveedor?.id === proveedor.id ? styles.selectedRow : styles.row}
                onClick={() => {
                  handleRowSelect(proveedor);
                }}
              >
                <td style={styles.td}>{proveedor.id}</td>
                <td style={styles.td}>{proveedor.nombre}</td>
                <td style={styles.td}>{proveedor.medicamento}</td>
                <td style={styles.td}>{proveedor.categoria}</td>
                <td style={styles.td}>{proveedor.fechaProximaEvaluacion || "Primera vez"}</td>
                <td style={styles.td}>
                  <a
                    href="#"
                    style={styles.link}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRowSelect(proveedor);
                      handleOpenDetailsOverlay(); // Solo abre el overlay de detalles
                    }}
                  >
                    Ver más detalles
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Botón de asignar inspector */}
      <button
        style={{
          ...styles.assignButton,
          cursor: selectedProveedor ? "pointer" : "not-allowed",
          backgroundColor: selectedProveedor ? "#4CAF50" : "#ccc",
        }}
        disabled={!selectedProveedor}
        onClick={handleOpenOverlay}
      >
        Asignar Inspector
      </button>

      {showOverlay && (
        <div style={styles.overlay}>
          <div style={styles.overlayContent}>
            <h2>Asignar Inspector</h2>
            <div>
              <label>Fecha de Asignación:  </label>
              <input style={styles.input} type="date" value={fechaAsignacion} onChange={handleFechaChange} />
            </div>
            <br/>
            <div>
              <label>Seleccionar Inspector:  </label>
              <select style={styles.input}
                value={selectedInspector}
                onChange={(e) => setSelectedInspector(e.target.value)}
              >
                <option value="">--Seleccione un inspector--</option>
                {inspectores.map((inspector) => (
                  <option key={inspector.id} value={inspector.nombre}>
                    {inspector.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.buttonContainer}>
            <button onClick={handleCloseOverlay} style={styles.cancelButton}>
              Cancelar
            </button>
            <button onClick={handleConfirm} style={styles.confirmButton}>
              Confirmar
            </button>
          </div>
        </div>
        </div>
      )}
      {showDetailsOverlay && proveedorDetalles && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", maxWidth: "500px" }}>
            <h2>Detalles del Proveedor</h2>
            <p><strong>Nombre:</strong> {proveedorDetalles.nombre}</p>
            <p><strong>RNC:</strong> {proveedorDetalles.RNC}</p>
            <p><strong>Ubicación:</strong> {proveedorDetalles.ubicacion}</p>
            <p><strong>Nivel de Riesgo:</strong> {proveedorDetalles.nivel_riesgo}</p>
            <p><strong>Frecuencia de Inspección:</strong> {proveedorDetalles.frecuencia_inspeccion}</p>
            <p><strong>Categoría:</strong> {proveedorDetalles.categoria_nombre}</p>
            <p><strong>Subcategoría:</strong> {proveedorDetalles.nombre_subcategoria}</p>
            <p><strong>Medicamento:</strong> {proveedorDetalles.medicamento_nombre}</p>
            <p><strong>Fecha Última Evaluación:</strong> {proveedorDetalles.fecha_ultima_evaluacion}</p>
            <p><strong>Fecha Próxima Evaluación:</strong> {proveedorDetalles.fecha_proxima_evaluacion}</p>
            <p><strong>Estado Usuario:</strong> {proveedorDetalles.status_usuario}</p>
            <button onClick={handleCloseDetailsOverlay}>Cerrar</button>
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
      width: "9%", // Establece un ancho fijo para cada columna
    },
    row: {
      cursor: "pointer",
    },
    selectedRow: {
      backgroundColor: "#f0f8ff",
      cursor: "pointer",
    },
    link: {
      color: "#2196F3",
      textDecoration: "underline",
    },
    assignButton: {
      marginTop: "1rem",
      padding: "0.5rem 1rem",
      fontSize: "1rem",
      border: "none",
      borderRadius: "5px",
      color: "white",
      marginLeft: "995px"
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
    },
    overlayTitle: {
      textAlign: "center", // Centrado
      marginBottom: "1rem",
      marginTop: "-10px",
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    overlaytext: {
      backgroundColor: "white",
      fontSize: "1rem",
      padding: "20px",
      borderRadius: "8px",
      maxWidth: "500px",
      width: "100%",
      textAlign: "Left",
    },
    closeButton: {
      marginTop: "1.5rem",
      color: "white",
      border: "none",
      borderRadius: "8px", // Bordes un poco más redondeados
      cursor: "pointer",
      textAlign: "center",
      fontSize: "16px", // Tamaño de la fuente
    },
    label: { display: "block", marginTop: "10px", marginBottom: "5px" },
    input: { 
      fixedwidth: "400px", 
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

export default ListaProveedores;
