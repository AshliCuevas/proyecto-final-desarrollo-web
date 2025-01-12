const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10; 
const SECRET_KEY = "010408ab#de@"; 

// Función para encriptar una contraseña
const encryptPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
};

// Función para comparar contraseñas
const comparePasswords = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

// Función para generar un JWT
const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }); // Token válido por 1 hora
};

// Función para verificar un JWT
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        return null; // Token inválido o expirado
    }
};

module.exports = {
    encryptPassword,
    comparePasswords,
    generateToken,
    verifyToken,
};
