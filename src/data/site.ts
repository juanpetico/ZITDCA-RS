// src/data/site.ts
// Configuración central del sitio (datos de contacto, redes, horario).
// Para editar SERVICIOS, TRABAJOS, STATS o RAZONES, ve a sus archivos dedicados
// en esta misma carpeta (servicios.ts, trabajos.ts, stats.ts, razones.ts).

export const site = {
  name: "ZIT'DCA RS",
  tagline: "Performance & Servicio Automotriz",
  description: "Taller automotriz especializado: escáner automotriz, mantención general, tren delantero, amortiguadores, instalación de radios, GPS y luces, caja de cambios, cambio de aceite y filtro, y ajustes de motor.",
  // TODO: reemplazar con datos reales antes de publicar
  whatsapp: "56944563675",         // formato internacional sin + ni espacios
  whatsappMsg: "Hola ZIT'DCA RS, vengo de su página y quiero agendar un servicio.",
  phone: "+56 9 4456 3675",        // TODO: reemplazar con número real
  email: "[EMAIL_ADDRESS]",  // TODO: reemplazar con correo real
  url: "https://zitdcars.cl",     // TODO: reemplazar con dominio real
  address: "Arica, Chacalluta - 238 Libertador Antonio José de Sucre ", // TODO: dirección real
  mapsUrl: "https://maps.app.goo.gl/Uf9rzgQBuYZcTEiP8", // TODO: enlace Maps real
  hours: [
    { d: "Lunes a Sábado",  h: "09:00 – 19:00 Hrs." },
    { d: "Domingo",         h: "Cerrado" },
  ],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61582608391131",   // TODO: URL real
    instagram: "https://www.instagram.com/zitdcars.arica/",  // TODO: URL real
  },
};

// Helper para link de WhatsApp con mensaje prellenado
export const waLink = (msg: string = site.whatsappMsg): string =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
