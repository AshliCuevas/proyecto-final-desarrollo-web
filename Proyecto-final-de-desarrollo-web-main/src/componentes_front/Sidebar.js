import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineHome, AiOutlineApartment, AiOutlineSetting } from "react-icons/ai";
import { MdOutlineAnalytics, MdLogout } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

export function Sidebar({ userType, setUserType }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Hook de navegación

  const userLinks = {
    admin: [
      { label: "Solicitudes", icon: <AiOutlineHome />, to: "/SolicitudesPage" },
      { label: "Proveedores", icon: <MdOutlineAnalytics />, to: "/ProveedoresPage" },
      { label: "Inspectores", icon: <AiOutlineSetting />, to: "/InspectoresPage" },
      { label: "Calendario", icon: <AiOutlineSetting />, to: "/CalendarioPageAdmin" },
    ],
    proveedor: [
      { label: "Solicitud", icon: <AiOutlineHome />, to: "/SolicitudPage" },
      { label: "Historial de Evaluaciones", icon: <AiOutlineApartment />, to: "/HistorialEvPro" },
    ],
    inspector: [
      { label: "Calendario", icon: <AiOutlineHome />, to: "/CalendarioPageIns" },
      { label: "Evaluaciones", icon: <AiOutlineApartment />, to: "/EvaluacionesPage" },
      { label: "Historial de Evaluaciones", icon: <AiOutlineApartment />, to: "/HistorialEvIns" },
    ],
  };

  const linksArray = userLinks[userType] || [];

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    setShowModal(false);
    setUserType(null); // Limpiar el tipo de usuario (cerrar sesión)
    navigate("/componentes_front/LoginRegister"); // Redirigir al login
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  return (
    <>
      <Container>
        <div className="Logocontent">
          <img src="/imagenes/LogoOsc.png" alt="LogoOsc.png" />
        </div>
        {linksArray.map(({ icon, label, to }) => (
          <NavLink to={to} key={label} className={({ isActive }) => `link${isActive ? " active" : ""}`}>
            <div className="icon">{icon}</div>
            <span>{label}</span>
          </NavLink>
        ))}
        <div className="logout" onClick={handleLogoutClick}>
          <MdLogout /> <span>Cerrar sesión</span>
        </div>
      </Container>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>¿Estás seguro de que deseas cerrar sesión?</h3>
            <div className="actions">
              <button onClick={confirmLogout} className="confirm">Sí</button>
              <button onClick={cancelLogout} className="cancel">No</button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

const Container = styled.div`
  background-color: #11325b; 
  color: white;
  width: 245px;
  height: 100vh;
  padding: 10px;
  display: flex;
  flex-direction: column;

  .Logocontent {
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;

    img {
      width: 95px;
      height: 95px;
    }

    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
    }
  }

  .link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color:rgb(255, 255, 255);
    padding: 8px 10px; 
    border-radius: 5px;
    margin-bottom: 12px;
    font-weight: 600;

    .icon {
      margin-right: 10px;
      font-size: 25px;
    }

    &.active {
      background-color: #0056b3;
    }

    &:hover {
      color: #11325b;
      background-color: #5ce1e6;
    }
  }

  .logout {
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 10px;
    color:rgb(255, 255, 255);
    cursor: pointer;
    padding: 8px 10px; /* Reducir padding */
    border-radius: 5px;
    margin-bottom: 10px;
    font-weight: 600;

    &:hover {
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 10px;
      background-color: #5ce1e6; 
      color: white;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:rgba(17, 50, 91, 0.43); /* Fondo azul transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 20px;
  }

  .actions {
    display: flex;
    gap: 10px;
    justify-content: center;

    .confirm {
      background-color: #0056b3;
      color: white;
      border: none;
      padding: 10px 30px; /* Aumentar el ancho del botón */
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold; /* Texto en negrita */

      &:hover {
        background-color: #003f7f;
      }
    }

    .cancel {
      background-color: #ff4d4d;
      color: white;
      border: none;
      padding: 10px 30px; /* Aumentar el ancho del botón */
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold; /* Texto en negrita */

      &:hover {
        background-color: #cc0000;
      }
    }
  }
`;
