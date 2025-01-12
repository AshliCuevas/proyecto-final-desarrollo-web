import React from 'react';

function ImageDisplay() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img
        src="/imagenes/imagenD.png" // Cambia esta URL por la de tu imagen
        alt="Bienvenida"
        style={{
          marginTop: '-50px',
          width: '125%', // Ajustamos el ancho de la imagen a un 80% del contenedor
          height: '710px', // La altura se ajustará automáticamente para mantener la proporción
          maxWidth: '1400px', // Máximo tamaño de la imagen (ajusta este valor según sea necesario)
          borderRadius: '10px',
          display: 'block', // Eliminar el espacio debajo de la imagen si es necesario
          marginLeft: '-250px',
          marginRight: '15px',
        }}
      />
    </div>
  );
}

export default ImageDisplay;
