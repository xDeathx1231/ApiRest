const mongoose = require('mongoose');

const ReporteSchema = new mongoose.Schema({
  tipoReporte: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TipoReporte',
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

module.exports = mongoose.model('Reporte', ReporteSchema);
