export const estadoInicial = {
  tareas: [],
  filtro: "todas"
};

export function tareasReducer(estado, accion) {
  switch (accion.tipo) {

    case "AGREGAR_TAREA":
      return {
        ...estado,
        tareas: [
          ...estado.tareas,
          {
            id: Date.now(),
            titulo: accion.titulo,
            descripcion: accion.descripcion,
            completada: false
          }
        ]
      };

    case "ELIMINAR_TAREA":
      return {
        ...estado,
        tareas: estado.tareas.filter(t => t.id !== accion.id)
      };

    case "TOGGLE_TAREA":
      return {
        ...estado,
        tareas: estado.tareas.map(t =>
          t.id === accion.id ? { ...t, completada: !t.completada } : t
        )
      };

    case "EDITAR_TAREA":
      return {
        ...estado,
        tareas: estado.tareas.map(t =>
          t.id === accion.id
            ? { ...t, titulo: accion.titulo, descripcion: accion.descripcion }
            : t
        )
      };

    case "CAMBIAR_FILTRO":
      return {
        ...estado,
        filtro: accion.filtro
      };

    default:
      return estado;
  }
}