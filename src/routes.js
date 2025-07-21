// Importa el framework Express para manejar las solicitudes HTTP
const express = require('express');
// Importa fs.promises para leer y escribir archivos de forma asíncrona
const fs = require('fs').promises;
// Importa el módulo path para manejar rutas de archivos
const path = require('path');
// Crea un enrutador de Express
const router = express.Router();

// Ruta del archivo JSON que contiene los datos de los artículos
const filePath = path.join(__dirname, 'articulosSupermercado.json');

// Ruta de prueba para la raíz
router.get('/', (req, res) => {
    res.send('¡Hola Mundo!');
});

// Ruta para obtener todos los artículos
router.get('/articulos', async (req, res) => {
    try {
        // Lee los datos del archivo JSON de forma asíncrona
        const data = await fs.readFile(filePath, 'utf8');
        // Convierte los datos JSON en un objeto JavaScript
        const articulos = JSON.parse(data);
        // Envía la respuesta con los artículos en formato JSON
        res.json(articulos);
    } catch (err) {
        console.error('Error al leer el archivo JSON:', err);
        // En caso de error, envía una respuesta de error con estado 500
        res.status(500).json({ error: 'Error al leer el archivo JSON' });
    }
});

// Ruta para agregar un nuevo artículo
router.post('/articulos', async (req, res) => {
    try {
        // Lee los datos del archivo JSON de forma asíncrona
        const data = await fs.readFile(filePath, 'utf8');
        // Convierte los datos JSON en un objeto JavaScript
        const articulos = JSON.parse(data);
        // Obtiene el nuevo artículo de la solicitud
        const nuevoArticulo = req.body;

        // Valida si los datos del artículo son completos
        if (!nuevoArticulo.codigo || !nuevoArticulo.categoria || !nuevoArticulo.precio || !nuevoArticulo.unidad) {
            return res.status(400).json({ error: 'Datos del artículo incompletos' });
        }

        // Agrega el nuevo artículo al array de artículos
        articulos.push(nuevoArticulo);
        // Escribe los datos actualizados en el archivo JSON
        await fs.writeFile(filePath, JSON.stringify(articulos, null, 2));
        // Envía una respuesta con estado 201 (Created) y el nuevo artículo
        res.status(201).json(nuevoArticulo);
    } catch (err) {
        console.error('Error al escribir en el archivo JSON:', err);
        // En caso de error, envía una respuesta de error con estado 500
        res.status(500).json({ error: 'Error al escribir en el archivo JSON' });
    }
});

// Ruta para actualizar un artículo
router.put('/articulos/:codigo', async (req, res) => {
    try {
        // Lee los datos del archivo JSON de forma asíncrona
        const data = await fs.readFile(filePath, 'utf8');
        // Convierte los datos JSON en un objeto JavaScript
        let articulos = JSON.parse(data);
        // Obtiene el código del artículo de los parámetros de la solicitud
        const codigo = req.params.codigo;
        // Obtiene los datos actualizados del artículo de la solicitud
        const articuloActualizado = req.body;

        // Busca el índice del artículo a actualizar
        const index = articulos.findIndex(articulo => articulo.codigo === codigo);
        if (index !== -1) {
            // Actualiza el artículo en la posición encontrada
            articulos[index] = { ...articulos[index], ...articuloActualizado };
            // Escribe los datos actualizados en el archivo JSON
            await fs.writeFile(filePath, JSON.stringify(articulos, null, 2));
            // Envía una respuesta con el artículo actualizado
            res.json(articulos[index]);
        } else {
            // Si no se encuentra el artículo, envía una respuesta de error con estado 404
            res.status(404).json({ error: 'Artículo no encontrado' });
        }
    } catch (err) {
        console.error('Error al leer el archivo JSON:', err);
        // En caso de error, envía una respuesta de error con estado 500
        res.status(500).json({ error: 'Error al leer el archivo JSON' });
    }
});

// Ruta para eliminar un artículo
router.delete('/articulos/:codigo', async (req, res) => {
    try {
        // Lee los datos del archivo JSON de forma asíncrona
        const data = await fs.readFile(filePath, 'utf8');
        // Convierte los datos JSON en un objeto JavaScript
        let articulos = JSON.parse(data);
        // Obtiene el código del artículo de los parámetros de la solicitud
        const codigo = req.params.codigo;

        // Busca el índice del artículo a eliminar
        const index = articulos.findIndex(articulo => articulo.codigo === codigo);
        if (index !== -1) {
            // Elimina el artículo del array de artículos
            const articuloEliminado = articulos.splice(index, 1);
            // Escribe los datos actualizados en el archivo JSON
            await fs.writeFile(filePath, JSON.stringify(articulos, null, 2));
            // Envía una respuesta con el artículo eliminado
            res.json(articuloEliminado);
        } else {
            // Si no se encuentra el artículo, envía una respuesta de error con estado 404
            res.status(404).json({ error: 'Artículo no encontrado' });
        }
    } catch (err) {
        console.error('Error al leer el archivo JSON:', err);
        // En caso de error, envía una respuesta de error con estado 500
        res.status(500).json({ error: 'Error al leer el archivo JSON' });
    }
});

// Exporta el enrutador para ser utilizado en otras partes de la aplicación
module.exports = router;
