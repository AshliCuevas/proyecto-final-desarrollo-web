import { Routes, Route } from "react-router-dom";
import { SolicitudesPage } from "../pages/SolicitudesPage";
import { ProveedoresPage } from "../pages/ProveedoresPage";
import { InspectoresPage } from "../pages/InspectoresPage";
import { CalendarioPageAdmin } from "../pages/CalendarioPageAdmin";
import { SolicitudPage } from "../pages/SolicitudPage";
import HistorialEvaluaciones from "../componentes_front/HistorialEvaluaciones"; // Corrige la importación
import { CalendarioPageIns } from "../pages/CalendarioPageIns";
import FormBPM, { EvaluacionesPage } from "../componentes_front/FormBPM";
import { HistorialEvIns } from "../pages/HistorialEvIns";
import LoginRegister from "../componentes_front/LoginRegister"; // Asegúrate de que este componente exista
import HistorialEvaluacionesIns from "../componentes_front/HistorialEvaluacionesIns";
import Calendario from "../componentes_front/Calendario";
import CatEstablecimientoForm from "../componentes_front/CatEstablecimientoForm";
import ListaProveedores from "../componentes_front/ListaProveedores";
import ListaSolicitudes from "../componentes_front/ListaSolicitudes";

export function MyRoutes() {
  return (
    <Routes>
      {/* Rutas para administrador */}
      <Route path="/SolicitudesPage" element={<ListaSolicitudes />} />
      <Route path="/ProveedoresPage" element={<ListaProveedores />} />
      <Route path="/InspectoresPage" element={<InspectoresPage />} />
      <Route path="/CalendarioPageAdmin" element={<CalendarioPageAdmin />} />

      {/* Rutas para proveedor */}
      <Route path="/SolicitudPage" element={<SolicitudPage />} />
      <Route path="/HistorialEvaProo" element={<HistorialEvaluaciones />} /> {/* Aquí pasas el proveedorId como prop */}

      {/* Rutas para inspector */}
      <Route path="/CalendarioPageIns" element={<Calendario />} />
      <Route path="/EvaluacionesPage" element={<FormBPM />} />
      <Route path="/Evaluaciones2Page" element={<CatEstablecimientoForm />} />
      <Route path="/HistorialEvaluacionesIns" element={<HistorialEvaluacionesIns />} />

      {/* Ruta para Login/Register */}
      <Route path="/LoginRegister" element={<LoginRegister />} />
    </Routes>
  );
}
