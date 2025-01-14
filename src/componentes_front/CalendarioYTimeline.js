import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarioTimeLine = ({ userType, userId }) => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchEvaluaciones();
  }, []);

  useEffect(() => {
    generateTimelineForMonth();
  }, [selectedDate, evaluaciones]);

  const fetchEvaluaciones = async () => {
    try {
      const params = new URLSearchParams({
        fecha_inicio: null,
        fecha_fin: null,
      });

      if (userType === 'inspector') {
        params.append('id_inspector', userId);
      }

      const response = await fetch(`http://localhost:3001/evaluacion?${params.toString()}`);
      const data = await response.json();

      // Simulated random data for testing purposes
      const simulatedData = [
        {
          id_evaluacion: 1,
          id_proveedor: 1,
          fecha: '2025-01-14',
        },
        {
          id_evaluacion: 2,
          id_proveedor: 2,
          fecha: '2025-01-15',
        },
        {
          id_evaluacion: 3,
          id_proveedor: 3,
          fecha: '2025-01-20',
        },
      ];

      setEvaluaciones(Array.isArray(data) ? [...data, ...simulatedData] : simulatedData);
    } catch (error) {
      console.error('Error fetching evaluaciones:', error);
    }
  };

  const fetchProveedor = async (idProveedor) => {
    try {
      const response = await fetch(`http://localhost:3001/proveedor/${idProveedor}`);
      const data = await response.json();
      return data.nombre || 'Desconocido';
    } catch (error) {
      console.error(`Error fetching proveedor ${idProveedor}:`, error);
      return 'Desconocido';
    }
  };

  const generateTimelineForMonth = async () => {
    const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

    const timelineData = [];

    for (const evaluacion of evaluaciones) {
      const evalDate = new Date(evaluacion.fecha);
      if (evalDate >= monthStart && evalDate <= monthEnd) {
        const nombreProveedor = await fetchProveedor(evaluacion.id_proveedor);
        timelineData.push({
          fecha: evalDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' }),
          proveedor: nombreProveedor,
        });
      }
    }

    setTimeline(timelineData);
  };

  const getTileContent = ({ date }) => {
    if (!Array.isArray(evaluaciones)) return null;

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
          align-items: center; /* Centrado vertical */
          justify-content: center; /* Centrado horizontal */
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

        .react-calendar__tile--now {
          background: #007bff !important;
          height: 40px;
          width: 40px;
          display: flex; /* Para centrar contenido */
          align-items: center; /* Centrado vertical */
          justify-content: center; /* Centrado horizontal */
          color: white !important;
        }

        .react-calendar__tile:hover {
          background-color: rgba(0, 123, 255, 0.2) !important;
          color: black !important;
          display: flex; /* Para centrar contenido */
          align-items: center; /* Centrado vertical */
          justify-content: center; /* Centrado horizontal */
          height: 40px;
          width: 40px;
          border: none;
          box-shadow: none;
        }

        .timeline-container {
          padding: 0;
        }

        .timeline-item {
          margin: 5px 0;
          padding: 5px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .timeline-date {
          background-color: #007bff;
          display: flex; /* Para centrar contenido */
          align-items: center; /* Centrado vertical */
          justify-content: center; /* Centrado horizontal */
          color: white;
          border-radius: 5px;
          padding: 5px 5px;
          margin-bottom: 5px;
        }

        .timeline-proveedor {
          margin-left: 10px;
          font-size: 14px;
          color: #11325b;
        }

      `}</style>
      <h1 style={styles.mainTitle}>Calendario de evaluaciones</h1>
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
    marginLeft: "-190px",
    height: "calc(100vh - 55px)",
  },
  mainTitle: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  calendarContainer: {
    width: "1000px", // Tamaño fijo
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

export default CalendarioTimeLine;
