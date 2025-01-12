import React from 'react';

function ImageDisplay() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img
        src="/imagenes/imagenD.png" // Cambia esta URL por la de tu imagen
        alt="Bienvenida"
        style={{
          marginTop: '-50px',
          width: '100%', // La imagen ocupará el ancho completo del contenedor
          maxWidth: '1200px', // Establece un ancho máximo para evitar que sea demasiado grande
          height: 'auto', // La altura se ajustará automáticamente para mantener la proporción
          borderRadius: '10px',
          display: 'block', // Centrar la imagen eliminando espacio debajo
          margin: '0 auto', // Centrar horizontalmente la imagen
        }}
      />
    </div>
  );
}

export default ImageDisplay;
