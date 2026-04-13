const express = require('express');
const app = express();
const routeImagenes = require('./api');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;


app.use(cors({origin: "https://port-proyecto-001.netlify.app/", credentials: true }))
app.use(express.json());
app.use("/api", routeImagenes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});