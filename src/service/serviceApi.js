import axios from "axios";
const API_URL  = "http://localhost:5000"; // URL base de tu API


// Crear usuario
export const createUsuario = async (usuarioData) => {
    try {
        const response = await axios.post(`${API_URL}/usuario`, usuarioData);
        if (response.status !== 201) {
            return { error: true, message: response.data.message || "Error al crear el usuario" };
        }
        return { usuario: response.data.usuario, message: response.data.message, ok: true };
    } catch (error) {
        return { error: true, message: error.response?.data?.message || error.message };
    }
};

// Autenticar usuario (login)
export const loginUsuario = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/usuario/login`, credentials);
        if (response.status !== 200) {
            return { error: true, message: response.data.message || "Error en el inicio de sesión" };
        }
        return { usuario: response.data.usuario, token: response.data.token, message: response.data.message, ok: true };
    } catch (error) {
        return { error: true, message: error.response?.data?.error || error.message };
    }
};

// Actualizar usuario
export const updateUsuario = async (id_usuario, usuarioData) => {
    try {
        const response = await axios.put(`${API_URL}/usuario/${id_usuario}`, usuarioData);
        if (response.status !== 200) {
            return { error: true, message: response.data.message || "Error al actualizar el usuario" };
        }
        return { usuario: response.data.usuario, message: response.data.message, ok: true };
    } catch (error) {
        return { error: true, message: error.response?.data?.message || error.message };
    }
};

// Eliminar usuario
export const deleteUsuario = async (id_usuario) => {
    try {
        const response = await axios.delete(`${API_URL}/usuario/${id_usuario}`);
        if (response.status !== 200) {
            return { error: true, message: response.data.message || "Error al eliminar el usuario" };
        }
        return { message: response.data.message, ok: true };
    } catch (error) {
        return { error: true, message: error.response?.data?.message || error.message };
    }
};


export const getAllCategorias = async () => {
    try {
        const response = await fetch(`${API_URL}/categoria-med`, { // Corrección en el template string
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: true, message: data.message || "Error al obtener las categorías médicas" };
        }

        return { categorias: data, message: "Categorías obtenidas con éxito", ok: response.ok };
    } catch (error) {
        console.error("Error en la función getAllCategorias:", error);
        return { error: true, message: "Error al conectar con el servidor" };
    }
};

export const getAllCategoriaNivel = async () => {
    try {
        const response = await fetch(`${API_URL}/categoria-nivel`, { // Corrección en el template string
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: true, message: data.message || "Error al obtener las categorías de nivel" };
        }

        return { categoriasNivel: data, message: "Categorías de nivel obtenidas con éxito", ok: response.ok };
    } catch (error) {
        console.error("Error en la función getAllCategoriaNivel:", error);
        return { error: true, message: "Error al conectar con el servidor" };
    }
};

// Función para crear una nueva categoría de nivel
export const createCategoriaNivel = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/categoria-nivel`, { // Corrección en el template string
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: true, message: data.message || "Error al crear la categoría de nivel" };
        }

        return { nuevaCategoriaNivel: data.nuevaCategoriaNivel, message: data.message, ok: response.ok };
    } catch (error) {
        console.error("Error en la función createCategoriaNivel:", error);
        return { error: true, message: "Error al conectar con el servidor" };
    }
};

export const getAllComplejidades = async () => {
    try {
        const response = await fetch(`${API_URL}/complejidad-med`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: true, message: data.message || "Error al obtener las complejidades médicas" };
        }

        return { complejidades: data, message: "Complejidades obtenidas con éxito", ok: response.ok };
    } catch (error) {
        console.error("Error en la función getAllComplejidades:", error);
        return { error: true, message: "Error al conectar con el servidor" };
    }
};

