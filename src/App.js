import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; // useEffect para simular el login
import { Sidebar } from './componentes_front/Sidebar';
import LoginRegister from './componentes_front/LoginRegister';
import LandingPage from './pages/landingpage';
import FormularioBPM from './componentes_front/FormularioBPM';
import ConfirmOverlay from './componentes_front/ConfirmOverlay';
import ImageDisplay from './componentes_front/ImageDisplay';
import CatEstablecimientoForm from './componentes_front/CatEstablecimientoForm';
import FormularioMedicamento from './componentes_front/FormularioSolicitud';

function App() {
  const [userType, setUserType] = useState(null); // Estado para manejar el tipo de usuario
  const [showLandingPage, setShowLandingPage] = useState(true); // Estado para controlar la vista de LandingPage

  // Simular inicio de sesión automático
  useEffect(() => {
    setUserType('proveedor'); // Simula que un proveedor inicia sesión automáticamente
    setShowLandingPage(false); // Oculta la LandingPage automáticamente
  }, []);

  const handleLoginSuccess = (userType) => {
    setUserType(userType); // Actualiza el tipo de usuario después del inicio de sesión
    setShowLandingPage(false); // Oculta la LandingPage después del login
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
            {/* Componente ImageDisplay en la ruta inicial */}
            <Route
              path="/"
              element={
                <div>
                  <ImageDisplay /> {/* Usando el componente para mostrar la imagen */}
                </div>
              }
            />
            {/* Rutas adicionales */}
            <Route path="/SolicitudPage" element={<FormularioMedicamento />} />
            <Route path="/EvaluacionesPage" element={<CatEstablecimientoForm />} />
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
