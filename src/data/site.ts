// src/data/site.ts
// Datos centrales del sitio — editar aquí antes de publicar.
// Todos los placeholders marcados con // TODO

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

// ---------------------------------------------------------------------------
// Servicios (8 tarjetas)
// ---------------------------------------------------------------------------

export interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  precioDesde: string; // TODO: reemplazar con precio real
  destacado?: boolean;
  iconoPath: string;   // SVG path data (stroke currentColor)
  imagenSrc?: string;  // ruta de imagen para el nuevo modelo de card con foto
  imagenAlt?: string;  // texto alternativo de la imagen
}

export const servicios: Servicio[] = [
  {
    id: "escaner",
    titulo: "Escáner Automotriz",
    descripcion: "Lectura de códigos y análisis de sensores para identificar fallas con precisión.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    iconoPath: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18",
  },
  {
    id: "mantencion",
    titulo: "Mantención General",
    descripcion: "Revisión integral y mantenimiento preventivo para que tu auto siempre rinda al máximo.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    iconoPath: "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 0v4m0 12v4M2 12h4m12 0h4",
  },
  {
    id: "tren-delantero",
    titulo: "Reparación de Tren Delantero",
    descripcion: "Terminales, rótulas, bujes y dirección para una conducción segura y estable.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    iconoPath: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 7v10 M7 12h10",
  },
  {
    id: "amortiguadores",
    titulo: "Cambio de Amortiguadores",
    descripcion: "Reemplazo de amortiguadores y suspensión para máximo confort y control.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    iconoPath: "M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4",
  },
  {
    id: "radios-gps-luces",
    titulo: "Instalación de Radios, GPS y Luces",
    descripcion: "Instalación profesional de equipos de audio, navegación GPS e iluminación.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    iconoPath: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  },
  {
    id: "caja-cambios",
    titulo: "Instalación de Caja de Cambios",
    descripcion: "Montaje y servicio de caja de cambios manual o automática con garantía.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    iconoPath: "M12 2v6m0 8v6M5.6 5.6l4.2 4.2m4.4 4.4 4.2 4.2M2 12h6m8 0h6 M12 9a3 3 0 100 6 3 3 0 000-6z",
  },
  {
    id: "aceite-filtro",
    titulo: "Cambio de Aceite y Filtro",
    descripcion: "Aceite sintético o convencional con filtro de aceite para proteger tu motor.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    iconoPath: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z",
  },
  {
    id: "ajustes-motor",
    titulo: "Ajustes de Motor",
    descripcion: "Puesta a punto y afinación del motor para maximizar potencia, torque y eficiencia.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    destacado: true,
    iconoPath: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    id: "servicios-adicionales",
    titulo: "Servicios Adicionales",
    descripcion: "Realizamos diagnóstico a domicilio y traslado programado al taller mecánico.",
    precioDesde: "A convenir",
    destacado: true,
    iconoPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },

  // ---------------------------------------------------------------------------
  // Nuevas cards con imagen (modelo visual enriquecido)
  // ---------------------------------------------------------------------------
  {
    id: "escaner-premium",
    titulo: "Escáner Automotriz",
    descripcion: "Lectura profunda de módulos ECU, ABS, airbag y transmisión. Detectamos la falla exacta antes de tocar nada.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    destacado: true,
    iconoPath: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18",
    imagenSrc: "/src/assets/service_escaner.jpg",
    imagenAlt: "Técnico conectando escáner automotriz profesional al puerto OBD2 del vehículo",
  },
  {
    id: "ajustes-motor-premium",
    titulo: "Ajustes de Motor",
    descripcion: "Puesta a punto completa: sincronización, carburación, afinación electrónica y prueba de potencia y torque.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    destacado: true,
    iconoPath: "M13 10V3L4 14h7v7l9-11h-7z",
    imagenSrc: "/src/assets/service_motor.jpg",
    imagenAlt: "Mecánico realizando ajustes de precisión en motor de alto rendimiento",
  },
];

// ---------------------------------------------------------------------------
// Estadísticas (contadores animados)
// ---------------------------------------------------------------------------

export interface Stat {
  valor: string;
  etiqueta: string;
}

export const stats: Stat[] = [
  { valor: "+500", etiqueta: "Autos atendidos" },
  { valor: "+10",  etiqueta: "Años de experiencia" },
  { valor: "100%", etiqueta: "Garantía en mano de obra" },
  { valor: "4.9★", etiqueta: "Calificación de clientes" },
];

// ---------------------------------------------------------------------------
// Razones "Por qué elegirnos"
// ---------------------------------------------------------------------------

export interface Razon {
  titulo: string;
  descripcion: string;
  iconoPath: string;
}

export const razones: Razon[] = [
  {
    titulo: "Diagnóstico Honesto",
    descripcion: "Te explicamos exactamente qué tiene tu auto y cuánto costará antes de hacer cualquier trabajo.",
    iconoPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    titulo: "Refacciones de Calidad",
    descripcion: "Usamos solo piezas originales o equivalentes de primera calidad para garantizar durabilidad.",
    iconoPath: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
  {
    titulo: "Garantía por Escrito",
    descripcion: "Cada servicio incluye garantía documentada. Si algo falla, regresa y lo resolvemos sin costo.",
    iconoPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    titulo: "Atención Directa con el Técnico",
    descripcion: "Hablas directo con quien trabaja tu auto. Sin intermediarios, sin sorpresas.",
    iconoPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
];
