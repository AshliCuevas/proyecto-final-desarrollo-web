import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EvaluacionesApp = ({ userType, userId }) => {
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
        fecha_inicio: '2025-01-01',
        fecha_fin: '2025-12-31',
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
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
          font-size: 16px;
        }
        .react-calendar {
          font-family: 'Poppins', sans-serif;
          font-size: 1.2em;
          width: 100%;
          max-width: 100%;
        }
        .react-calendar__viewContainer {
          min-height: 300px; /* Define fixed height for the calendar */
          max-height: 300px;
        }
        .react-calendar__tile--now {
          background: #007bff !important;
          color: white !important;
        }
        .timeline-container {
          padding: 0;
        }
        .timeline-item {
          margin: 10px 0;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .timeline-date {
          background-color: #007bff;
          color: white;
          border-radius: 5px;
          padding: 5px 10px;
          margin-bottom: 5px;
        }
        .timeline-proveedor {
          margin-left: 10px;
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
    width: "100%",
    margin: "auto",
    padding: "20px",
    height: "calc(107vh - 65px)",
    overflowY: "scroll",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
  },
  mainTitle: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  calendarContainer: {
    marginBottom: "20px",
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
