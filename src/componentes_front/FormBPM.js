import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CatEstablecimientoForm from "./CatEstablecimientoForm";

const FormBPM = () => {
    const [responses, setResponses] = useState(Array(45).fill(null));
    const navigate = useNavigate();

    const handleSelectChange = (index, value) => {
        const updatedResponses = [...responses];
        updatedResponses[index] = value;
        setResponses(updatedResponses);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const scoreMap = {
            "Cumplimiento Total": 1,
            "Cumplimiento Parcial": 0.5,
            "Incumplimiento Total": 0,
            "No Aplica": -1,
        };
        const scores = responses.map(response => scoreMap[response] || 0);

        try {
            const response = await fetch("/api/submit-inspection", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ scores }),
            });

            if (!response.ok) {
                throw new Error("Error al enviar los datos al backend");
            }

            alert("Formulario enviado exitosamente");

            // Navegar a CatEstablecimientoForm
            navigate("/CatEstablecimientoForm");
        } catch (error) {
            console.error(error);
            alert("Hubo un error al enviar el formulario");
        }
    };

    const sections = [
        {
            title: "ESTABLECIMIENTO - DISEÑO DE LAS INSTALACIONES Y EQUIPO",
            subsections: [
                {
                    title: "Ubicación y estructura",
                    items: [
                        "Ubicación adecuada",
                        "Alrededores limpios",
                    ],
                },
                {
                    title: "Diseño y disposición del establecimiento",
                    items: [
                        "Diseño que permite limpieza y mantenimiento",
                        "Disposición que minimiza la contaminación cruzada",
                    ],
                },
                {
                    title: "Estructuras internas y accesorios",
                    items: [
                        "Paredes lisas e impermeables",
                        "Pisos duraderos y fáciles de limpiar",
                        "Techos sin grietas y con drenaje adecuado",
                        "Ventanas con mallas contra insectos",
                        "Puertas fáciles de limpiar y mantener",
                        "Superficies en contacto con los medicamentos son seguras",
                    ],
                },
            ],
        },
        {
            title: "INSTALACIONES",
            subsections: [
                {
                    title: "Drenaje y eliminación de residuos",
                    items: [
                        "Sistema de drenaje adecuado",
                        "Eliminación segura de residuos sólidos",
                    ],
                },
                {
                    title: "Instalaciones de limpieza",
                    items: [
                        "Filtro sanitario a la entrada",
                        "Estaciones separadas para lavado y desinfección",
                    ],
                },
                {
                    title: "Instalaciones para la higiene personal y servicios sanitarios",
                    items: [
                        "Vestidores con casilleros y espejos",
                        "Servicios sanitarios separados por sexo",
                        "Lavamanos con suficiente agua potable",
                    ],
                },
                {
                    title: "Calidad del aire y ventilación",
                    items: [
                        "Ventilación adecuada para evitar contaminación",
                    ],
                },
                {
                    title: "Iluminación",
                    items: [
                        "Iluminación suficiente para actividades higiénicas",
                        "Protección contra roturas de luminarias",
                    ],
                },
                {
                    title: "Temperatura",
                    items: [
                        "Control de temperatura para garantizar la inocuidad",
                    ],
                },
                {
                    title: "Almacenamiento",
                    items: [
                        "Instalaciones separadas para almacenamiento seguro",
                    ],
                },
            ],
        },
        {
            title: "EQUIPO",
            subsections: [
                {
                    title: "Diseño del equipo",
                    items: [
                        "Equipos diseñados para evitar contaminación",
                        "Fáciles de limpiar, desinfectar y mantener",
                    ],
                },
            ],
        },
        {
            title: "CAPACITACIÓN Y COMPETENCIA",
            subsections: [
                {
                    title: "Conocimiento y responsabilidades",
                    items: [
                        "Personal capacitado en higiene y manipulación",
                    ],
                },
                {
                    title: "Programas de capacitación",
                    items: [
                        "Programa escrito de capacitación en BPM",
                    ],
                },
                {
                    title: "Instrucción y supervisión",
                    items: [
                        "Supervisión efectiva en protección de medicamentos",
                    ],
                },
            ],
        },
        {
            title: "MANTENIMIENTO, LIMPIEZA, DESINFECCIÓN Y CONTROL DE PLAGAS",
            subsections: [
                {
                    title: "Mantenimiento y limpieza",
                    items: [
                        "Procedimientos escritos para limpieza y desinfección",
                    ],
                },
                {
                    title: "Sistemas de control de plagas",
                    items: [
                        "Programa escrito para el control de plagas",
                    ],
                },
            ],
        },
        {
            title: "HIGIENE PERSONAL",
            subsections: [
                {
                    title: "Prácticas de higiene personal",
                    items: [
                        "Políticas de higiene personal documentadas",
                    ],
                },
            ],
        },
        {
            title: "CONTROL DE LAS OPERACIONES",
            subsections: [
                {
                    title: "Descripción de los productos y procesos",
                    items: [
                        "Productos descritos de manera adecuada",
                    ],
                },
                {
                    title: "Especificaciones microbiológicas, físicas, químicas y de alérgenos",
                    items: [
                        "Especificaciones alineadas con normas oficiales",
                    ],
                },
                {
                    title: "Materiales y materias primas",
                    items: [
                        "Control de calidad en materias primas",
                    ],
                },
                {
                    title: "Agua",
                    items: [
                        "Abastecimiento suficiente de agua potable",
                    ],
                },
                {
                    title: "Envasado",
                    items: [
                        "Materiales de envasado inocuos y adecuados",
                    ],
                },
                {
                    title: "Procedimientos de retiro del mercado",
                    items: [
                        "Retiro adecuado de medicamentos no conformes",
                    ],
                },
            ],
        },
        {
            title: "INFORMACIÓN SOBRE LOS PRODUCTOS Y SENSIBILIZACIÓN",
            subsections: [
                {
                    title: "Etiquetado de los productos",
                    items: [
                        "Cumplimiento con normas de etiquetado",
                    ],
                },
            ],
        },
        {
            title: "TRANSPORTE",
            subsections: [
                {
                    title: "Condiciones de transporte",
                    items: [
                        "Medios de transporte adecuados para medicamentos",
                    ],
                },
            ],
        },
    ];

    return (
        <form onSubmit={handleSubmit} style={styles.formContainer}>
            <h1 style={styles.mainTitle}>Ficha Inspección BPM</h1>

            {sections.map((section, sectionIndex) => (
                <div key={sectionIndex} style={styles.sectionContainer}>
                    <h2 style={styles.sectionTitle}>{section.title}</h2>
                    {section.subsections.map((subsection, subsectionIndex) => (
                        <div key={subsectionIndex} style={styles.subsectionContainer}>
                            <h3 style={styles.subsectionTitle}>{subsection.title}</h3>
                            {subsection.items.map((item, itemIndex) => {
                                const globalIndex = sectionIndex * 10 + subsectionIndex * 5 + itemIndex;
                                return (
                                    <div key={globalIndex} style={styles.itemContainer}>
                                        <label style={styles.label}>{item}</label>
                                        <select
                                            value={responses[globalIndex] || ""}
                                            onChange={(e) =>
                                                handleSelectChange(globalIndex, e.target.value)
                                            }
                                            style={styles.select}
                                        >
                                            <option value="">Seleccione una opción</option>
                                            <option value="Cumplimiento Total">Cumplimiento Total</option>
                                            <option value="Cumplimiento Parcial">Cumplimiento Parcial</option>
                                            <option value="Incumplimiento Total">Incumplimiento Total</option>
                                            <option value="No Aplica">No Aplica</option>
                                        </select>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            ))}

            <button type="submit" style={styles.submitButton}>Siguiente</button>
        </form>
    );
};

const styles = {
    formContainer: {
        width: "195%", // Ocupa todo el ancho de la pantalla
        margin: "auto",
        padding: "20px",
        marginLeft: "-215px", // Reduce el espacio entre el contenedor y el sidebar
        height: "calc(107vh - 65px)", // Ocupa toda la altura menos el header
        overflowY: "scroll", // Activa el scrollbar
        backgroundColor: "#ffffff",
        boxSizing: "border-box",
    },
    mainTitle: {
        textAlign: "center",
        marginBottom: "20px",
        marginTop: "4px",
        fontSize: "24px",
        color: "#333",
    },
    sectionContainer: {
        marginBottom: "50px",
        border: "2px solid #11325b",
    },
    sectionTitle: {
        fontSize: "20px",
        marginBottom: "5px",
        color: "#11325b",
    },
    subsectionContainer: {
        marginBottom: "20px",
        paddingLeft: "10px"
    },
    subsectionTitle: {
        fontSize: "17px",
        marginTop: "5px",
        marginBottom: "15px",
        color: "rgb(156, 160, 160)",
    },
    itemContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
    },
    label: {
        flex: "0 0 60%",
        textAlign: "left",
        marginLeft: "25px",
        fontSize: "16px",
        color: "#333",
    },
    select: {
        flex: "1",
        padding: "5px",
        fontSize: "16px",
        marginRight:"30px",
        borderRadius: "5px",
        border: "1.5px solid #11325b",
    },
    submitButton: {
        display: "block",
        marginTop: "-10px",
        width: "200px",
        margin: "20px auto",
        padding: "10px 20px",
        fontSize: "18px",
        backgroundColor: "#5ce1e6",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
    },
};

export default FormBPM;