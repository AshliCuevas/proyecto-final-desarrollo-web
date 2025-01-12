import React from 'react';

function ImageDisplay() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img
        src="/imagenes/imagenD.png" // Cambia esta URL por la de tu imagen
        alt="Bienvenida"
        style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
      />
    </div>
  );
}

export default ImageDisplay;
