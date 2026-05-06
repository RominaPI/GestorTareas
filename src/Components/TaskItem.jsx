import { useContext, useState } from "react";
import tareasContext from "../tareasContext";

function TaskItem({ tarea }) {
  const { despachador } = useContext(tareasContext);
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(tarea.titulo);
  const [descripcion, setDescripcion] = useState(tarea.descripcion);

  const guardar = () => {
    despachador({
      tipo: "EDITAR_TAREA",
      id: tarea.id,
      titulo,
      descripcion
    });
    setEditando(false);
  };

  return (
    <div style={tarea.completada ? styles.completa : styles.pendiente}>
      
      {editando ? (
        <div style={styles.contenido}>
          <input
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />
          <textarea
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
          <button onClick={guardar}>Guardar</button>
        </div>
      ) : (
        <div style={styles.contenido}>
          <h3 style={styles.titulo}>{tarea.titulo}</h3>
          <p style={styles.descripcion}>{tarea.descripcion}</p>
        </div>
      )}

      <div style={styles.botones}>
        <button onClick={() => despachador({ tipo: "TOGGLE_TAREA", id: tarea.id })}>
          {tarea.completada ? "Pendiente" : "Completar"}
        </button>

        <button onClick={() => despachador({ tipo: "ELIMINAR_TAREA", id: tarea.id })}>
          Eliminar
        </button>

        <button onClick={() => setEditando(!editando)}>
          Editar
        </button>
      </div>
    </div>
  );
}

const styles = {
  completa: {
    width: "100%",
    height: "140px", 
    boxSizing: "border-box",
    overflow: "hidden",
    textDecoration: "line-through",
    background: "#e8dcff",
    padding: "10px",
    margin: "10px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "10px"
  },

  pendiente: {
    width: "100%",
    height: "140px", 
    boxSizing: "border-box",
    overflow: "hidden",
    background: "#d7f7f8",
    padding: "10px",
    margin: "10px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "10px"
  },

  contenido: {
    overflow: "hidden"
  },

  titulo: {
    margin: 0,
    fontSize: "16px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },

  descripcion: {
    fontSize: "14px",
    margin: "5px 0",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2, 
    WebkitBoxOrient: "vertical"
  },

  botones: {
    display: "flex",
    justifyContent: "space-between",
    gap: "5px"
  }
};

export default TaskItem;