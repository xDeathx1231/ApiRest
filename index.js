const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Reporte = require('./models/ReporteSchema');

const app = express();
app.use(cors());
app.use(express.json());

// 🚫 Elimina esta línea porque ya no guardaremos en memoria
// let reportes = [];

// 📋 Obtener todos los reportes desde MongoDB
app.get('/api/reportes', async (req, res) => {
    try {
        const reportes = await Reporte.find(); // buscar todos los reportes en MongoDB
        res.json(reportes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener reportes.', error: error.message });
    }
});

// 📋 Crear un nuevo reporte en MongoDB
app.post('/api/reportes', async (req, res) => {
    try {
        const nuevoReporte = new Reporte(req.body);
        await nuevoReporte.save();
        console.log("Nuevo reporte guardado en MongoDB:", nuevoReporte);
        res.status(201).json({ mensaje: "Reporte creado exitosamente." });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear reporte.', error: error.message });
    }
});
// 📋 Eliminar un reporte por ID
app.delete('/api/reportes/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const reporteEliminado = await Reporte.findByIdAndDelete(id);
        if (!reporteEliminado) {
            return res.status(404).json({ mensaje: 'Reporte no encontrado.' });
        }
        res.json({ mensaje: 'Reporte eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar reporte.', error: error.message });
    }
});


const PORT = process.env.PORT || 3000;

// ✅ Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://GonzaloZavala:XxRwbOppRS5LfbTw@bdapirestmoviles.xaun5y6.mongodb.net/reportesdb?retryWrites=true&w=majority&appName=BDApiRestMoviles')
.then(() => {
    console.log('✅ Conexión exitosa a MongoDB Atlas');
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
})
.catch(err => console.error('❌ Error conectando a MongoDB:', err));
