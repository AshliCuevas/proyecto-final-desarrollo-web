import { Info, Weight } from "lucide-react";
import React, { useState } from "react";
import FormularioSolicitud from "./FormularioSolicitud"; // Importa el formulario

const styles = {
  container: {
    position: "relative",
    padding: "20px",
    width: "600px",
    marginTop: "25px",
    marginLeft: "auto",
    marginRight: "auto",
    background: "#ffffff",
    border: "2px solid #11325b",
    borderRadius: "10px",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "24px",
    marginBottom: "15px",
    Weight: "600px",
    color: "#11325b",
  },
  subtitle: {
    marginBottom: "10px",
    color: "#5a5a5a",
    fontSize: "18px",
  },
  message: {
    fontSize: "16px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
  stateButton: {
    padding: "10px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
};

const solicitudesMock = [
  { id: 1, proveedorId: 101, estado: "aprobada" },
  { id: 2, proveedorId: 101, estado: "rechazada" }, 
  { id: 3, proveedorId: 101, estado: "pendiente" },// Última solicitud para proveedor 101
];

const InfoSolicitud = () => {
  const [estadoSolicitud, setEstadoSolicitud] = useState("pendiente");
  const [showFormulario, setShowFormulario] = useState(false); // Estado para mostrar el formulario
  const [proveedorId, setProveedorId] = useState(101); // ID del proveedor

  const buscarUltimaSolicitud = (idProveedor) => {
    const ultimaSolicitud = solicitudesMock
      .filter((solicitud) => solicitud.proveedorId === idProveedor)
      .pop(); // Obtiene la última solicitud
    return ultimaSolicitud ? ultimaSolicitud.estado : "pendiente";
  };

  const actualizarEstado = (nuevoEstado) => {
    setEstadoSolicitud(nuevoEstado);
  };

  // Simula la búsqueda inicial de la solicitud más reciente
  React.useEffect(() => {
    const estado = buscarUltimaSolicitud(proveedorId);
    setEstadoSolicitud(estado);
  }, [proveedorId]);

  const renderMessage = () => {
    if (estadoSolicitud === "pendiente") {
      return <p style={{ ...styles.message, color: "orange" }}>Su solicitud está pendiente. Por favor, espere una respuesta.</p>;
    }
    if (estadoSolicitud === "aprobada") {
      return <p style={{ ...styles.message, color: "green" }}>Su solicitud ha sido aprobada. Puede acceder al formulario.</p>;
    }
    if (estadoSolicitud === "rechazada") {
      return <p style={{ ...styles.message, color: "red" }}>Su solicitud fue rechazada. Puede acceder al formulario para más detalles.</p>;
    }
  };

  const renderButton = () => {
    if (estadoSolicitud === "pendiente") {
      return (
        <button style={{ ...styles.button, backgroundColor: "grey", cursor: "not-allowed" }} disabled>
          Acceder al formulario (bloqueado)
        </button>
      );
    }
    if (estadoSolicitud === "aprobada" || estadoSolicitud === "rechazada") {
      return (
        <button
          style={{ ...styles.button, backgroundColor: estadoSolicitud === "aprobada" ? "green" : "red" }}
          onClick={() => setShowFormulario(true)} // Muestra el formulario
        >
          Acceder al formulario
        </button>
      );
    }
  };

  if (showFormulario) {
    return <FormularioSolicitud />;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Estado de la Solicitud</h1>
      {renderMessage()}
      <div style={styles.buttonContainer}>{renderButton()}</div>

    </div>
  );
};

export default InfoSolicitud;