const ImageKit = require("@imagekit/nodejs");
require("dotenv").config();

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

const crearImagenFirmada = (imagen) => {
    return client.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
        src: imagen,
        transformation: [
            {
                focus: "center",
                format: "auto",
                quality: "auto",
                cropMode: "pad_resize",
            },
        ],
        signed: true,
        expiresIn: 300,
    });
};

const obtenerImagenes = async (especie) => {
    const imagenes = await client.assets.list({
        path: `/Portafolio-001/${especie}`,
        type: "file"
    });
    
    const nuevosFiles = imagenes.map((imagen) => {
        const imagenFirmada = crearImagenFirmada(imagen.filePath);
        let imagenIdentificador = imagen.name
        imagenIdentificador = imagenIdentificador.replace(/\..*$/, '')
        return { imagenFirmada, imagenIdentificador }
    })

    console.log(nuevosFiles)
    return nuevosFiles;
};

module.exports = {
    crearImagenFirmada,
    obtenerImagenes
};
