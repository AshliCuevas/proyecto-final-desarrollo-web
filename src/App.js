import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sidebar } from './componentes_front/Sidebar'; // Import Sidebar component
import LoginRegister from './componentes_front/LoginRegister'; // Import LoginRegister component
import LandingPage from './pages/landingpage'; // Import LandingPage component

function App() {
  const [userType, setUserType] = useState(null); // Estado para manejar el tipo de usuario
  const [showLandingPage, setShowLandingPage] = useState(true); // Estado para controlar la vista de LandingPage

  useEffect(() => {
    // Simula que el proveedor inicia sesión automáticamente para probar la funcionalidad
    setUserType("inspector"); // Cambia esto al tipo de usuario que desees simular (e.g., "proveedor", "admin").
    setShowLandingPage(false); // Oculta la LandingPage automáticamente.
  }, []);

  const handleLoginSuccess = (type) => {
    setUserType(type); // Actualiza el tipo de usuario al iniciar sesión
    setShowLandingPage(false); // Oculta la LandingPage después del inicio de sesión
  };

  // Mostrar LandingPage si no hay usuario autenticado
  if (!userType && showLandingPage) {
    return <LandingPage onContinue={() => setShowLandingPage(false)} />;
  }

  // Mostrar pantalla de Login o Registro si no hay usuario autenticado
  if (!userType) {
    return (
      <div className="App">
        <LoginRegister onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // Mostrar contenido principal si el usuario está autenticado
  return (
    <BrowserRouter>
      <div className="App" style={{ display: 'flex' }}>
        <Sidebar userType={userType} />
        <div className="page-content" style={{ marginLeft: '250px', padding: '20px' }}>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1>Bienvenido, {userType}</h1>
                  <p>Esto es una vista de demostración del contenido principal.</p>
                </div>
              }
            />
            {/* Agrega las rutas específicas según el tipo de usuario */}
            <Route path="/admin" element={<h1>Página de Administrador</h1>} />
            <Route path="/proveedor" element={<h1>Página de Proveedor</h1>} />
            <Route path="/inspector" element={<h1>Página de Inspector</h1>} />
            {/* Ruta para manejar cualquier URL no válida */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
