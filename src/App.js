import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
<<<<<<< HEAD
import { useState, useEffect } from 'react'; // useEffect para simular el login
import { Sidebar } from './componentes_front/Sidebar';
import LoginRegister from './componentes_front/LoginRegister';
import LandingPage from './pages/landingpage';
import FormularioBPM from './componentes_front/FormularioBPM';
import ConfirmOverlay from './componentes_front/ConfirmOverlay';
import ImageDisplay from './componentes_front/ImageDisplay'; 
import CatEstablecimientoForm from './componentes_front/EstablecimientoForm';
import FormularioMedicamento from './componentes_front/FormularioSolicitud';
=======
import { useState, useEffect } from 'react';
import { Sidebar } from './componentes_front/Sidebar'; // Import Sidebar component
import LoginRegister from './componentes_front/LoginRegister'; // Import LoginRegister component
import LandingPage from './pages/landingpage'; // Import LandingPage component
>>>>>>> 22cb0c5e9eb867a57b8425181eabe73e6d85c6fd

function App() {
  const [userType, setUserType] = useState(null); // Estado para manejar el tipo de usuario
  const [showLandingPage, setShowLandingPage] = useState(true); // Estado para controlar la vista de LandingPage

<<<<<<< HEAD
  // Usamos useEffect para simular que el proveedor inicia sesión automáticamente
  useEffect(() => {
    // Simula que el proveedor inicia sesión
    setUserType('proveedor');
    setShowLandingPage(true); // Ocultar la LandingPage después de simular el login
  }, []);

  const handleLoginSuccess = (userType) => {
    setUserType(null);
    setShowLandingPage(true); // Ocultar la LandingPage después de iniciar sesión
=======
  useEffect(() => {
    // Simula que el proveedor inicia sesión automáticamente para probar la funcionalidad
    setUserType("inspector"); // Cambia esto al tipo de usuario que desees simular (e.g., "proveedor", "admin").
    setShowLandingPage(false); // Oculta la LandingPage automáticamente.
  }, []);

  const handleLoginSuccess = (type) => {
    setUserType(type); // Actualiza el tipo de usuario al iniciar sesión
    setShowLandingPage(false); // Oculta la LandingPage después del inicio de sesión
>>>>>>> 22cb0c5e9eb867a57b8425181eabe73e6d85c6fd
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
              path="/" element={
                <div>
                  <ImageDisplay /> {/* Usando el componente para mostrar la imagen */}
                </div>
              }
            />
<<<<<<< HEAD
            {/* Rutas para los diferentes tipos de usuario */}
            <Route path="/SolicitudPage" element={<FormularioMedicamento />} />
            <Route path="/EvaluacionesPage" element={<CatEstablecimientoForm />} />
            <Route path="/admin" element={<h1>Admin Page</h1>} />
            <Route path="/proveedor" element={<h1>Proveedor Page</h1>} />
            <Route path="/inspector" element={<h1>Inspector Page</h1>} />
=======
            {/* Agrega las rutas específicas según el tipo de usuario */}
            <Route path="/admin" element={<h1>Página de Administrador</h1>} />
            <Route path="/proveedor" element={<h1>Página de Proveedor</h1>} />
            <Route path="/inspector" element={<h1>Página de Inspector</h1>} />
            {/* Ruta para manejar cualquier URL no válida */}
>>>>>>> 22cb0c5e9eb867a57b8425181eabe73e6d85c6fd
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;