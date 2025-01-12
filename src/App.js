import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from './componentes_front/Sidebar';
import LoginRegister from './componentes_front/LoginRegister'; // Import LoginRegister component
import LandingPage from './pages/landingpage'; // Import LandingPage component

function App() {
  const [userType, setUserType] = useState(null); // Estado para manejar el tipo de usuario
  const [showLandingPage, setShowLandingPage] = useState(true); // Estado para controlar la vista de LandingPage

  const handleLoginSuccess = (userType) => {
    setUserType(userType);
    setShowLandingPage(false); // Ocultar la LandingPage después de iniciar sesión
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
            {/* Agrega las rutas para diferentes tipos de usuario */}
            <Route path="/admin" element={<h1>Admin Page</h1>} />
            <Route path="/proveedor" element={<h1>Proveedor Page</h1>} />
            <Route path="/inspector" element={<h1>Inspector Page</h1>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
