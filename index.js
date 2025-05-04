const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Reporte = require('./models/ReporteSchema');
const TipoReporte = require('./models/TipoReporteSchema');

const app = express();
app.use(cors());
app.use(express.json());

/* Obtener todos los reportes con el tipo (populate) */
app.get('/api/reportes', async (req, res) => {
  try {
    const reportes = await Reporte.find().populate('tipoReporte');
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reportes.', error: error.message });
  }
});

/* Crear un nuevo reporte (tipoReporte = ObjectId) */
app.post('/api/reportes', async (req, res) => {
  try {
    const nuevoReporte = new Reporte(req.body);
    await nuevoReporte.save();
    res.status(201).json({ mensaje: "Reporte creado exitosamente." });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear reporte.', error: error.message });
  }
});

/* Eliminar un reporte por ID */
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

/* Obtener tipos de reporte */
app.get('/api/tipos-reporte', async (req, res) => {
  try {
    const tipos = await TipoReporte.find();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener tipos de reporte.', error: error.message });
  }
});

/* Crear nuevo tipo de reporte */
app.post('/api/tipos-reporte', async (req, res) => {
  try {
    const nuevoTipo = new TipoReporte({ nombre: req.body.nombre });
    await nuevoTipo.save();
    res.status(201).json({ mensaje: 'Tipo de reporte creado exitosamente.' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear tipo de reporte.', error: error.message });
  }
});

/* Conexión a MongoDB Atlas */
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb+srv://GonzaloZavala:XxRwbOppRS5LfbTw@bdapirestmoviles.xaun5y6.mongodb.net/reportesdb?retryWrites=true&w=majority&appName=BDApiRestMoviles')
.then(() => {
  console.log('✅ Conexión exitosa a MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
  });
})
.catch(err => console.error('❌ Error conectando a MongoDB:', err));
