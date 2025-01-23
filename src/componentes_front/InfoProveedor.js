import React, { useState, useEffect } from 'react';
import FormBPM from './FormBPM'; // Importa el nuevo componente
import { border, borderRight, color, fontSize, padding, textAlign } from '@mui/system';

const styles = {
  container: {
    position: 'relative',
    padding: '20px',
    width: '1000px',
    marginTop: '25px',
    marginLeft: "-180px",
    background: '#ffffff',

  },
  title: {
    marginBottom: '20px',
    marginTop: '-10px',
    fontSize: '30px',
  },
  subtitle: {
    marginBottom: '5px',
    color: 'rgb(156, 160, 160)',
    fontSize: '22px',
    textAlign: 'center',
    marginTop: '5px',
  },
  infoContainer: {
    display: 'flex',
    gap: '20px',
  },
  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    textAlign: 'left',
    padding: '25px',
    gap: '2px',
    border: '2px solid #11325b',
  },
  button: {
    display: "block",
    marginTop: "-10px",
    width: "200px",
    margin: "20px auto",
    padding: "10px 20px",
    fontSize: "18px",
    backgroundColor: "#5ce1e6",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: "200px",
    marginTop: '10px',
  },
};

const InfoProveedor = ({ idInspector }) => {
  const [proveedor, setProveedor] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchProveedorInfo = async () => {
      try {
        // Fecha actual
        const today = new Date().toISOString().split("T")[0];

        // Primer fetch: evaluaciones
        const evaluacionesResponse = await fetch(
          `http://localhost:3001/api/evaluacion?fechaInicio=${today}&fechaFin=${today}&id_inspector=${idInspector}`
        );
        if (!evaluacionesResponse.ok) {
          throw new Error("Error al obtener evaluaciones");
        }

        const evaluacionesData = await evaluacionesResponse.json();
        if (evaluacionesData.length === 0) {
          console.warn("No se encontraron evaluaciones para el inspector.");
          return;
        }

        // Obtiene el primer id_proveedor de las evaluaciones
        const idProveedor = evaluacionesData[0].id_proveedor;

        // Segundo fetch: proveedor
        const proveedorResponse = await fetch(
          `http://localhost:3001/api/proveedor/${idProveedor}`
        );
        if (!proveedorResponse.ok) {
          throw new Error("Error al obtener la información del proveedor");
        }

        const proveedorData = await proveedorResponse.json();
        setProveedor(proveedorData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProveedorInfo();
  }, [idInspector]);

  if (showForm) {
    return <FormBPM />;
  }

  if (!proveedor) return <p> No tiene ninguna evaluación programada para hoy.</p>;

  return (
    <div>
      <div style={styles.container}>
        <h2 style={styles.title}>Información del Proveedor</h2>
        <div style={styles.infoContainer}>
          <div style={styles.column}>
          <h2 style={styles.subtitle}>Datos de la solicitud</h2>
            <p><strong>Nombre:</strong> {proveedor.nombre}</p>
            <p><strong>RNC:</strong> {proveedor.rnc}</p>
            <p><strong>Email:</strong> {proveedor.email}</p>
            <p><strong>Ubicación:</strong> {proveedor.ubicacion}</p>
            <p><strong>Status:</strong> {proveedor.status}</p>
            <p><strong>Nivel de Riesgo:</strong> {proveedor.nivel_riesgo}</p>
            <p><strong>Frecuencia:</strong> {proveedor.frecuencia}</p>
          </div>
          <div style={styles.column}>
          <h2 style={styles.subtitle}>Datos de la solicitud</h2>
            <p><strong>Categoría:</strong> {proveedor.categoria}</p>
            <p><strong>Subcategoría:</strong> {proveedor.subcategoria}</p>
            <p><strong>Medicamento:</strong> {proveedor.medicamento}</p>
            <p><strong>Nombre de Riesgo:</strong> {proveedor.nombre_riesgo}</p>
            <p><strong>Fecha de Última Evaluación:</strong> {proveedor.fecha_ultima_evaluacion}</p>
            <p><strong>Fecha de Próxima Evaluación:</strong> {proveedor.fecha_proxima_evaluacion}</p>
          </div>
        </div>
      </div>
      <div style={styles.buttonContainer}>
        <button 
          onClick={() => setShowForm(true)} 
          style={styles.button}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default InfoProveedor;
