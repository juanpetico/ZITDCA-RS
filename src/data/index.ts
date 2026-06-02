// src/data/index.ts
// Punto único de re-exportación. Los componentes importan desde '../data'.
// Cada dominio vive en su propio archivo para facilitar el CRUD:
//   site.ts · servicios.ts · trabajos.ts · stats.ts · razones.ts

export { site, waLink } from './site';
export { servicios, categoriasServicio } from './servicios';
export type { Servicio, CategoriaServicioId } from './servicios';
export { trabajos, categoriasTrabajo } from './trabajos';
export type { Trabajo, CategoriaTrabajoId } from './trabajos';
export { stats } from './stats';
export type { Stat } from './stats';
export { razones } from './razones';
export type { Razon } from './razones';
