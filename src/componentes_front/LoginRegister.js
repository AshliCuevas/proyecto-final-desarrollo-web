import React, { useState, useEffect } from "react";
import {Login} from "../service/serviceApi";
import { useNavigate } from "react-router-dom";

const LoginRegister = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        rnc: "",
        ubicacion: "",
        telefono: "",
    });
    const [alert, setAlert] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordError, setPasswordError] = useState(""); // State for password error

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isRegistering ? "/register" : "/login";
        console.log(formData);
        /*const response = await fetch(`http://localhost:5000${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });*/
        const response = await Login(formData.email, formData.password);
        console.log(response);
        if(response.error){
            // Add password error if needed
            if (!response.message.includes("password")) {
                setPasswordError("La contraseña es incorrecta");
            }
            setAlert({ message: 'Credenciales Invalidas', type: "error", autoClear: true });
            return;
        }
        if(response?.usuario){
            setAlert({ message: response.message, type: response.ok ? "success" : "error", autoClear: formData.autoClear });

            if (!isRegistering) {
                //localStorage.setItem("token", data.token);
                if(response.usuario.rol == "inspector" ){
                    navigate("/SolicitudPage");
                }

                if(response.usuario.rol == "Administrador" ){
                    navigate("/EvaluacionesPage");
                }

                if(response.usuario.rol == "Proveedor" ){   
                    navigate("/CalendarioPageIns");
                }
            }

          
        }
    };

    useEffect(() => {
        const shouldAutoClear = alert?.autoClear ?? false;
        if (alert && alert.message) {
            const timer = setTimeout(() => {
                setAlert(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <div style={styles.container}>
            {alert && <AlertBox message={alert.message} type={alert.type} />}
            <div style={styles.card}>
                <div style={styles.imageContainer}>
                    <img
                        src="https://plus.unsplash.com/premium_photo-1670381251596-4a6eccc9ff24?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="pastillas"
                        style={styles.image}
                    />
                </div>
                <div style={styles.formContainer}>
                    <div style={styles.logoContainer}>
                        <img
                            src="/imagenes/LogoC.png" // Ruta correcta al archivo de logo
                            alt="Logo"
                            style={styles.logo}
                        />
                    </div>
                    <h2 style={styles.title}>{isRegistering ? "Crea una cuenta" : "Ingresa a tu cuenta"}</h2>
                    <p style={styles.subtitle}>
                        {isRegistering ? "Lleva nuevos farmacos al mundo" : "Bienvenido al mundo de los farmacos"}
                    </p>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        {!isRegistering && (
                            <>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    style={{ ...styles.input, width: "115%" }}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    style={{ ...styles.input, width: "115%" }}
                                />
                            </>
                        )}
                        {isRegistering && (
                            <div style={styles.form}>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Nombre de empresa"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                    style={{ ...styles.input, width: "150%" }}
                                />
                                <input
                                    type="text"
                                    name="ubicacion"
                                    placeholder="Ubicación"
                                    value={formData.ubicacion}
                                    onChange={handleInputChange}
                                    required
                                    style={{ ...styles.input, width: "150%" }}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    style={{ ...styles.input, width: "150%" }}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    style={{ ...styles.input, width: "150%" }}
                                />
                            </div>
                        )}

                        {isRegistering && (
                            <div style={styles.twoColumns}>
                                <input
                                    type="text"
                                    name="rnc"
                                    placeholder="RNC"
                                    value={formData.rnc}
                                    onChange={handleInputChange}
                                    required
                                    style={{ ...styles.input, width: "80%" }}
                                />
                                <input
                                    type="text"
                                    name="telefono"
                                    placeholder="Teléfono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    required
                                    style={{ ...styles.input, width: "80%" }}
                                />
                            </div>
                        )}
                        
                        {passwordError && <div style={styles.error}>{passwordError}</div>}
                        <ButtonWithHover>{isRegistering ? "Registrar" : "Iniciar Sesión"}</ButtonWithHover>
                    </form>
                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        style={styles.toggleButton}
                    >
                        {isRegistering
                            ? "¿Ya tienes una cuenta? Inicia sesión"
                            : "¿No tienes una cuenta? Regístrate"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const AlertBox = ({ message, type }) => {
    const alertStyles = {
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "15px",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        color: type === "error" ? "#1565c0" : "#4caf50",
        border: `1px solid ${type === "error" ? "#1565c0" : "#4caf50"}`,
        boxShadow: "0 2px 15px rgba(40, 40, 40, 0.66)",
        zIndex: 1000,
    };

    return <div style={alertStyles}>{message}</div>;
};

const ButtonWithHover = ({ children, onClick }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <button
            style={{
                ...styles.button,
                ...(isHovered && styles.buttonHover),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#e3f2fd",
        margin: 0,
    },
    card: {
        display: "flex",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        maxWidth: "none",
        overflowY: "auto",  // Permite el desplazamiento vertical
    },
    imageContainer: {
        flex: 1,
        backgroundColor: "#bbdefb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    image: {
        width: "100%",
        height: "130%",
        objectFit: "cover",
        borderRadius: "0px",
    },
    formContainer: {
        flex: 1,
        padding: "40px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%",
        //overflowY: "auto",  // Permite el desplazamiento vertical
    },
    title: {
        fontSize: "30px",
        fontWeight: "600",
        color: "#11325b",
        marginTop: "70px",
        marginBottom: "-5px",
        fontFamily: "'Poppins', sans-serif",
    },
    subtitle: {
        fontSize: "14px",
        color: "#11325b",
        marginBottom: "25px",
        fontFamily: "'Poppins', sans-serif",
    },
    form: {
        marginTop: "5px",
        display: "flex",
        flexDirection: "column", // Cambié a "column" para que los campos se apilen verticalmente
        justifyContent: "center",
        alignItems: "center",
        gap: "15px", // Espaciado entre campos
        
    },
    input: {
        padding: "16px",
        borderRadius: "12px",
        border: "1px solid #11325b",
        fontSize: "16px",
        outline: "none",
        fontFamily: "'Poppins', sans-serif",
        height: "auto",
        width: "100%", // Cambié esto para que se ajusten al 100% del espacio disponible
        maxWidth: "350px",
    },
    twoColumns: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px", // Espaciado entre las columnas
        width: "80%",
        overflowY: "auto",  // Permite el desplazamiento vertical
    },
    button: {
        marginTop: "15px",
        padding: "16px",
        borderRadius: "15px",
        backgroundColor: "#0a78b9",
        color: "#fff",
        border: "none",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "background-color 0.3s",
        fontFamily: "'Poppins', sans-serif",
        height: "auto",
        width: "130%",
        maxWidth: "350px",
    },
    buttonHover: {
        backgroundColor: "#0d47a1",
    },
    toggleButton: {
        marginTop: "12px",
        backgroundColor: "transparent",
        color: "#1e88e5",
        border: "none",
        cursor: "pointer",
        textDecoration: "underline",
        fontFamily: "'Poppins', sans-serif",
    },
    logoContainer: {
        display: "flex",
        marginBottom: "15px",
        marginTop: "60px",
        height: "45px",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    logo: {
        width: "350px",
        height: "auto",
    },
    error: {
        color: "#f44336",
        fontSize: "14px",
        marginTop: "10px",
    },
};

export default LoginRegister;
