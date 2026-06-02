// src/data/stats.ts
// Estadísticas con contadores animados.
// CRUD: edita/añade objetos al array `stats`.

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
