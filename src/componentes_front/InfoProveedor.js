import React from "react";
import { Button, Box, Typography, Grid, Paper } from "@mui/material";
import { width } from "@mui/system";

const styles = {
  paper: {
    padding: 3,
    width: "1150px",
    marginLeft: "-258px",
  },
  title: {
    fontSize: "1.75rem", 
    marginBottom: "2.5rem",
    marginTop: "1.5rem",
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "0",
  },
  nextButtonContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
};

const InfoProveedor = ({ onNext }) => {
  // Datos de prueba
  const proveedor = {
    nombre: "Proveedor XYZ",
    rnc: "123456789",
    email: "proveedor@xyz.com",
    ubicacion: "Ciudad, País",
    status_usuario: "Activo",
    nivel_riesgo: "Medio",
    frecuencia_inspeccion: "Trimestral",
    categoria: "Medicamentos",
    subcategoria: "Antibióticos",
    medicamento: "Amoxicilina",
    nombre_riesgo: "Riesgo Moderado",
    fecha_ultima_evaluacion: "2024-12-01",
    fecha_proxima_evaluacion: "2025-03-01",
  };

  return (
    <Paper elevation={3} sx={styles.paper}>
      <Typography variant="h5" gutterBottom sx={styles.title}>
        Información del Proveedor
      </Typography>

      <Grid container spacing={2}>
        {/* Columna 1 */}
        <Grid item xs={12} md={6}>
          <Typography variant="body1"><strong>Nombre:</strong> {proveedor.nombre}</Typography>
          <Typography variant="body1"><strong>RNC:</strong> {proveedor.rnc}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {proveedor.email}</Typography>
          <Typography variant="body1"><strong>Ubicación:</strong> {proveedor.ubicacion}</Typography>
          <Typography variant="body1"><strong>Status:</strong> {proveedor.status_usuario}</Typography>
          <Typography variant="body1"><strong>Nivel de Riesgo:</strong> {proveedor.nivel_riesgo}</Typography>
          <Typography variant="body1"><strong>Frecuencia de Inspección:</strong> {proveedor.frecuencia_inspeccion}</Typography>
        </Grid>

        {/* Columna 2 */}
        <Grid item xs={12} md={6}>
          <Typography variant="body1"><strong>Categoría:</strong> {proveedor.categoria}</Typography><br/>
          <Typography variant="body1"><strong>Subcategoría:</strong> {proveedor.subcategoria}</Typography>
          <Typography variant="body1"><strong>Medicamento:</strong> {proveedor.medicamento}</Typography>
          <Typography variant="body1"><strong>Nombre del Riesgo:</strong> {proveedor.nombre_riesgo}</Typography>
          <Typography variant="body1"><strong>Fecha Última Evaluación:</strong> {proveedor.fecha_ultima_evaluacion}</Typography>
          <Typography variant="body1"><strong>Fecha Próxima Evaluación:</strong> {proveedor.fecha_proxima_evaluacion}</Typography>
        </Grid>
      </Grid>

      {/* Botón Siguiente */}
      <Box sx={styles.nextButtonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
        >
          Siguiente
        </Button>
      </Box>
    </Paper>
  );
};

export default InfoProveedor;
