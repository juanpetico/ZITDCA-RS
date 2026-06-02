// src/data/trabajos.ts
// Galería "Trabajos recientes" (antes/después + filtros).
//
// CRUD rápido:
//   • Agregar trabajo   → añade un objeto al array `trabajos`.
//   • Agregar categoría → añade a `categoriasTrabajo` (define el orden de los chips de filtro).
//
// FOTOS:
//   1. Copia las imágenes a `public/galeria/` (ej: 01-antes.jpg, 01-despues.jpg).
//   2. Apunta `antes` / `despues` a `/galeria/archivo.jpg` (ruta desde la raíz).
//   3. Si un trabajo no tiene foto "antes", deja `antes: null` → se muestra solo el resultado.
//   4. Mientras `despues` sea null, la tarjeta muestra un placeholder con su etiqueta.

// Categorías usadas por los chips de filtro. El orden define el orden de los chips.
export const categoriasTrabajo = [
  { id: "todos",       label: "Todos" },
  { id: "motor",       label: "Motor" },
  { id: "frenos",      label: "Frenos" },
  { id: "suspension",  label: "Suspensión" },
  { id: "diagnostico", label: "Diagnóstico" },
  { id: "performance", label: "Performance" },
  { id: "estetica",    label: "Estética" },
] as const;

export type CategoriaTrabajoId = (typeof categoriasTrabajo)[number]["id"];

export interface Trabajo {
  id: number;
  etiqueta: string;
  categoria: Exclude<CategoriaTrabajoId, "todos">;
  /** Ruta de la foto del resultado final. Colocar en `public/galeria/`. */
  despues: string | null; // TODO: reemplazar con foto real (/galeria/xx.jpg)
  despuesAlt?: string;
  /** Ruta de la foto "antes". Si es null, la tarjeta muestra solo el resultado (sin slider). */
  antes?: string | null;  // TODO: opcional — foto del antes (/galeria/xx-antes.jpg)
  antesAlt?: string;
}

export const trabajos: Trabajo[] = [
  {
    id: 1,
    etiqueta: "Afinación mayor",
    categoria: "motor",
    antes: "/galeria/motor_antes.jpg",   // DEMO: reemplazar por foto real
    antesAlt: "Motor antes de la afinación mayor",
    despues: "/galeria/motor_despues.jpg", // DEMO: reemplazar por foto real
    despuesAlt: "Motor después de la afinación mayor",
  },
  {
    id: 2,
    etiqueta: "Cambio de frenos",
    categoria: "frenos",
    antes: null,
    despues: "/galeria/micro_mantencion.jpg", // DEMO: reemplazar por foto real
    despuesAlt: "Resultado del cambio de frenos",
  },
  { id: 3, etiqueta: "Diagnóstico ECU",         categoria: "diagnostico", antes: null, despues: null },
  { id: 4, etiqueta: "Suspensión deportiva",    categoria: "suspension",  antes: null, despues: null },
  { id: 5, etiqueta: "Alineación y balanceo",   categoria: "suspension",  antes: null, despues: null },
  { id: 6, etiqueta: "Reprogramación / Tuning", categoria: "performance", antes: null, despues: null },
  { id: 7, etiqueta: "Detallado y pulido",      categoria: "estetica",    antes: null, despues: null },
  { id: 8, etiqueta: "Cambio de discos",        categoria: "frenos",      antes: null, despues: null },
];
