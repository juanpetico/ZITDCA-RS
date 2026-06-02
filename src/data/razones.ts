// src/data/razones.ts
// Sección "Por qué elegirnos".
// CRUD: edita/añade objetos al array `razones`.

export interface Razon {
  titulo: string;
  descripcion: string;
  iconoPath: string; // SVG path data (stroke currentColor)
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
