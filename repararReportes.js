// repararReportes.js
const mongoose = require('mongoose');
const Reporte = require('./models/ReporteSchema');
const TipoReporte = require('./models/TipoReporteSchema');

// 🔧 Conéctate a tu base de datos (igual que en index.js)
mongoose.connect('mongodb+srv://GonzaloZavala:XxRwbOppRS5LfbTw@bdapirestmoviles.xaun5y6.mongodb.net/reportesdb?retryWrites=true&w=majority&appName=BDApiRestMoviles')
.then(async () => {
  console.log("🔧 Conectado a MongoDB...");

  const tipos = await TipoReporte.find();
  const reportes = await Reporte.find();

  for (const r of reportes) {
    // Solo corregimos si tipoReporte es un string (no ObjectId)
    if (typeof r.tipoReporte === "string") {
      const tipoMatch = tipos.find(t =>
        t._id.toString() === r.tipoReporte || t.nombre === r.tipoReporte
      );
      if (tipoMatch) {
        r.tipoReporte = tipoMatch._id; // reemplazamos string por ObjectId
        await r.save();
        console.log(`✅ Reparado reporte ${r._id}`);
      } else {
        console.log(`⚠️ No se encontró tipo para reporte ${r._id}`);
      }
    }
  }

  console.log("✅ Reparación finalizada");
  process.exit();
})
.catch(err => {
  console.error("❌ Error conectando a MongoDB:", err);
});
