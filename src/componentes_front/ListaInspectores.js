import React, { useState, useEffect } from "react";

const ListaInspectores = () => {
  const [inspectores, setInspectores] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [selectedInspector, setSelectedInspector] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newInspector, setNewInspector] = useState({ nombre: "", email: "", password: "", cedula: "" });
  const [estatus, setEstatus] = useState("");

  const fetchInspectores = async () => {
    const defaultInspectores = [
      {
        id: 1,
        rol: "Inspector",
        nombre: "Pabloinspector",
        email: "pabloinspector@example.com",
        contrasena: "ins11pector",
        status_usuario: "Activo",
      },
      {
        id: 2,
        rol: "Inspector",
        nombre: "Davidinspector",
        email: "davidinspector@example.com",
        contrasena: "ins12pector",
        status_usuario: "Activo",
      },
      {
        id: 3,
        rol: "Inspector",
        nombre: "Juaninspector",
        email: "juaninspector@example.com",
        contrasena: "ins13pector",
        status_usuario: "Inactivo",
      },
    ];
  
    try {
      const response = await fetch('http://localhost:3001/api/inspector', {
        method: 'GET',
        headers: {
          accept: '*/*',
        },
      });
  
      const data = response.ok ? await response.json() : null;
      setInspectores(data && data.length > 0 ? data : defaultInspectores);
    } catch (error) {
      console.error('Error en el fetch de inspectores:', error);
      setInspectores(defaultInspectores);
    }
  };

  useEffect(() => {
    fetchInspectores();
  }, []);

  const handleRowSelect = (inspector) => {
    setSelectedInspector(inspector);
  };

  const handleOpenAddModal = () => {
    setNewInspector({ nombre: "", email: "", password: "", cedula: "" });
    setShowAddModal(true);
  };

  const handleOpenEditModal = () => {
    setEstatus(selectedInspector?.estatus);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const handleAddConfirm = async () => {
    if (!newInspector.nombre || !newInspector.email || !newInspector.password || !newInspector.cedula) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/inspector", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInspector),
      });

      if (response.ok) {
        alert("Inspector agregado exitosamente.");
        setShowAddModal(false);
        // Actualizar la lista de inspectores
        const updatedInspectores = await response.json();
        setInspectores(updatedInspectores);
      } else {
        alert("Hubo un error al agregar el inspector.");
      }
    } catch (error) {
      console.error("Error al agregar el inspector:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  const handleEditConfirm = async () => {
    if (!estatus || !selectedInspector) {
      alert('Por favor, seleccione un inspector y un estatus.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3001/api/usuarios/${selectedInspector.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          accept: '*/*',
        },
        body: JSON.stringify({ status_usuario: estatus }),
      });
  
      if (response.ok) {
        alert('Estatus actualizado exitosamente.');
        setShowEditModal(false);
  
        // Vuelve a hacer fetch de la lista de inspectores
        const updatedInspectores = await fetchInspectores();
        setInspectores(updatedInspectores);
      } else {
        alert('Hubo un error al actualizar el estatus.');
      }
    } catch (error) {
      console.error('Error al actualizar el estatus:', error);
      alert('No se pudo conectar con el servidor.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lista de Inspectores</h1>

      {/* Filtro por nombre */}
      <div style={styles.filters}>
        <label style={styles.filterLabel}>Buscar por nombre:</label>
        <input
          type="text"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          style={styles.filterInput}
        />
        <button onClick={handleOpenAddModal} style={styles.addButton}>Agregar Inspector</button>
      </div>

      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Estatus</th>
          </tr>
        </thead>
        <tbody style={styles.tbody}>
  {inspectores.filter((inspector) =>
    inspector.nombre && inspector.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
  ).length > 0 ? (
    inspectores
      .filter((inspector) => inspector.nombre.toLowerCase().includes(filtroNombre.toLowerCase()))
      .map((inspector) => (
        <tr
          key={inspector.id}
          style={selectedInspector?.id === inspector.id ? styles.selectedRow : styles.row}
          onClick={() => handleRowSelect(inspector)}
        >
          <td style={styles.td}>{inspector.id}</td>
          <td style={styles.td}>{inspector.nombre}</td>
          <td style={styles.td}>{inspector.email}</td>
          <td style={styles.td}>{inspector.status_usuario}</td>
        </tr>
      ))
          ) : (
            <tr>
              <td colSpan="4" style={styles.td}>
                No se encuentran inspectores
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        style={{
          ...styles.editButton,
          cursor: selectedInspector ? "pointer" : "not-allowed",
          backgroundColor: selectedInspector ? "#4CAF50" : "#ccc",
        }}
        disabled={!selectedInspector}
        onClick={handleOpenEditModal}
      >
        Editar
      </button>

      {/* Modal para agregar inspector */}
      {showAddModal && (
        <div style={styles.overlay}>
          <div style={styles.overlayContent}>
            <h2>Agregar Inspector</h2>
            <label style={styles.label}>Nombre:</label>
            <input
              type="text"
              value={newInspector.nombre}
              onChange={(e) => setNewInspector({ ...newInspector, nombre: e.target.value })}
              style={styles.input}
            />
            <label style={styles.label}>Email:</label>
            <input
              type="text"
              value={newInspector.email}
              onChange={(e) => setNewInspector({ ...newInspector, email: e.target.value })}
              style={styles.input}
            />
            <label style={styles.label}>Contraseña:</label>
            <input
              type="text"
              value={newInspector.password}
              onChange={(e) => setNewInspector({ ...newInspector, password: e.target.value })}
              style={styles.input}
            />
            <label style={styles.label}>Cédula:</label>
            <input
              type="text"
              value={newInspector.cedula}
              onChange={(e) => setNewInspector({ ...newInspector, cedula: e.target.value })}
              style={styles.input}
            />
            <div style={styles.buttonContainer}>
              <button onClick={handleCloseModal} style={styles.cancelButton}>Cancelar</button>
              <button onClick={handleAddConfirm} style={styles.confirmButton}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar estatus */}
      {showEditModal && (
        <div style={styles.overlay}>
          <div style={styles.overlayContent}>
            <h2>Editar Estatus</h2>
            <select
              value={estatus}
              onChange={(e) => setEstatus(e.target.value)}
              style={styles.input}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
            <div style={styles.buttonContainer}>
              <button onClick={handleCloseModal} style={styles.cancelButton}>Cancelar</button>
              <button onClick={handleEditConfirm} style={styles.confirmButton}>Confirmar</button>
            </div>
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
      marginRight: "20rem",
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
    addButton: {
        marginTop: "1rem",
        backgroundColor: "#2196F3",
        color: "white",
        fontSize: "0.9rem",
        border: "none",
        borderRadius: "5px",
        width: "200px",
        height: "40px",
        marginRight: "10px"
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
    link: {
      color: "#2196F3",
      textDecoration: "underline",
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
      height: "500px",
      borderRadius: "8px",
      maxWidth: "500px",
      width: "100%",
      textAlign: "center",
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
    label: { display: "block", marginTop: "20px", marginBottom: "10px" },
    input: { 
      width: "300px", 
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

export default ListaInspectores;