// Importar las dependencias necesarias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Importar el módulo 'path'
const fs = require('fs'); // Para trabajar con archivos

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Habilitar CORS
app.use(bodyParser.json()); // Parsear solicitudes JSON
app.use(express.static('Front')); // Servir archivos estáticos desde la carpeta 'Front'

// Función para leer inquilinos desde el archivo
function leerInquilinos() {
    const data = fs.readFileSync(path.join(__dirname, 'inquilinos.dat'), 'utf8');
    return JSON.parse(data);
}

// Función para guardar inquilinos en el archivo
function guardarInquilinos(inquilinos) {
    fs.writeFileSync(path.join(__dirname, 'inquilinos.dat'), JSON.stringify(inquilinos, null, 2), 'utf8');
}

// Ruta para registrar un nuevo inquilino
app.post('/api/inquilinos', (req, res) => {
    const { documento, nombre, telefono, id } = req.body;
    const inquilinos = leerInquilinos();

    // Verificar si el ID ya está en uso
    const inquilinoExistente = inquilinos.find(i => i.id == id);
    if (inquilinoExistente) {
        return res.status(400).json({
            mensaje: `El ID Inquilino ${id} ya está en uso. Último inquilino registrado: ${inquilinoExistente.nombre}`
        });
    }

    // Crear el nuevo inquilino
    const nuevoInquilino = { id, documento, nombre, telefono };
    inquilinos.push(nuevoInquilino);
    guardarInquilinos(inquilinos);
    res.status(201).json(nuevoInquilino);
});

// Ruta para buscar inquilinos por documento
app.get('/api/inquilinos/:documento', (req, res) => {
    const { documento } = req.params;
    const inquilinos = leerInquilinos();
    const inquilino = inquilinos.find(i => i.documento === documento);
    if (inquilino) {
        res.json(inquilino);
    } else {
        res.status(404).json({ mensaje: 'Inquilino no encontrado' });
    }
});

// Ruta para servir login.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front/html/login.html')); // Ajusta la ruta si es necesario
});

// Función para leer propietarios desde el archivo
function leerPropietarios() {
    const data = fs.readFileSync(path.join(__dirname, 'propietarios.dat'), 'utf8');
    return JSON.parse(data);
}

// Función para guardar propietarios en el archivo
function guardarPropietarios(propietarios) {
    fs.writeFileSync(path.join(__dirname, 'propietarios.dat'), JSON.stringify(propietarios, null, 2), 'utf8');
}

// Ruta para registrar un nuevo propietario
app.post('/api/propietarios', (req, res) => {
    const { documento, nombre, telefono } = req.body;
    const propietarios = leerPropietarios();
    const nuevoPropietario = { id: propietarios.length + 1, documento, nombre, telefono };
    propietarios.push(nuevoPropietario);
    guardarPropietarios(propietarios);
    res.status(201).json(nuevoPropietario);
});

// Ruta para buscar propietarios por documento
app.get('/api/propietarios/:documento', (req, res) => {
    const { documento } = req.params;
    const propietarios = leerPropietarios();
    const propietario = propietarios.find(p => p.documento === documento);
    if (propietario) {
        res.json(propietario);
    } else {
        res.status(404).json({ mensaje: 'Propietario no encontrado' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
