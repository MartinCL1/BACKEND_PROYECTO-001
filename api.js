const express = require('express');
const routeImagenes = express.Router();
const { obtenerImagenes } = require('./services/ImageKit');

const INFORMACION_PERMITIDA = ["gimnospermas", "briofitas", "angiospermas"]

routeImagenes.get('/v1/imagenes/:especie', async (request, response) => {
    const especie = request.params.especie  

    if(!INFORMACION_PERMITIDA.includes(especie)) return response.status(401).json({error: "Formato no valido"});

    try {
        const imagenes = await obtenerImagenes(especie);
        response.status(200).json({ imagenes });
    } catch (error) {
        response.status(500).json({
            error: 'No se pudieron obtener las imagenes de ImageKit',
            detalle: error.message
        });
    }
});

module.exports = routeImagenes;
