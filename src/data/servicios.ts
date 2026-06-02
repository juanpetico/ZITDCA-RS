// src/data/servicios.ts
// Servicios del taller + categorías para la lista de precios.
//
// CRUD rápido:
//   • Agregar servicio  → añade un objeto al array `servicios`.
//   • Editar precio      → cambia `precioDesde`.
//   • Agregar categoría  → añade a `categoriasServicio` (define el orden del acordeón de precios).
//   • Servicio con foto  → importa la imagen arriba y ponla en el campo `imagen`
//                          (las cards con `imagen` se muestran en el grid enriquecido de Servicios).

import type { ImageMetadata } from 'astro';
import escanerImg from '../assets/servicios/escaner.jpg';
import motorImg from '../assets/servicios/motor.jpg';

// Categorías para agrupar la lista de precios (acordeón). El orden define el orden de los grupos.
export const categoriasServicio = [
  { id: "motor",       label: "Motor" },
  { id: "suspension",  label: "Suspensión y dirección" },
  { id: "diagnostico", label: "Diagnóstico" },
  { id: "transmision", label: "Transmisión" },
  { id: "electrico",   label: "Eléctrico y accesorios" },
  { id: "otros",       label: "Otros servicios" },
] as const;

export type CategoriaServicioId = (typeof categoriasServicio)[number]["id"];

export interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  precioDesde: string;            // TODO: reemplazar con precio real
  categoria: CategoriaServicioId; // para agrupar en la lista de precios
  destacado?: boolean;
  iconoPath: string;              // SVG path data (stroke currentColor)
  imagen?: ImageMetadata;         // imagen optimizada (astro:assets) — opcional
  imagenAlt?: string;             // texto alternativo de la imagen
}

export const servicios: Servicio[] = [
  {
    id: "escaner",
    titulo: "Escáner Automotriz",
    descripcion: "Lectura de códigos y análisis de sensores para identificar fallas con precisión.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    categoria: "diagnostico",
    iconoPath: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18",
  },
  {
    id: "mantencion",
    titulo: "Mantención General",
    descripcion: "Revisión integral y mantenimiento preventivo para que tu auto siempre rinda al máximo.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    categoria: "motor",
    iconoPath: "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 0v4m0 12v4M2 12h4m12 0h4",
  },
  {
    id: "tren-delantero",
    titulo: "Reparación de Tren Delantero",
    descripcion: "Terminales, rótulas, bujes y dirección para una conducción segura y estable.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    categoria: "suspension",
    iconoPath: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 7v10 M7 12h10",
  },
  {
    id: "amortiguadores",
    titulo: "Cambio de Amortiguadores",
    descripcion: "Reemplazo de amortiguadores y suspensión para máximo confort y control.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    categoria: "suspension",
    iconoPath: "M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4",
  },
  {
    id: "radios-gps-luces",
    titulo: "Instalación de Radios, GPS y Luces",
    descripcion: "Instalación profesional de equipos de audio, navegación GPS e iluminación.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    categoria: "electrico",
    iconoPath: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  },
  {
    id: "caja-cambios",
    titulo: "Instalación de Caja de Cambios",
    descripcion: "Montaje y servicio de caja de cambios manual o automática con garantía.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    categoria: "transmision",
    iconoPath: "M12 2v6m0 8v6M5.6 5.6l4.2 4.2m4.4 4.4 4.2 4.2M2 12h6m8 0h6 M12 9a3 3 0 100 6 3 3 0 000-6z",
  },
  {
    id: "aceite-filtro",
    titulo: "Cambio de Aceite y Filtro",
    descripcion: "Aceite sintético o convencional con filtro de aceite para proteger tu motor.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    categoria: "motor",
    iconoPath: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z",
  },
  // {
  //   id: "ajustes-motor",
  //   titulo: "Ajustes de Motor",
  //   descripcion: "Puesta a punto y afinación del motor para maximizar potencia, torque y eficiencia.",
  //   precioDesde: "Desde $X,XXX", // TODO: precio real
  //   categoria: "motor",
  //   destacado: true,
  //   iconoPath: "M13 10V3L4 14h7v7l9-11h-7z",
  // },
  {
    id: "servicios-adicionales",
    titulo: "Servicios Adicionales",
    descripcion: "Realizamos diagnóstico a domicilio y traslado programado al taller mecánico.",
    precioDesde: "A convenir",
    categoria: "otros",
    destacado: true,
    iconoPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },

  // ---------------------------------------------------------------------------
  // Cards con imagen (modelo visual enriquecido). Llevan `imagen` definida.
  // ---------------------------------------------------------------------------
  {
    id: "escaner-premium",
    titulo: "Escáner Automotriz",
    descripcion: "Lectura profunda de módulos ECU, ABS, airbag y transmisión. Detectamos la falla exacta antes de tocar nada.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    categoria: "diagnostico",
    destacado: true,
    iconoPath: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18",
    imagen: escanerImg,
    imagenAlt: "Técnico conectando escáner automotriz profesional al puerto OBD2 del vehículo",
  },
  {
    id: "ajustes-motor-premium",
    titulo: "Ajustes de Motor",
    descripcion: "Puesta a punto completa: sincronización, carburación, afinación electrónica y prueba de potencia y torque.",
    precioDesde: "Desde $X,XXX", // TODO: precio real
    categoria: "motor",
    destacado: true,
    iconoPath: "M13 10V3L4 14h7v7l9-11h-7z",
    imagen: motorImg,
    imagenAlt: "Mecánico realizando ajustes de precisión en motor de alto rendimiento",
  },
];
