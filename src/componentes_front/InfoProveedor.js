import React, { useState, useEffect } from 'react';
import FormBPM from './FormBPM'; // Importa el nuevo componente

const styles = {
  container: {
    position: 'relative',
    padding: '20px',
    width: '1100px',
    marginLeft: "-240px",
    border: '1px solid #ccc',
    borderRadius: '8px',
    background: '#ffffff',
  },
  title: {
    marginBottom: '20px',
  },
  infoContainer: {
    display: 'flex',
    gap: '20px',
  },
  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
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

const InfoProveedor = () => {
  const [proveedor, setProveedor] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Simula un fetch con datos de prueba
  useEffect(() => {
    const datosPrueba = {
      nombre: 'Farmacia Central',
      rnc: '123456789',
      email: 'contacto@farmaciacentral.com',
      ubicacion: 'Santo Domingo, RD',
      status: 'Activo',
      nivel_riesgo: 'Bajo',
      frecuencia: 'Mensual',
      categoria: 'Farmacia',
      subcategoria: 'Distribuidor',
      medicamento: 'Paracetamol',
      nombre_riesgo: 'Riesgo Bajo',
      fecha_ultima_evaluacion: '2024-12-01',
      fecha_proxima_evaluacion: '2025-01-01',
    };
    setProveedor(datosPrueba);
  }, []);

  if (showForm) {
    return <FormBPM />;
  }

  if (!proveedor) return <p>Cargando información del proveedor...</p>;

  return (
    <div>
      <div style={styles.container}>
        <h2 style={styles.title}>Información del Proveedor</h2>
        <div style={styles.infoContainer}>
          <div style={styles.column}>
            <p><strong>Nombre:</strong> {proveedor.nombre}</p>
            <p><strong>RNC:</strong> {proveedor.rnc}</p>
            <p><strong>Email:</strong> {proveedor.email}</p>
            <p><strong>Ubicación:</strong> {proveedor.ubicacion}</p>
            <p><strong>Status:</strong> {proveedor.status}</p>
            <p><strong>Nivel de Riesgo:</strong> {proveedor.nivel_riesgo}</p>
            <p><strong>Frecuencia:</strong> {proveedor.frecuencia}</p>
          </div>
          <div style={styles.column}>
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
