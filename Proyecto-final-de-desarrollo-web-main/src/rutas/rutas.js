import { Routes, Route } from "react-router-dom";
import { SolicitudesPage } from "../pages/SolicitudesPage";
import { ProveedoresPage } from "../pages/ProveedoresPage";
import { InspectoresPage } from "../pages/InspectoresPage";
import { CalendarioPageAdmin } from "../pages/CalendarioPageAdmin";
import { SolicitudPage } from "../pages/SolicitudPage";
import { HistorialEvPro } from "../pages/HistorialEvPro";
import { CalendarioPageIns } from "../pages/CalendarioPageIns";
import { EvaluacionesPage } from "../pages/EvaluacionesPage";
import { HistorialEvIns } from "../pages/HistorialEvIns";
import LoginRegister from "../componentes_front/LoginRegister"; // Asegúrate de que este componente exista

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
      <Route path="/HistorialEvPro" element={<HistorialEvPro />} />

      {/* Rutas para inspector */}
      <Route path="/CalendarioPageIns" element={<CalendarioPageIns />} />
      <Route path="/EvaluacionesPage" element={<EvaluacionesPage />} />
      <Route path="/HistorialEvIns" element={<HistorialEvIns />} />

      {/* Ruta para Login/Register */}
      <Route path="/LoginRegister" element={<LoginRegister />} />
    </Routes>
  );
}
