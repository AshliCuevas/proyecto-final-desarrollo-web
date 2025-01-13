import { Routes, Route } from "react-router-dom";
import { SolicitudesPage } from "../pages/SolicitudesPage";
import { ProveedoresPage } from "../pages/ProveedoresPage";
import { InspectoresPage } from "../pages/InspectoresPage";
import { CalendarioPageAdmin } from "../pages/CalendarioPageAdmin";
import { SolicitudPage } from "../pages/SolicitudPage";
import HistorialEvaluaciones from "../componentes_front/HistorialEvaluaciones"; // Corrige la importación
import { CalendarioPageIns } from "../pages/CalendarioPageIns";
import { EvaluacionesPage } from "../componentes_front/FormularioBPM";
import { HistorialEvIns } from "../pages/HistorialEvIns";
import LoginRegister from "../componentes_front/LoginRegister"; // Asegúrate de que este componente exista
import HistorialEvaluacionesIns from "../componentes_front/HistorialEvaluacionesIns";

export function MyRoutes() {
  return (
    <Routes>
      {/* Rutas para administrador */}
      <Route path="/SolicitudesPage" element={<SolicitudesPage />} />
      <Route path="/ProveedoresPage" element={<ProveedoresPage />} />
      <Route path="/InspectoresPage" element={<InspectoresPage />} />
      <Route path="/CalendarioPageAdmin" element={<CalendarioPageAdmin />} />

      {/* Rutas para proveedor */}
      <Route path="/SolicitudPage" element={<SolicitudPage />} />
      <Route path="/HistorialEvaProo" element={<HistorialEvaluaciones />} /> {/* Aquí pasas el proveedorId como prop */}

      {/* Rutas para inspector */}
      <Route path="/CalendarioPageIns" element={<CalendarioPageIns />} />
      <Route path="/EvaluacionesPage" element={<FormularioBPM />} />
      <Route path="/HistorialEvaluacionesIns" element={<HistorialEvaluacionesIns />} />

      {/* Ruta para Login/Register */}
      <Route path="/LoginRegister" element={<LoginRegister />} />
    </Routes>
  );
}
