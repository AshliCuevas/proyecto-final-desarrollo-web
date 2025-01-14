import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sidebar } from './componentes_front/Sidebar';
import LoginRegister from './componentes_front/LoginRegister';
import LandingPage from './pages/landingpage';
import FormBPM from './componentes_front/FormBPM';
import ConfirmOverlay from './componentes_front/ConfirmOverlay';
import ImageDisplay from './componentes_front/ImageDisplay';
import CatEstablecimientoForm from './componentes_front/CatEstablecimientoForm';
import FormularioMedicamento from './componentes_front/FormularioSolicitud';
import HistorialEvaluaciones from './componentes_front/HistorialEvaluaciones';
import HistorialEvaluacionesIns from './componentes_front/HistorialEvaluacionesIns';

function App() {
  const [userType, setUserType] = useState(null); // Estado para manejar el tipo de usuario
  const [userId, setUserId] = useState(null); // Estado para almacenar el ID del usuario
  const [showLandingPage, setShowLandingPage] = useState(true); // Estado para controlar la vista de LandingPage

  // Simulación de inicio de sesión automático (por defecto, como inspector)
  useEffect(() => {
    setUserType('inspector');
    setShowLandingPage(false);
  }, []);

  const handleLoginSuccess = (userType) => {
    setUserType(userType); // Actualiza el tipo de usuario después del inicio de sesión
    setShowLandingPage(false); // Oculta la LandingPage después del login
  };

  // Mostrar LandingPage antes de iniciar sesión
  if (!userType && showLandingPage) {
    return <LandingPage onContinue={() => setShowLandingPage(false)} />;
  }

  // Mostrar Login/Registro si no hay usuario autenticado
  if (!userType) {
    return (
      <div className="App">
        <LoginRegister onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // Mostrar contenido principal cuando el usuario está autenticado
  return (
    <BrowserRouter>
      <div className="App" style={{ display: 'flex' }}>
        <Sidebar userType={userType} />
        <div className="page-content" style={{ marginLeft: '250px', padding: '20px' }}>
          <Routes>
            {/* Ruta raíz con componente ImageDisplay */}
            <Route path="/" element={<ImageDisplay />} />

            {/* Rutas comunes */}
            <Route path="/SolicitudPage" element={<FormularioMedicamento />} />
            <Route path="/EvaluacionesPage" element={<FormBPM />} />
            <Route path="/CalendarioPageIns" element={<Calendario />} />

            {/* Rutas para historial de evaluaciones */}
            <Route path="/HistorialEvaProo" element={<HistorialEvaluaciones proveedorId={userId} />} />
            <Route path="/HistorialEvaluacionesIns" element={<HistorialEvaluacionesIns inspectorId={userId} />} /> {/* Pasar inspectorId */}

            {/* Rutas específicas para roles */}
            {userType === 'admin' && <Route path="/admin" element={<h1>Admin Page</h1>} />}
            {userType === 'proveedor' && <Route path="/proveedor" element={<h1>Proveedor Page</h1>} />}
            {userType === 'inspector' && <Route path="/inspector" element={<h1>Inspector Page</h1>} />}

            {/* Redirección para rutas no válidas */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
