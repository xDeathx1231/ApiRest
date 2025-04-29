// models/ReporteSchema.js

const mongoose = require('mongoose');

const ReporteSchema = new mongoose.Schema({
  tipoReporte: {
    type: String,
    required: true
  },
  comentario: {
    type: String,
    required: true
  },
  ubicacion: {
    type: String,
    required: true
  },
  fechaCreacion: {
    type: Date,
    required: true
  },
  usuarioId: {
    type: String,
    required: true
  },
  imagenURL: {
    type: String,
    default: ""
  },
  latitud: {
    type: Number,
    required: true
  },
  longitud: {
    type: Number,
    required: true
  }
});

// Exportamos el modelo
module.exports = mongoose.model('Reporte', ReporteSchema);
