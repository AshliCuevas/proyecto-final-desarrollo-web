import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EvaluacionesApp = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchEvaluaciones(); // Cargar evaluaciones al cambiar la fecha seleccionada
  }, [selectedDate]);

  useEffect(() => {
    generateTimelineForMonth();
  }, [evaluaciones]);

  const fetchEvaluaciones = async () => {
    try {
      const fechaInicio = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).toISOString().split('T')[0];
      const fechaFin = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).toISOString().split('T')[0];

      // Construir la URL dinámicamente según el tipo de usuario
      let url = `http://localhost:3001/api/evaluacion?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`;
      
      //NOTA:: esto hay que cambiarlo pq no se en vd como funciona la autenticacion:
      
      if (userType === 'inspector') {
        url += `&id_inspector=${loggedUserId}`; // Agregar id_inspector si el usuario es inspector
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvaluaciones(data);
      } else {
        console.error('Error al cargar las evaluaciones:', response.status);
      }
    } catch (error) {
      console.error('Error al realizar el fetch:', error);
    }
  };

  const fetchProveedor = async (idProveedor) => {
    try {
      const response = await fetch(`http://localhost:3001/api/proveedor/${idProveedor}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.nombre; // Devolver solo el nombre del proveedor
      } else {
        console.error('Error al obtener proveedor:', response.status);
        return 'Desconocido';
      }
    } catch (error) {
      console.error('Error al realizar el fetch del proveedor:', error);
      return 'Desconocido';
    }
  };

  useEffect(() => {
    generateTimelineForMonth();
  }, [selectedDate, evaluaciones]);

  const generateTimelineForMonth = async () => {
    try {
      const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

      // Filtrar evaluaciones del mes seleccionado
      const filteredEvaluaciones = evaluaciones.filter((evaluacion) => {
        const evalDate = new Date(evaluacion.fecha);
        return evalDate >= monthStart && evalDate <= monthEnd;
      });

      // Generar datos del timeline
      const timelineData = await Promise.all(
        filteredEvaluaciones.map(async (evaluacion) => {
          const nombreProveedor = await fetchProveedor(evaluacion.id_proveedor);
          return {
            fecha: new Date(evaluacion.fecha).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' }),
            proveedor: nombreProveedor,
          };
        })
      );

      setTimeline(timelineData);
    } catch (error) {
      console.error('Error generating timeline:', error);
    }
  };

  const getTileContent = ({ date }) => {
    const evalsOnDate = evaluaciones.filter(
      (evalItem) => new Date(evalItem.fecha).toDateString() === date.toDateString()
    );

    if (evalsOnDate.length > 0) {
      return <div className="circle">{evalsOnDate.length}</div>;
    }

    return null;
  };

  return (
    <div style={styles.formContainer}>
      <style>{`
        .circle {
          background-color: #000000;
          color: white;
          border-radius: 50%;
          width: 10px;
          height: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
          font-size: 12px;
          line-height: 1;
          padding: 2px;
        }

        .react-calendar {
          font-family: 'Poppins', sans-serif;
          align-items: center; /* Centrado vertical */
          justify-content: center; /* Centrado horizontal */
          font-size: 1.15rem;
          width: 100%;
          max-width: 100%;
        }

        .react-calendar__viewContainer {
          min-height: 326px;
          max-height: 326px;
        }

        .timeline-item {
          margin: 5px 0;
          padding: 5px;
        }

        .timeline-date {
          background-color: #007bff;
          color: white;
          border-radius: 5px;
          padding: 5px;
          margin-bottom: 5px;
        }

        .timeline-proveedor {
          font-size: 14px;
          color: #11325b;
        }
      `}</style>
      <h1 style={styles.mainTitle}>Evaluaciones</h1>
      <div style={styles.calendarContainer}>
        <Calendar
          value={selectedDate}
          onActiveStartDateChange={({ activeStartDate }) => {
            setSelectedDate(activeStartDate);
          }}
          tileContent={getTileContent}
          locale="es-ES"
        />
      </div>
      <div style={styles.timelineContainer}>
        <h2 style={styles.sectionTitle}>
          Evaluaciones para {selectedDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
        </h2>
        <div>
          {timeline.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-date">{item.fecha}</div>
              <div className="timeline-proveedor">{item.proveedor}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  formContainer: {
    width: "130%",
    margin: "0 auto",
    marginLeft: "-245px",
    height: "calc(100vh - 55px)",
  },
  mainTitle: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  calendarContainer: {
    width: "1120px", // Tamaño fijo
    height: "390px", // Tamaño fijo
    marginBottom: "10px",
    contentAlign: "center",
    position: "relative", // Asegura que el contenido no se desplace
    border: "1px solid #11325b", // Opcional, para separar visualmente el calendario
  },
  timelineContainer: {
    marginTop: "20px",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "10px",
    color: "#11325b",
  },
};

export default EvaluacionesApp;
