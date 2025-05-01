// models/TipoReporteSchema.js
const mongoose = require('mongoose');

const TipoReporteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('TipoReporte', TipoReporteSchema);