// Crear una nueva complejidad médica
export const createComplejidad = async (nombre_complejidad) => {
    try {
        const response = await fetch(`${API_URL}/complejidad-med`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre_complejidad }),
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: true, message: data.message || "Error al crear la complejidad médica" };
        }

        return { nuevaComplejidad: data, message: "Complejidad creada exitosamente", ok: response.ok };
    } catch (error) {
        console.error("Error en la función createComplejidad:", error);
        return { error: true, message: "Error al conectar con el servidor" };
    }
};

// Crear una nueva evaluación
export const createEvaluacion = async (evaluacionData) => {
    try {
        const response = await fetch(`${API_URL}/evaluacion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(evaluacionData),
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: true, message: data.message || 'Error al crear la evaluación' };
        }

        return { evaluacion: data.nuevaEvaluacion, message: 'Evaluación creada exitosamente', ok: response.ok };
    } catch (error) {
        console.error('Error en la función createEvaluacion:', error);
        return { error: true, message: 'Error al conectar con el servidor' };
    }
};

// Obtener evaluaciones con filtros
export const getEvaluacionesWithFilters = async (filters) => {
    try {
        const query = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_URL}/evaluacion?${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: true, message: data.message || 'Error al obtener las evaluaciones' };
        }

        return { evaluaciones: data, message: 'Evaluaciones obtenidas con éxito', ok: response.ok };
    } catch (error) {
        console.error('Error en la función getEvaluacionesWithFilters:', error);
        return { error: true, message: 'Error al conectar con el servidor' };
    }
};

// Actualizar una evaluación
export const updateEvaluacion = async (idEvaluacion, evaluacionData) => {
    try {
        const response = await fetch(`${API_URL}/evaluacion/${idEvaluacion}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(evaluacionData),
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: true, message: data.message || 'Error al actualizar la evaluación' };
        }

        return { evaluacion: data.evaluacionActualizada, message: 'Evaluación actualizada exitosamente', ok: response.ok };
    } catch (error) {
        console.error('Error en la función updateEvaluacion:', error);
        return { error: true, message: 'Error al conectar con el servidor' };
    }
};

// Eliminar una evaluación por ID
export const deleteEvaluacion = async (idEvaluacion) => {
    try {
        const response = await fetch(`${API_URL}/evaluacion/${idEvaluacion}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: true, message: data.message || 'Error al eliminar la evaluación' };
        }

        return { message: `Evaluación con ID ${idEvaluacion} eliminada exitosamente`, ok: response.ok };
    } catch (error) {
        console.error('Error en la función deleteEvaluacion:', error);
        return { error: true, message: 'Error al conectar con el servidor' };
    }
};


// Crear un nuevo factor
export const createFactor = async (data) => {
    try {
        const response = await fetch(`${API_URL}/factor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            return { error: true, message: result.message || 'Error al crear el factor' };
        }

        return { nuevoFactor: result.nuevoFactor, message: result.message, ok: response.ok };
    } catch (error) {
        console.error('Error en la función createFactor:', error);
        return { error: true, message: 'Error al conectar con el servidor' };
    }
};

// Obtener factores por evaluación
export const getFactorsByEvaluacion = async (id_evaluacion) => {
    try {
        const response = await fetch(`${API_URL}/factor/evaluacion/${id_evaluacion}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: true, message: data.message || 'Error al obtener los factores' };
        }

        return { factores: data, message: 'Factores obtenidos con éxito', ok: response.ok };
    } catch (error) {
        console.error('Error en la función getFactorsByEvaluacion:', error);
        return { error: true, message: 'Error al conectar con el servidor' };
    }
};

// Calcular y guardar el riesgo en una evaluación
export const calculateAndSaveRisk = async (nivelRiesgoAlimento, scores, idEvaluacion) => {
    try {
        const response = await fetch(`${API_URL}/evaluacion/calculate-risk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nivelRiesgoAlimento,
                scores,
                id_evaluacion: idEvaluacion,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: true, message: data.message || 'Error al calcular y guardar el riesgo' };
        }

        return { 
            result: data.result, 
            message: 'Cálculo y guardado realizados exitosamente', 
            ok: response.ok 
        };
    } catch (error) {
        console.error('Error en la función calculateAndSaveRisk:', error);
        return { error: true, message: 'Error al conectar con el servidor' };
    }
};

