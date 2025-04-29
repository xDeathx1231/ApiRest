const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let reportes = [];

app.get('/api/reportes', (req, res) => {
    res.json(reportes);
});

app.post('/api/reportes', (req, res) => {
    const nuevoReporte = req.body;
    reportes.push(nuevoReporte);
    console.log("Nuevo reporte recibido:", nuevoReporte);
    res.status(201).json({ mensaje: "Reporte creado exitosamente." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
