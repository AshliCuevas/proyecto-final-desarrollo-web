import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Login function
export const Login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/usuarios/login`, {
            email: username,
            contrasena: password
        });
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

// Register function
export const Register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/usuarios/register`, userData);
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

// Get all users
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/usuarios`);
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

// Create solicitud
export const createSolicitud = async (solicitudData) => {
    try {
        const response = await axios.post(`${API_URL}/solicitudes`, solicitudData);
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

// Get solicitudes
export const getSolicitudes = async () => {
    try {
        const response = await axios.getimport axios, from 'axios';

const API_URL = 'http://localhost:3001';

// Login function
export const Login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/usuarios/login`, {
            email: username,
            contrasena: password
        });
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

// Register function
export const Register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/usuarios/register`, userData);
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

// Get all users
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/usuarios`);
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

// Create solicitud
export const createSolicitud = async (solicitudData) => {
    try {
        const response = await axios.post(`${API_URL}/solicitudes`, solicitudData);
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

// Get solicitudes
export const getSolicitudes = async () => {
    try {
        const response = await axios.get