// Eliminar un factor
export const deleteFactor = async (id_factor) => {
    try {
        const response = await fetch(`${API_URL}/factor/${id_factor}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (!response.ok) {
            return { error: true, message: result.message || 'Error al eliminar el factor' };
        }

        return { message: result.message, ok: response.ok };
    } catch (error) {
        console.error('Error en la función deleteFactor:', error);
        return { error: true, message: 'Error al conectar con el servidor' };
    }
};

// Crear una nueva solicitud
export const createSolicitud = async (solicitudData) => {
    try {
        const response = await axios.post(`${API_URL}/solicitudes`, solicitudData);
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

// Obtener solicitudes filtradas por estado
export const getSolicitudesByStatus = async (status) => {
    try {
        const response = await axios.get(`${API_URL}/solicitudes`, {
            params: { status_solicitud: status },
        });
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

// Actualizar el estado y comentario de una solicitud
export const updateSolicitudStatus = async (id, status, comentario) => {
    try {
        const response = await axios.put(`${API_URL}/solicitudes/${id}`, {
            status_solicitud: status,
            comentario: comentario,
        });
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

// Eliminar una solicitud por ID
export const deleteSolicitud = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/solicitudes/${id}`);
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

// Obtener subcategorías por categoría médica
export const getSubcategoriasByCategoria = async (idCategoriaMed) => {
    try {
        const response = await axios.get(`${API_URL}/subcategoria-med/${idCategoriaMed}`);
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};
// Obtener todos los tipos de factores
export const getAllTipoFactor = async () => {
    try {
        const response = await axios.get(`${API_URL}/tipo-factor`);
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

// Crear un nuevo tipo de factor
export const createTipoFactor = async (tipoFactorData) => {
    try {
        const response = await axios.post(`${API_URL}/tipo-factor`, tipoFactorData);
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

// Crear un nuevo inspector
export const createInspector = async (id_usuario, cedula_inspector) => {
    try {
        const response = await axios.post(API_URL, { id_usuario, cedula_inspector });
        return response.data; // Retorna el inspector creado
    } catch (error) {
        console.error('Error al crear el inspector:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Obtener lista de inspectores con filtro opcional por nombre
export const getInspectorsByName = async (nombre = '') => {
    try {
        const response = await axios.get(API_URL, {
            params: { nombre },
        });
        return response.data; // Retorna la lista de inspectores
    } catch (error) {
        console.error('Error al obtener inspectores por nombre:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Obtener inspectores con evaluaciones recientes
export const getInspectorsWithEvaluations = async () => {
    try {
        const response = await axios.get(`${API_URL}/evaluaciones`);
        return response.data; // Retorna la lista de inspectores con evaluaciones recientes
    } catch (error) {
        console.error('Error al obtener inspectores con evaluaciones recientes:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Obtener inspectores sin evaluación en una fecha específica
export const getInspectorsWithoutEvaluationOnDate = async (fecha) => {
    try {
        const response = await axios.get(`${API_URL}/sin-evaluacion`, {
            params: { fecha },
        });
        return response.data; // Retorna la lista de inspectores sin evaluación
    } catch (error) {
        console.error('Error al obtener inspectores sin evaluación:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Eliminar un inspector por ID
export const deleteInspector = async (id_inspector) => {
    try {
        const response = await axios.delete(`${API_URL}/${id_inspector}`);
        return response.data; // Retorna el mensaje de éxito
    } catch (error) {
        console.error('Error al eliminar el inspector:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Crear un nuevo medicamento
export const createMedicamento = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data; // Retorna el medicamento creado
    } catch (error) {
        console.error('Error al crear el medicamento:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Obtener medicamentos por subcategoría
export const getMedicamentoBySubcategoria = async () => {
    try {
        const response = await axios.get(`${API_URL}/subcategoria`);
        return response.data; // Retorna la lista de medicamentos por subcategoría
    } catch (error) {
        console.error('Error al obtener medicamentos por subcategoría:', error.response?.data?.message || error.message);
        throw error;
    }
};

// Actualizar el estado de un medicamento
export const updateMedicamentoStatus = async (id_medicamento, status_medicamento) => {
    try {
        const response = await axios.put(`${API_URL}/${id_medicamento}`, { status_medicamento });
        return response.data; // Retorna el medicamento actualizado
    } catch (error) {
        console.error('Error al actualizar el estado del medicamento:', error.response?.data?.message || error.message);
        throw error;
    }
};

/**
 * Actualizar un nivel de riesgo.
 * @param {number} idNivelRiesgo - ID del nivel de riesgo a actualizar.
 * @param {Object} data - Datos a actualizar (nombre_riesgo, puntuacion).
 * @returns {Object} - Nivel de riesgo actualizado.
 */
export const updateNivelRiesgo = async (idNivelRiesgo, data) => {
    try {
        const response = await axios.put(`${API_URL}/${idNivelRiesgo}`, data);
        return response.data; // Retorna los datos del nivel de riesgo actualizado
    } catch (error) {
        console.error('Error al actualizar el nivel de riesgo:', error.response?.data?.message || error.message);
        throw error;
    }
};

/**
 * Obtener niveles de riesgo con información relacionada.
 * @returns {Array} - Lista de niveles de riesgo con información relacionada.
 */
export const getNivelRiesgoWithJoins = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Retorna la lista de niveles de riesgo con sus relaciones
    } catch (error) {
        console.error('Error al obtener niveles de riesgo:', error.response?.data?.message || error.message);
        throw error;
    }
};

/**
 * Crear un nuevo proveedor.
 * @param {Object} data - Datos del nuevo proveedor.
 * @returns {Object} - Proveedor creado.
 */
export const createProveedor = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data; // Retorna los datos del proveedor creado
    } catch (error) {
        console.error('Error al crear el proveedor:', error.response?.data?.message || error.message);
        throw error;
    }
};

/**
 * Obtener proveedores ordenados por evaluación.
 * @param {string} nombre - Filtro opcional por nombre.
 * @param {string} status_usuario - Filtro opcional por estado del usuario.
 * @returns {Array} - Lista de proveedores ordenados.
 */
export const getProveedoresOrdered = async (nombre = '', status_usuario = '') => {
    try {
        const response = await axios.get(API_URL, {
            params: { nombre, status_usuario },
        });
        return response.data; // Retorna la lista de proveedores ordenados
    } catch (error) {
        console.error('Error al obtener proveedores ordenados:', error.response?.data?.message || error.message);
        throw error;
    }
};

/**
 * Actualizar la ubicación de un proveedor.
 * @param {number} idProveedor - ID del proveedor a actualizar.
 * @param {string} ubicacion - Nueva ubicación.
 * @returns {Object} - Proveedor actualizado.
 */
export const updateProveedorUbicacion = async (idProveedor, ubicacion) => {
    try {
        const response = await axios.put(`${API_URL}/${idProveedor}`, { ubicacion });
        return response.data; // Retorna los datos del proveedor actualizado
    } catch (error) {
        console.error('Error al actualizar la ubicación del proveedor:', error.response?.data?.message || error.message);
        throw error;
    }
};

/**
 * Obtener información detallada de un proveedor.
 * @param {number} idProveedor - ID del proveedor.
 * @returns {Object} - Información detallada del proveedor.
 */
export const getProveedorInfo = async (idProveedor) => {
    try {
        const response = await axios.get(`${API_URL}/${idProveedor}`);
        return response.data; // Retorna la información detallada del proveedor
    } catch (error) {
        console.error('Error al obtener información del proveedor:', error.response?.data?.message || error.message);
        throw error;
    }
};
