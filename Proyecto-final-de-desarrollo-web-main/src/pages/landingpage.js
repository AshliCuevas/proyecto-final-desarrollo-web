import React, { useState } from 'react';
import './styles.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'; // Importa Routes y Link
import LoginRegister from "../componentes_front/LoginRegister"; // Asegúrate de que este componente exista

const App = () => {
  const [showLandingPage, setShowLandingPage] = useState(true); // Estado para controlar la visibilidad del LandingPage
  const navigate = useNavigate(); // Para redirigir al LoginRegister

  const handleLoginClick = () => {
    setShowLandingPage(false); // Oculta el LandingPage
    navigate('/LoginRegister'); // Redirige al LoginRegister
  };

  if (showLandingPage) {
    return (
      <div className="app-container">
        {/* Header */}
        <header className="header">
          <img src="/Imagenes/LogoL.png" alt="Logo" className="logo" />
          <button className="btn-primary" onClick={handleLoginClick}>
            Iniciar sesión / Registrarse
          </button>
        </header>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Sistema de Gestión de Riesgo de Medicamentos</h1>
            <p>
              Nuestra plataforma ayuda a los profesionales de la salud a identificar, evaluar y mitigar los riesgos asociados con los medicamentos.
              Nuestro objetivo es mejorar la seguridad del paciente y optimizar la gestión de los medicamentos.
            </p>
          </div>
          <img src="/Imagenes/Riskmed.png" alt="Imagen de riesgo de medicamentos" className="hero-image" />
        </section>

        {/* Qué hacemos */}
        <section className="what-we-do">
          <h2>¿Qué hacemos?</h2>
          <div className="cards-container">
            <div className="card">
              <h3>Evaluación de Riesgos</h3>
              <p>Evaluamos los riesgos potenciales de los medicamentos prescritos mediante el análisis de los perfiles de los pacientes, interacciones de medicamentos e información sobre las dosis.</p>
              <button className="btn-secondary">Saber más</button>
            </div>
            <div className="card">
              <h3>Gestión de Medicamentos</h3>
              <p>Ayudamos a gestionar y monitorear los horarios de los medicamentos del paciente, asegurando la dosis correcta y su administración oportuna.</p>
              <button className="btn-secondary">Saber más</button>
            </div>
            <div className="card">
              <h3>Alertas y Notificaciones</h3>
              <p>Nuestro sistema genera alertas en tiempo real para los proveedores de atención médica, notificándoles sobre riesgos potenciales relacionados con los medicamentos.</p>
              <button className="btn-secondary">Saber más</button>
            </div>
          </div>
        </section>

        {/* Cómo lo hacemos */}
        <section className="how-we-do">
          <h2>¿Cómo lo hacemos?</h2>
          <div className="how-we-do-cards">
            <div className="how-we-do-card">
              <span className="card-number">/01</span>
              <h4>Análisis de Datos del Paciente</h4>
              <p>Utilizamos análisis avanzados para evaluar el historial del paciente, los medicamentos actuales, las alergias y las condiciones para evaluar los riesgos de los medicamentos.</p>
            </div>
            <div className="how-we-do-card">
              <span className="card-number">/02</span>
              <h4>Verificador de Interacciones de Medicamentos</h4>
              <p>Herramienta que identifica interacciones peligrosas entre medicamentos y recomienda alternativas más seguras según el perfil del paciente.</p>
            </div>
            <div className="how-we-do-card">
              <span className="card-number">/03</span>
              <h4>Monitoreo de Riesgos en Tiempo Real</h4>
              <p>Monitoreo continuo de los medicamentos para prevenir eventos adversos antes de que ocurran.</p>
            </div>
            <div className="how-we-do-card">
              <span className="card-number">/04</span>
              <h4>Seguridad de los Datos</h4>
              <p>Aseguramos que todos los datos de los pacientes y medicamentos se manejen con el más alto nivel de seguridad, cumpliendo con las normativas de salud.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2025 RISKMED. Todos los derechos reservados.</p>
            <div className="footer-links">
              <a href="/terms">Términos de servicio</a>
              <a href="/privacy">Política de privacidad</a>
              <a href="/contact">Contáctanos</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/LoginRegister" element={<LoginRegister />} />
    </Routes>
  );
};

// Envuelve el componente App en Router aquí para asegurar que useNavigate funcione
const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
